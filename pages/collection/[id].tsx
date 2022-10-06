import type { NextPage } from 'next';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { CollectionOverview } from '../../components/CollectionOverview';
import { CollectionSales } from '../../components/CollectionSales';
import { CollectionListings } from '../../components/CollectionListings';
import { Holders } from '../../components/Holders';
import { useCollectionData } from '../../hooks/useCollectionData';
import { useHolderDistribution } from '../../hooks/useHolderDistribution';
import { useCollectionSales } from '../../hooks/useCollectionSales';
import { useCollectionListings } from '../../hooks/useCollectionListings';
import { CollectionData } from '../../interfaces/CollectionData';
import { HoldersInfo } from '../../interfaces/HoldersInfo';
import { CollectionListingsData } from '../../interfaces/CollectionListingsData';
import { CollectionSalesData } from '../../interfaces/CollectionSalesData';
import { ActivityOverview } from '../../components/ActivityOverview';

interface CollectionPageProps {
  collection: CollectionData;
  holders: HoldersInfo;
  listings: CollectionListingsData;
  sales: CollectionSalesData;
}

const CollectionPage: NextPage<CollectionPageProps> = ({
  collection,
  holders,
  listings,
  sales,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const collectionId: string = id as string;
  const { collectionData, error: collectionDataError } =
    useCollectionData(collectionId);
  const { numHoldersArr, error: numHoldersError } =
    useHolderDistribution(collectionId);
  const { collectionSalesData, error: collectionSalesDataError } =
    useCollectionSales(collectionId);
  const { collectionListingsData, error: collectionListingsDataError } =
    useCollectionListings(collectionId);

  // TODO: ERROR HANDLING

  // TODO: cleaner/more readable
  return (
    <>
      <Head>
        <title>{collectionData?.collections[0].name}</title>
        <link rel='icon' href='/images/favicon.ico' />
      </Head>

      <div className='p-12'>
        {/* header */}
        <div className='mb-12'>
          {collectionData && numHoldersArr && collectionSalesData ? (
            <div className='flex flex-col gap-4 2xl:flex-row 2xl:gap-12'>
              <CollectionOverview
                collectionData={collectionData.collections[0]}
              />
              <Holders
                numHoldersArr={numHoldersArr}
                collectionData={collectionData.collections[0]}
              />
              <ActivityOverview
                collectionData={collectionData.collections[0]}
                collectionSalesData={collectionSalesData}
              />
            </div>
          ) : (
            <div className='flex flex-col gap-4 lg:flex-row lg:gap-48'>
              <CollectionOverview collectionData={collection.collections[0]} />
              <Holders
                numHoldersArr={numHoldersArr}
                collectionData={collection.collections[0]}
              />
              <ActivityOverview
                collectionData={collection.collections[0]}
                collectionSalesData={sales}
              />
            </div>
          )}
        </div>

        {/* body */}
        {/* TODO: for most recent mints, show a not available listings and trades msg */}
        <div className='flex flex-col gap-4 md:flex-row md:justify-center md:gap-16'>
          {/* listings */}
          <div className='md:w-96 lg:w-[512px]'>
            {/* listings header  */}
            <div className='mb-1'>
              <div className='font-medium text-sm'>
                LISTINGS{' '}
                <span className='text-xs text-gray-400'>(15 LOWEST)</span>
              </div>
              <div className='text-green-300 text-xs'>Feed is live</div>
            </div>
            {/* listings body */}
            <div className='max-w-[512px] mb-4'>
              {collectionListingsData ? (
                <CollectionListings
                  collectionListingsData={collectionListingsData}
                />
              ) : (
                // use serversideprops if hook not done fetching
                <CollectionListings collectionListingsData={listings} />
              )}
            </div>
          </div>

          {/* sales */}
          <div className='flex flex-col gap-4 md:flex-row'>
            <div className='md:w-96 lg:w-[512px]'>
              <div className='mb-1'>
                <div className='font-medium text-sm'>
                  TRADES{' '}
                  <span className='text-xs text-gray-400'>(15 LATEST)</span>
                </div>
                <div className='text-green-300 text-xs'>Feed is live</div>
              </div>
              <div className='max-w-[512px] mb-4'>
                {collectionSalesData ? (
                  <CollectionSales collectionSalesData={collectionSalesData} />
                ) : (
                  // use serversideprops if hook not done fetching
                  // SSP does not filter out mints, so for collections that are actively minting,
                  // there will be a flash of sales
                  // this will be gone when the hook, which filters out mints, is done fetching
                  <CollectionSales collectionSalesData={sales} />
                )}
              </div>
            </div>
          </div>

          {/* chart */}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  // https://stackoverflow.com/a/65546189
  const [collectionRes, holdersRes, listingsRes, salesRes] = await Promise.all([
    fetch(`https://refreshmints.vercel.app/api/nft/collection/${id}`),
    fetch(`https://refreshmints.vercel.app/api/nft/holders/${id}`),
    fetch(`https://refreshmints.vercel.app/api/nft/listings/${id}`),
    fetch(`https://refreshmints.vercel.app/api/nft/sales/${id}`),
  ]);

  const [collection, holders, listings, sales] = await Promise.all([
    collectionRes.json(),
    holdersRes.json(),
    listingsRes.json(),
    salesRes.json(),
  ]);

  return {
    props: {
      collection,
      holders,
      listings,
      sales,
    },
  };
};

export default CollectionPage;
