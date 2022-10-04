import Image from 'next/image';
import Link from 'next/link';
import { SingleCollection } from '../interfaces/CollectionData';
import { ExternalCollectionIcon } from './ExternalCollectionIcon';

interface CollectionOverviewProps {
  collectionData: SingleCollection;
}

export const CollectionOverview = ({
  collectionData,
}: CollectionOverviewProps) => {
  const truncatedCollectionId =
    collectionData.id.slice(0, 7) + '...' + collectionData.id.slice(-8);

  return (
    <div className='flex justify-center items-center lg:justify-start'>
      <div className='mr-3'>
        <Image
          src={collectionData.image ? collectionData.image : '/images/eth.png'}
          height={75}
          width={75}
          alt='Collection image'
        />
      </div>
      <div className='flex flex-col'>
        <div className='text-xl'>{collectionData.name}</div>
        <div
          className='flex gap-2 mb-2 rounded-sm hover:bg-gray-700 hover:cursor-pointer'
          onClick={() => navigator.clipboard.writeText(collectionData.id)}
        >
          {/* TODO: add copied notif on click */}
          <div className='text-sm text-gray-400'>{truncatedCollectionId}</div>
          <Image
            src='/images/copy.png'
            height={16}
            width={16}
            alt='Copy icon'
          />
        </div>
        <div className='flex items-center gap-3'>
          <ExternalCollectionIcon
            marketplace='opensea'
            collectionId={collectionData.id}
            collectionSlug={collectionData.slug}
          />
          <ExternalCollectionIcon
            marketplace='looksrare'
            collectionId={collectionData.id}
            collectionSlug={collectionData.slug}
          />
          <ExternalCollectionIcon
            marketplace='x2y2'
            collectionId={collectionData.id}
            collectionSlug={collectionData.slug}
          />
          <ExternalCollectionIcon
            marketplace='etherscan'
            collectionId={collectionData.id}
            collectionSlug={collectionData.slug}
          />
          <div className='w-0.5 h-7 bg-gray-700'></div>
          {collectionData.externalUrl ? (
            <Link href={collectionData.externalUrl}>
              <a>
                <Image
                  src='/images/globe.png'
                  height={20}
                  width={20}
                  alt='Globe icon'
                />
              </a>
            </Link>
          ) : null}
          {collectionData.discordUrl ? (
            <Link href={collectionData.discordUrl}>
              <a>
                <Image
                  src='/images/discord.png'
                  height={20}
                  width={20}
                  alt='Discord logo'
                />
              </a>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};
