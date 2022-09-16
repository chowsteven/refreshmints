import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className='flex justify-center gap-24 px-12 py-3 bg-gray-800'>
      <div className='flex items-center gap-2'>
        <Image
          src='/../public/images/eth.png'
          height={24}
          width={24}
          alt='Ethereum logo'
        />
        <span>ETH Price</span>
      </div>
      <div className='flex items-center gap-2'>
        <Image
          src='/../public/images/gas.png'
          height={24}
          width={24}
          alt='Gas icon'
        />
        <span>Slow, Fast, Rapid GWEI</span>
      </div>
    </footer>
  );
};
