import { useEffect, useState } from 'react';
import { OverviewStat } from './OverviewStat';
import { DateTime } from 'luxon';
import { SingleCollection } from '../interfaces/CollectionData';
import { CollectionSalesData } from '../interfaces/CollectionSalesData';

interface ActivityOverviewProps {
  collectionData: SingleCollection;
  collectionSalesData: CollectionSalesData;
}

export const ActivityOverview = ({
  collectionData,
  collectionSalesData,
}: ActivityOverviewProps) => {
  // epoch timestamps
  const [oneDayAgo, setOneDayAgo] = useState<number>(0);
  const [oneHourAgo, setOneHourAgo] = useState<number>(0);
  const [tenMinutesAgo, setTenMinutesAgo] = useState<number>(0);

  // number of sales
  const [oneDaySales, setOneDaySales] = useState<number>(0);
  const [oneHourSales, setOneHourSales] = useState<number>(0);
  const [tenMinuteSales, setTenMinuteSales] = useState<number>(0);

  // one hour floor price
  const [oneHourFloor, setOneHourFloor] = useState<number>(0);

  // initial load can show initial states for too long because of interval time
  // currently set to 1 minute to avoid abusing API, but may be able to set to 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      // set timestamps on mount
      setOneDayAgo(DateTime.now().minus({ days: 1 }).toSeconds());
      setOneHourAgo(DateTime.now().minus({ hours: 1 }).toSeconds());
      setTenMinutesAgo(DateTime.now().minus({ minutes: 10 }).toSeconds());
    }, 60000);

    // clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  // count number of sales
  useEffect(() => {
    let tempOneDaySales = 0;
    let tempOneHourSales = 0;
    let tempTenMinuteSales = 0;
    let tempOneHourFloor = 99999;

    collectionSalesData.sales.forEach((sale) => {
      // less than ten minutes ago
      if (sale.timestamp > tenMinutesAgo) {
        tempOneDaySales++;
        tempOneHourSales++;
        tempTenMinuteSales++;

        // check sale price against current one hour floor, update if lower
        if (sale.price.amount.decimal < tempOneHourFloor) {
          tempOneHourFloor = sale.price.amount.decimal;
        }
        // less than an hour ago
      } else if (sale.timestamp > oneHourAgo) {
        tempOneDaySales++;
        tempOneHourSales++;

        // check sale price against current one hour floor, update if lower
        if (sale.price.amount.decimal < tempOneHourFloor) {
          tempOneHourFloor = sale.price.amount.decimal;
        }
        // less than a day ago
      } else if (sale.timestamp > oneDayAgo) {
        tempOneDaySales++;

        // check sale price against current one hour floor, update if lower
        if (sale.price.amount.decimal < tempOneHourFloor) {
          tempOneHourFloor = sale.price.amount.decimal;
        }
      }
    });

    // set states
    setOneDaySales(tempOneDaySales);
    setOneHourSales(tempOneHourSales);
    setTenMinuteSales(tempTenMinuteSales);
    setOneHourFloor(tempOneHourFloor);
  }, [collectionSalesData, oneDayAgo, oneHourAgo, tenMinutesAgo]);

  return (
    <div className='flex justify-center gap-12 bg-gray-800 px-12 py-6 rounded-md'>
      <div>
        <OverviewStat stat={oneDaySales} description='1D SALES' />
      </div>
      <div>
        <OverviewStat stat={oneHourSales} description='1H SALES' />
      </div>
      <div>
        <OverviewStat stat={tenMinuteSales} description='10MIN SALES' />
      </div>
      <div>
        <OverviewStat stat={oneHourFloor} description='1H FLOOR' />
      </div>
      <div>
        <OverviewStat
          stat={collectionData.onSaleCount}
          description='LISTINGS'
        />
      </div>
      <div>
        <OverviewStat
          stat={collectionData.floorAsk.price.amount.decimal}
          description='FLOOR'
        />
      </div>
    </div>
  );
};
