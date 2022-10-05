import { useState } from 'react';
import useSWR from 'swr';
import { CollectionSalesData } from '../interfaces/CollectionSalesData';
import { fetcher } from '../utils/fetcher';

export const useCollectionSales = (id: string) => {
  const [collectionSalesData, setCollectionSalesData] =
    useState<CollectionSalesData | null>(null);

  // TODO: error handling
  const { data, error } = useSWR<CollectionSalesData, Error>(
    `/api/nft/sales/${id}`,
    fetcher,
    {
      onSuccess: (data) => {
        // API considers mints as sales, so remove mints
        const salesData = data.sales.filter(
          (sale) => sale.orderKind !== 'mint'
        );

        setCollectionSalesData({
          sales: salesData,
          continuation: data.continuation,
        });
      },
    }
  );

  return { collectionSalesData, error };
};
