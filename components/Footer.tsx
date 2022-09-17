import useSWR from 'swr';
import Image from 'next/image';
import { Price } from '../interfaces/Price';
import { Gas } from '../interfaces/Gas';
import { fetcher } from '../utils/fetcher';

export const Footer = () => {
  // fetch eth price
  const { data: price, error: priceErr } = useSWR<Price, Error>(
    '/api/eth/price',
    fetcher
  );

  // fetch gas prices
  const { data: gas, error: gasErr } = useSWR<Gas, Error>(
    '/api/eth/gas',
    fetcher
  );

  return (
    <footer className='flex justify-center gap-24 px-12 py-3 bg-gray-800'>
      {/* eth price */}
      <div className='flex items-center gap-2'>
        <Image
          src='/images/eth.png'
          height={24}
          width={24}
          alt='Ethereum logo'
        />
        <span className={price && 'font-medium'}>
          {/* if error, show error message
          if fetching, show loading message
          else show price */}
          {priceErr
            ? priceErr.message
            : price
            ? `$${price.result.ethusd}`
            : 'Fetching ETH price...'}
        </span>
      </div>

      {/* gas prices */}
      <div className='flex items-center gap-4'>
        <Image src='/images/gas.png' height={24} width={24} alt='Gas icon' />
        <span className='flex items-center gap-1.5'>
          {/* if error, show error message
          if fetching, show loading message
          else show current slow and gas gwei */}
          {gasErr ? (
            gasErr.message
          ) : gas ? (
            <>
              <Image
                src='/images/slow.png'
                height={24}
                width={24}
                alt='Turtle'
              />{' '}
              <span className='font-medium'>{gas.result.SafeGasPrice} | </span>
              <Image
                src='/images/fast.png'
                height={24}
                width={24}
                alt='Lightning bolt'
              />
              <span className='font-medium'>{gas.result.FastGasPrice} </span>
              <span className='self-end text-xs'>gwei</span>
            </>
          ) : (
            'Fetching gas...'
          )}
        </span>
      </div>
    </footer>
  );
};
