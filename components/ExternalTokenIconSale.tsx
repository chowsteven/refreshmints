import Image from 'next/image';
import Link from 'next/link';

interface ExternalTokenIconSaleProps {
  marketplace: string | null;
  collectionId: string | null;
  tokenId: string;
  txHash: string;
}

export const ExternalTokenIconSale = ({
  marketplace,
  collectionId,
  tokenId,
  txHash,
}: ExternalTokenIconSaleProps) => {
  let marketplaceBase = '';
  let image = '';

  // set base urls and image names
  if (marketplace === 'opensea.io') {
    marketplaceBase = 'https://opensea.io/assets/ethereum/';
    image = 'opensea';
  } else if (marketplace === 'looksrare.org') {
    marketplaceBase = 'https://looksrare.org/collections/';
    image = 'looksrare';
  } else if (marketplace === 'x2y2.io') {
    marketplaceBase = 'https://x2y2.io/eth/';
    image = 'x2y2';
  } else if (marketplace === 'etherscan.io') {
    marketplaceBase = 'https://etherscan.io/token/';
    image = 'etherscan';
  } else if (marketplace === 'atomic0.com') {
    marketplaceBase = 'https://atomic0.com/nft/';
  } else if (marketplace === 'cryptopunks.app') {
    marketplaceBase = 'https://cryptopunks.app//cryptopunks/details/';
  }

  // if etherscan, provide a link to the tx
  // else, link to the token on market
  if (marketplace === 'etherscan.io') {
    return (
      <Link href={`https://etherscan.io/tx/${txHash}`}>
        <a>
          <Image
            src={`/images/${image}.png`}
            height={20}
            width={20}
            alt='Marketplace icon'
          />
        </a>
      </Link>
    );
  } else if (marketplace === 'atomic0.com') {
    return (
      <Link href={marketplaceBase + collectionId + '/' + tokenId}>
        <a>
          <Image
            src={`/images/atomic0.svg`}
            height={20}
            width={20}
            alt='Marketplace icon'
          />
        </a>
      </Link>
    );
  } else if (marketplace === 'cryptopunks.app') {
    return (
      <Link href={marketplaceBase + tokenId}>
        <a>
          <Image
            src={`/images/cryptopunks.png`}
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
            src={`/images/${image}.png`}
            height={20}
            width={20}
            alt='Marketplace icon'
          />
        </a>
      </Link>
    );
  }
};
