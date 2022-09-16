import useSWR from 'swr';
import Image from 'next/image';

export const Footer = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: price, error: priceErr } = useSWR('/api/eth/price', fetcher);
  const { data: gas, error: gasErr } = useSWR('/api/eth/gas', fetcher);

  console.log(gas);
  return (
    <footer className='flex justify-center gap-24 px-12 py-3 bg-gray-800'>
      <div className='flex items-center gap-2'>
        <Image
          src='/images/eth.png'
          height={24}
          width={24}
          alt='Ethereum logo'
        />
        <span>
          {priceErr
            ? priceErr.message
            : price
            ? `$${price.result.ethusd}`
            : 'Fetching ETH price...'}
        </span>
      </div>
      <div className='flex items-center gap-4'>
        <Image src='/images/gas.png' height={24} width={24} alt='Gas icon' />
        <span className='flex items-center gap-1.5'>
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
