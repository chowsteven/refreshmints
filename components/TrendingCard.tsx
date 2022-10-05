import Image from 'next/image';
import { TrendingObject } from '../interfaces/TrendingObject';
import { SingleCollection } from '../interfaces/CollectionData';
import Link from 'next/link';

interface TrendingCardProps {
  trending: TrendingObject;
}

export const TrendingCard = ({ trending }: TrendingCardProps) => {
  const collectionId = Object.keys(trending)[0];
  const collection = trending[collectionId];

  return (
    // link to collection
    <Link href={`collection/${collectionId}`}>
      <tr className='hover:cursor-pointer hover:bg-gray-700'>
        {/* collection info */}
        <th className='flex items-center gap-2 px-6 py-4 text-left'>
          <Image
            src={collection.image ? collection.image : '/images/eth.png'}
            height={50}
            width={50}
            alt='Collection image'
          />
          <span className='font-medium text-md'>{collection.name}</span>
        </th>

        {/* number of trades */}
        <td className='px-6 py-4 text-sm'>{collection.count}</td>

        {/* volume */}
        <td className='px-6 py-4 text-sm'>
          <div className='flex items-center gap-0.25'>
            <Image
              src='/images/eth.png'
              height={15}
              width={15}
              alt='Eth logo'
            />
            {Math.round(collection.volume * 1000) / 1000}
          </div>
        </td>

        {/* floor price */}
        <td className='px-6 py-4 text-sm'>
          <div className='flex items-center gap-0.25'>
            <Image
              src='/images/eth.png'
              height={15}
              width={15}
              alt='Eth logo'
            />
            {collection.floor
              ? Math.round(collection.floor * 1000) / 1000
              : '---'}
          </div>
        </td>
      </tr>
    </Link>
  );
};
