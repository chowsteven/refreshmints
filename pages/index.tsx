import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Refreshmints</title>
        <meta name='description' content='Regarding fresh mints' />
        <link rel='icon' href='/images/favicon.ico' />
      </Head>

      <div className='flex flex-col items-center gap-12 h-full pt-24 md:pt-48'>
        <div className='text-4xl md:text-6xl xl:text-8xl font-bold'>
          Regarding fresh mints
        </div>
        <div className='text-xl md:text-3xl font-semibold'>
          See the latest sales, listings, and more!
        </div>
        <div className='flex flex-col gap-4 md:text-lg'>
          <div className='flex items-center gap-2'>
            <Image
              src='/images/check.png'
              height={24}
              width={24}
              alt='Checkmark'
            />
            Search for your favorite collection
          </div>
          <div className='flex items-center gap-2'>
            <Image
              src='/images/check.png'
              height={24}
              width={24}
              alt='Checkmark'
            />
            Look through the freshest{' '}
            <Link href='/mints'>
              <a className='text-red-400'>mints</a>
            </Link>
          </div>
          {/* <div className='flex items-center gap-2'>
            <Image
              src='/images/check.png'
              height={24}
              width={24}
              alt='Checkmark'
            />
            Check out the continuous{' '}
            <Link href='/firehose'>
              <a className='text-blue-400'>firehose</a>
            </Link>
          </div> */}
          <div className='flex items-center gap-2'>
            <Image
              src='/images/check.png'
              height={24}
              width={24}
              alt='Checkmark'
            />
            Check out NFTs that are
            <Link href='/trending'>
              <a className='text-green-400'>trending</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
