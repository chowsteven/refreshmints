import { TrendingObject } from '../interfaces/TrendingObject';
import { TrendingCard } from './TrendingCard';

interface TrendingContainerProps {
  trendingArr: TrendingObject[];
}

export const TrendingContainer = ({ trendingArr }: TrendingContainerProps) => {
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
            # OF TRADES
          </th>
          <th
            scope='col'
            className='px-6 py-4 text-sm font-medium text-left text-gray-300'
          >
            VOLUME
          </th>
          <th
            scope='col'
            className='px-6 py-4 text-sm font-medium text-left text-gray-300'
          >
            FLOOR
          </th>
        </tr>
      </thead>
      <tbody>
        {trendingArr.map((trending, index: number) => (
          <TrendingCard key={index} trending={trending} />
        ))}
      </tbody>
    </table>
  );
};
