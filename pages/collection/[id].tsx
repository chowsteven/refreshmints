import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CollectionOverview } from '../../components/CollectionOverview';
import { Holders } from '../../components/Holders';
import { useCollectionData } from '../../hooks/useCollectionData';
import { useHolderDistribution } from '../../hooks/useHolderDistribution';

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const collectionId: string = id as string;
  const { collectionData, error: collectionDataError } =
    useCollectionData(collectionId);
  const { numHoldersArr, error: numHoldersError } =
    useHolderDistribution(collectionId);

  if (collectionDataError) {
    return <div>{collectionDataError.message}</div>;
  }

  if (numHoldersError) {
    return <div>{numHoldersError.message}</div>;
  }

  return (
    <div className='p-12'>
      {collectionData ? (
        <div className='flex flex-col gap-4 lg:flex-row lg:gap-48'>
          <CollectionOverview collectionData={collectionData.collections[0]} />
          <Holders
            numHoldersArr={numHoldersArr}
            collectionData={collectionData.collections[0]}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CollectionPage;
