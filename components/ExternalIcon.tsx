import Image from 'next/image';
import Link from 'next/link';

interface ExternalIconProps {
  marketplace: 'opensea' | 'looksrare' | 'x2y2' | 'etherscan';
  collectionId: string;
  tokenId: string;
}

export const ExternalIcon = ({
  marketplace,
  collectionId,
  tokenId,
}: ExternalIconProps) => {
  let marketplaceBase = '';
  if (marketplace === 'opensea') {
    marketplaceBase = 'https://opensea.io/assets/ethereum/';
  } else if (marketplace === 'looksrare') {
    marketplaceBase = 'https://looksrare.org/collections/';
  } else if (marketplace === 'x2y2') {
    marketplaceBase = 'https://x2y2.io/eth/';
  } else {
    marketplaceBase = 'https://etherscan.io/token/';
  }

  if (marketplace === 'etherscan') {
    return (
      <Link href={marketplaceBase + collectionId + '?a' + tokenId}>
        <a>
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
      <Link href={marketplaceBase + collectionId + '/' + tokenId}>
        <a>
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
