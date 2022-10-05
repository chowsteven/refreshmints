import { MintingObject } from '../interfaces/MintingObject';
import { MintingCard } from './MintingCard';

interface MintingContainerProps {
  trendingArr: MintingObject[];
}

export const MintingContainer = ({ trendingArr }: MintingContainerProps) => {
  return (
    <table>
      <thead className='border-b'>
        <tr>
          <th
            scope='col'
            className='px-6 py-4 text-sm font-medium text-left text-gray-300'
          >
            COLLECTION
          </th>
          <th
            scope='col'
            className='px-6 py-4 text-sm font-medium text-left text-gray-300'
          >
            # OF MINTS
          </th>
          <th
            scope='col'
            className='px-6 py-4 text-sm font-medium text-left text-gray-300'
          >
            PRICE
          </th>
        </tr>
      </thead>
      <tbody>
        {trendingArr.map((trending, index: number) => (
          <MintingCard key={index} trending={trending} />
        ))}
      </tbody>
    </table>
  );
};
