import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Refreshmints</title>
        <meta name='description' content='Regarding fresh mints' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
};

export default Home;
