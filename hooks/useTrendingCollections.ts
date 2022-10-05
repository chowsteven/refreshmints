import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { CollectionSalesData } from '../interfaces/CollectionSalesData';
import { fetcher } from '../utils/fetcher';
import { CollectionData } from '../interfaces/CollectionData';
import { TrendingObject } from '../interfaces/TrendingObject';

export const useTrendingCollections = (startTimestamp: string) => {
  // array of objects that hold a contract address key and count/volume/image url/name/floor price values
  const [trendingArr, setTrendingArr] = useState<TrendingObject[]>([]);

  // array of strings of the top ten collections
  const [topTenCollections, setTopTenCollections] = useState<string[]>([]);

  // string of top ten collections joined by &contract= to be used as a query
  const [topTenCollectionsQuery, setTopTenCollectionsQuery] =
    useState<string>('');

  // array of SingleCollections and a continuation string, from useCollectionData
  const [topTenCollectionsData, setTopTenCollectionsData] =
    useState<CollectionData | null>(null);

  // object that holds a contract address key and count + volume values
  const [countVolumeObj, setCountVolumeObj] = useState<
    Record<string, { count: number; volume: number }>
  >({});

  // TODO: error handling
  const { data: collectionSalesData, error: collectionSalesDataError } = useSWR<
    CollectionSalesData,
    Error
  >(
    // get recent sales
    `/api/nft/sales/recent/${startTimestamp}`,
    fetcher,
    {
      onSuccess: (collectionSalesData) => {
        // build count and volume obj
        let tempCountVolumeObj: Record<
          string,
          { count: number; volume: number }
        > = {};

        collectionSalesData.sales.forEach((sale) => {
          if (
            // this address seems to belong to a person but sometimes shows up as a sale
            // querying via collection with this address returns no information and breaks everything
            sale.token.contract === '0xa604060890923ff400e8c6f5290461a83aedacec'
          )
            // return acts as continue in a forEach
            return;

          if (!tempCountVolumeObj.hasOwnProperty(sale.token.contract)) {
            // first time a contract has been seen, initialize its count to 1 and volume to sale
            tempCountVolumeObj[sale.token.contract] = {
              count: 1,
              volume: sale.price.amount.decimal,
            };
          } else {
            // increment the count and add to its volume
            tempCountVolumeObj[sale.token.contract].count++;
            tempCountVolumeObj[sale.token.contract].volume +=
              sale.price.amount.decimal;
          }
        });

        // after going through all sales, sort by count (number of sales)
        const topCollections = Object.keys(tempCountVolumeObj).sort(
          (a, b) => tempCountVolumeObj[b].count - tempCountVolumeObj[a].count
        );

        // set state
        setTopTenCollections(topCollections.slice(0, 10));
        setTopTenCollectionsQuery(
          topCollections.slice(0, 10).join('&contract=')
        );
        setCountVolumeObj(tempCountVolumeObj);

        // TODO: fetch again with continuation string if it exists
      },
    }
  );

  // get collection data of the top ten collections
  const { data: collectionData, error: collectionDataError } = useSWR<
    CollectionData,
    Error
  >(`/api/nft/collection/${topTenCollectionsQuery}`, fetcher, {
    onSuccess: (collectionData) => {
      // set state
      setTopTenCollectionsData(collectionData);
    },
  });

  // build trending array
  useEffect(() => {
    let tempTradingArr: TrendingObject[] = [];

    topTenCollections.forEach((collection) => {
      let trendingObj: TrendingObject = {};

      let target = topTenCollectionsData?.collections.filter(
        (coll) => coll.id === collection
      );

      // target is an empty array if coll.id !== collection
      if (target && target.length > 0) {
        trendingObj[collection] = {
          count: countVolumeObj[collection].count,
          volume: countVolumeObj[collection].volume,
          id: collection,
          image: target[0].image,
          name: target[0].name,
          floor: target[0].floorAsk.price?.amount.decimal,
        };

        tempTradingArr.push(trendingObj);
      } else {
        // error handling
      }
    });

    setTrendingArr(tempTradingArr);

    // only run again if topTenCollectionsData is updated
    // should not run if topTenCollections, topTenCollectionsQuery, and countVolumeObj are updated.
    // if this effect re-runs on those 3 variables changing, the topTenCollectionsData will not have
    // time to update since it has to fetch based on the topTenCollectionsQuery,
    // and target[0] will be undefined for some collections because the data will not
    // include some of the new topTenCollections yet
  }, [topTenCollectionsData]);

  return {
    trendingArr,
  };
};
