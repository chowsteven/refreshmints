import { useState } from 'react';
import useSWR from 'swr';
import { HoldersInfo } from '../interfaces/HoldersInfo';
import { fetcher } from '../utils/fetcher';

export const useHolderDistribution = (id: string) => {
  const [numHoldersArr, setNumHoldersArr] = useState<number[]>([]);
  const { data, error } = useSWR<HoldersInfo, Error>(
    `/api/nft/holders/${id}`,
    fetcher,
    {
      onSuccess: (data) => {
        // first array's owner count is always number of holders of one token
        let numHoldsOne: number = data.ownersDistribution[0].ownerCount;

        // initialize other buckets
        let numHoldsTwoToFive: number = 0;
        let numHoldsSixToTwenty: number = 0;
        let numHoldsTwentyOneToFifty: number = 0;
        let numHoldsOverFifty: number = 0;

        // iterate through array, add to distribution buckets based on token count
        for (let i = 1; i < data.ownersDistribution.length; i++) {
          if (
            data.ownersDistribution[i].tokenCount >= 2 &&
            data.ownersDistribution[i].tokenCount <= 5
          ) {
            numHoldsTwoToFive += data.ownersDistribution[i].ownerCount;
          } else if (
            data.ownersDistribution[i].tokenCount >= 6 &&
            data.ownersDistribution[i].tokenCount <= 20
          ) {
            numHoldsSixToTwenty += data.ownersDistribution[i].ownerCount;
          } else if (
            data.ownersDistribution[i].tokenCount >= 21 &&
            data.ownersDistribution[i].tokenCount <= 50
          ) {
            numHoldsTwentyOneToFifty += data.ownersDistribution[i].ownerCount;
          } else {
            numHoldsOverFifty += data.ownersDistribution[i].ownerCount;
          }
        }

        // update array state
        setNumHoldersArr([
          numHoldsOne,
          numHoldsTwoToFive,
          numHoldsSixToTwenty,
          numHoldsTwentyOneToFifty,
          numHoldsOverFifty,
        ]);
      },
    }
  );

  return { numHoldersArr, error };
};
