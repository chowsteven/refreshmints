import { useState } from 'react';
import useSWR from 'swr';
import { CollectionListingsData } from '../interfaces/CollectionListingsData';
import { fetcher } from '../utils/fetcher';

export const useCollectionListings = (id: string) => {
  const [collectionListingsData, setCollectionListingsData] =
    useState<CollectionListingsData | null>(null);

  // TODO: error handling
  const { data, error } = useSWR<CollectionListingsData, Error>(
    `/api/nft/listings/${id}`,
    fetcher,
    {
      onSuccess: (data) => {
        setCollectionListingsData(data);
      },
    }
  );

  return { collectionListingsData, error };
};
