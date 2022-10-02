import Image from 'next/image';
import Link from 'next/link';

interface ExternalTokenIconListingProps {
  marketplace: string;
  url: string;
}

export const ExternalTokenIconListing = ({
  marketplace,
  url,
}: ExternalTokenIconListingProps) => {
  if (marketplace === 'CryptoPunks') {
    return (
      <Link href='https://cryptopunks.app/cryptopunks/forsale' passHref={true}>
        <a>
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
        <a>
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
