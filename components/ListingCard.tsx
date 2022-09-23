import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TokenModal } from '../components/TokenModal';
import { ExternalTokenIconListing } from './ExternalTokenIconListing';
import { SingleListing } from '../interfaces/CollectionListingsData';
import { DateTime } from 'luxon';

interface ListingCardProps {
  listing: SingleListing;
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  const [relativeTime, setRelativeTime] = useState<string | null>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const relTime = DateTime.fromISO(listing.updatedAt).toRelative();
    setRelativeTime(relTime);
  }, [listing.updatedAt]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={handleClick}
      className='flex justify-between max-w-[512px] h-16 p-1 pr-2 my-2 bg-gray-800 rounded-md hover:cursor-pointer hover:bg-gray-700'
    >
      <div className='flex gap-2'>
        <Image
          src={
            listing.metadata.data.image
              ? listing.metadata.data.image
              : '/images/eth.png'
          }
          height={48}
          width={48}
          alt='Token image'
        />
        <div className='font-medium text-sm'>
          #{listing.tokenSetId.split(':')[2]}
        </div>
      </div>

      <div className='flex flex-col justify-between items-end'>
        <div className='flex align-middle'>
          <div>
            <Image
              src='/images/eth.png'
              height={12}
              width={12}
              alt='Ethereum logo'
            />
          </div>
          <span className='ml-.5 mr-2 font-medium text-md'>
            {listing.price.amount.decimal}
          </span>
          <div className='flex gap-2'>
            <ExternalTokenIconListing
              marketplace={listing.source.name}
              url={listing.source.url}
            />
          </div>
        </div>

        <div>
          <div className='text-sm text-gray-400'>{relativeTime}</div>
        </div>
      </div>

      <TokenModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        contract={listing.contract}
        tokenId={listing.tokenSetId.split(':')[2]}
      />
    </div>
  );
};
