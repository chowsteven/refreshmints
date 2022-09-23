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
        setCollectionSalesData(data);
      },
    }
  );

  return { collectionSalesData, error };
};
