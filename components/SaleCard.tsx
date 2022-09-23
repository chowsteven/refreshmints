import Image from 'next/image';
import { ExternalTokenIconSale } from './ExternalTokenIconSale';
import { SingleSale } from '../interfaces/CollectionSalesData';
import { DateTime } from 'luxon';

interface SaleCardProps {
  sale: SingleSale;
}

export const SaleCard = ({ sale }: SaleCardProps) => {
  const relativeTime = DateTime.fromSeconds(sale.timestamp).toRelative();

  return (
    <div className='flex justify-between max-w-[512px] h-16 p-1 pr-2 my-2 bg-gray-800 rounded-md'>
      <div className='flex gap-2'>
        <Image
          src={sale.token.image ? sale.token.image : '/images/eth.png'}
          height={48}
          width={48}
          alt='Token image'
        />
        <div className='font-medium text-sm'>#{sale.token.tokenId}</div>{' '}
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
            {sale.price.amount.decimal}
          </span>
          <div className='flex gap-2'>
            <ExternalTokenIconSale
              marketplace={sale.orderSource}
              collectionId={sale.token.collection.id}
              tokenId={sale.token.tokenId}
              txHash={sale.txHash}
            />
            <ExternalTokenIconSale
              marketplace='etherscan.io'
              collectionId={sale.token.collection.id}
              tokenId={sale.token.tokenId}
              txHash={sale.txHash}
            />
          </div>
        </div>

        <div>
          <div className='text-sm text-gray-400'>{relativeTime}</div>
        </div>
      </div>
    </div>
  );
};
