import type { NextPage } from 'next';
import Head from 'next/head';

const Trending: NextPage = () => {
  return (
    <>
      <Head>
        <title>Trending</title>
        <link rel='icon' href='/images/favicon.ico' />
      </Head>

      <div className='flex justify-center pt-36 text-4xl font-semibold'>
        This page is currently undergoing maintenance and waiting on API
        updates.
      </div>
    </>
  );
};

export default Trending;
