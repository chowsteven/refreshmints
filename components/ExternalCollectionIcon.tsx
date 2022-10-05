import Image from 'next/image';
import Link from 'next/link';

interface ExternaCollectionIconProps {
  marketplace: 'opensea' | 'looksrare' | 'x2y2' | 'etherscan';
  collectionId: string;
  collectionSlug: string;
}

export const ExternalCollectionIcon = ({
  marketplace,
  collectionId,
  collectionSlug,
}: ExternaCollectionIconProps) => {
  let marketplaceBase = '';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (marketplace === 'opensea') {
    marketplaceBase = 'https://opensea.io/collection/';
  } else if (marketplace === 'looksrare') {
    marketplaceBase = 'https://looksrare.org/collections/';
  } else if (marketplace === 'x2y2') {
    marketplaceBase = 'https://x2y2.io/collection/';
  } else {
    marketplaceBase = 'https://etherscan.io/address/';
  }

  if (marketplace === 'opensea') {
    return (
      <Link href={marketplaceBase + collectionSlug}>
        <a onClick={handleClick}>
          <Image
            src={`/images/${marketplace}.png`}
            height={20}
            width={20}
            alt='Marketplace icon'
          />
        </a>
      </Link>
    );
  } else {
    return (
      <Link href={marketplaceBase + collectionId}>
        <a onClick={handleClick}>
          <Image
            src={`/images/${marketplace}.png`}
            height={20}
            width={20}
            alt='Marketplace icon'
          />
        </a>
      </Link>
    );
  }
};
