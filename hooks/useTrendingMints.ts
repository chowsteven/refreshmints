import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { CollectionSalesData } from '../interfaces/CollectionSalesData';
import { fetcher } from '../utils/fetcher';
import { CollectionData } from '../interfaces/CollectionData';
import { MintingObject } from '../interfaces/MintingObject';

export const useTrendingMints = (startTimestamp: string) => {
  // array of objects that hold a contract address key and count/volume/image url/name values
  const [trendingArr, setTrendingArr] = useState<MintingObject[]>([]);

  // array of strings of the top five minting collections
  const [topFiveMinting, setTopFiveMinting] = useState<string[]>([]);

  // string of top five minting collections joined by &contract= to be used as a query
  const [topFiveMintingQuery, setTopFiveMintingQuery] = useState<string>('');

  // array of SingleCollections and a continuation string, from useCollectionData
  const [topFiveMintingData, setTopFiveMintingData] =
    useState<CollectionData | null>(null);

  // object that holds a contract address key and count values
  const [countPriceObj, setCountPriceObj] = useState<
    Record<string, { count: number; price: number }>
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
        // build count obj for mints
        let tempCountPriceObj: Record<
          string,
          { count: number; price: number }
        > = {};

        collectionSalesData.sales.forEach((sale) => {
          if (
            // this address seems to belong to a person but sometimes shows up as a sale
            // querying via collection with this address returns no information and breaks everything
            sale.token.contract ===
              '0xa604060890923ff400e8c6f5290461a83aedacec' ||
            // only want mint events
            sale.orderKind !== 'mint'
          )
            // return acts as continue in a forEach
            return;

          if (!tempCountPriceObj.hasOwnProperty(sale.token.contract)) {
            // first time a contract has been seen, initialize its count to 1 and get price
            const tokenPrice = sale.price.amount.decimal / Number(sale.amount);
            console.log(
              sale.token.contract,
              sale.price.amount.decimal,
              sale.amount
            );

            tempCountPriceObj[sale.token.contract] = {
              count: 1,
              price: tokenPrice,
            };
          } else {
            // increment the count
            tempCountPriceObj[sale.token.contract].count++;
          }
        });

        // after going through all mintings, sort by count (number of mints)
        const topMints = Object.keys(tempCountPriceObj).sort(
          (a, b) => tempCountPriceObj[b].count - tempCountPriceObj[a].count
        );

        // set state for mints
        setTopFiveMinting(topMints.slice(0, 5));
        setTopFiveMintingQuery(topMints.slice(0, 5).join('&contract='));
        setCountPriceObj(tempCountPriceObj);

        // TODO: fetch again with continuation string if it exists (ex: lots of events within 5m)
      },
    }
  );

  // get collection data of the top ten collections
  const { data: collectionData, error: collectionDataError } = useSWR<
    CollectionData,
    Error
  >(`/api/nft/collection/${topFiveMintingQuery}`, fetcher, {
    onSuccess: (collectionData) => {
      // set state
      setTopFiveMintingData(collectionData);
    },
  });

  // build trending array
  useEffect(() => {
    let tempTradingArr: MintingObject[] = [];

    topFiveMinting.forEach((collection) => {
      let trendingObj: MintingObject = {};

      let target = topFiveMintingData?.collections.filter(
        (coll) => coll.id === collection
      );

      // target is an empty array if coll.id !== collection
      if (target && target.length > 0) {
        trendingObj[collection] = {
          count: countPriceObj[collection].count,
          id: collection,
          image: target[0].image,
          name: target[0].name,
          price: countPriceObj[collection].price,
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
  }, [topFiveMintingData]);

  return {
    trendingArr,
  };
};
