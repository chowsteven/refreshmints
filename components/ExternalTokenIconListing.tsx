import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ExternalTokenIconListingProps {
  marketplace: string;
  url: string;
}

export const ExternalTokenIconListing = ({
  marketplace,
  url,
}: ExternalTokenIconListingProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (marketplace === 'CryptoPunks') {
    return (
      <Link href='https://cryptopunks.app/cryptopunks/forsale' passHref={true}>
        <a onClick={handleClick}>
          <Image
            src={`/images/${marketplace.toLowerCase()}.png`}
            height={20}
            width={20}
            alt='Marketplace icon'
          />
        </a>
      </Link>
    );
  } else {
    return (
      <Link href={url ? url : ''}>
        <a onClick={handleClick}>
          <Image
            src={`/images/${marketplace.toLowerCase()}.png`}
            height={20}
            width={20}
            alt='Marketplace icon'
          />
        </a>
      </Link>
    );
  }
};
