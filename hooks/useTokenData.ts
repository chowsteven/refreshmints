import { useState } from 'react';
import useSWR from 'swr';
import { TokenData } from '../interfaces/TokenData';
import { fetcher } from '../utils/fetcher';

export const useTokenData = (contract: string, tokenId: string) => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  // TODO: error handling
  const { data, error } = useSWR<TokenData, Error>(
    `/api/nft/token/${contract + '%3A' + tokenId}`,
    fetcher,
    {
      onSuccess: (data) => {
        setTokenData(data);
      },
    }
  );

  return { tokenData, error };
};
