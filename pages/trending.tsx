import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useTrendingCollections } from '../hooks/useTrendingCollections';
import { DateTime } from 'luxon';
import { TrendingContainer } from '../components/TrendingContainer';

const Trending: NextPage = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [startTimestamp, setStartTimestamp] = useState<number>(0);

  // on component mount, get timestamp and set up interval
  useEffect(() => {
    setStartTimestamp(DateTime.now().minus({ minutes: activeTab }).toSeconds());

    const interval = setInterval(() => {
      // set timestamps on mount
      setStartTimestamp(
        DateTime.now().minus({ minutes: activeTab }).toSeconds()
      );
    }, 10000);

    // clear interval on unmount
    return () => clearInterval(interval);
  }, [activeTab]);

  // fetch trending collections based on startTimestamp
  const { trendingArr } = useTrendingCollections(
    Math.round(startTimestamp).toString()
  );

  return (
    <>
      <Head>
        <title>Trending</title>
        <link rel='icon' href='/images/favicon.ico' />
      </Head>

      {/* header and tabs */}
      <div className='flex flex-col justify-center items-center p-24'>
        <div className='flex items-center gap-24 mb-12'>
          <span className='text-3xl font-medium'>Trending Collections</span>
          <div className='flex items-center gap-2 text-sm'>
            <span
              onClick={() => setActiveTab(1)}
              className={`p-2 hover:cursor-pointer ${
                activeTab === 1 ? 'border rounded-md' : ''
              }`}
            >
              1M
            </span>
            <span
              onClick={() => setActiveTab(5)}
              className={`p-2 hover:cursor-pointer ${
                activeTab === 5 ? 'border rounded-md' : ''
              }`}
            >
              5M
            </span>
            {/* implement this when continuation string in useTrendingCollections is utilized */}
            {/* <span
              onClick={() => setActiveTab(15)}
              className={`p-2 hover:cursor-pointer ${
                activeTab === 15 ? 'border rounded-md' : ''
              }`}
            >
              15M
            </span> */}
          </div>
        </div>

        {/* trending table */}
        <TrendingContainer trendingArr={trendingArr} />
      </div>
    </>
  );
};

export default Trending;
