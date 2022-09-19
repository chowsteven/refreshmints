import { useState } from 'react';
import useSWR from 'swr';
import { CollectionData } from '../interfaces/CollectionData';
import { fetcher } from '../utils/fetcher';

export const useCollectionData = (id: string) => {
  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null
  );

  const { data, error } = useSWR<CollectionData, Error>(
    `/api/nft/collection/${id}`,
    fetcher,
    {
      onSuccess: (data) => {
        setCollectionData(data);
      },
    }
  );

  return { collectionData, error };
};
