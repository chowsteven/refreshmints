import { SingleCollection } from '../interfaces/CollectionData';
import { OverviewStat } from './OverviewStat';

interface HoldersProps {
  numHoldersArr: number[];
  collectionData: SingleCollection;
}

export const Holders = ({ numHoldersArr, collectionData }: HoldersProps) => {
  // round avg owned to one decimal place
  const avgOwned =
    Math.round(
      (Number(collectionData.tokenCount) / collectionData.ownerCount) * 10
    ) / 10;

  // round percent unique holders to nearest integer
  const uniqueHolders = Math.round(
    (collectionData.ownerCount / Number(collectionData.tokenCount)) * 100
  );

  return (
    <div className='flex flex-col gap-4 xl:gap-12 xl:flex-row'>
      <div className='flex justify-center gap-12 bg-gray-800 px-12 py-6 rounded-md'>
        <div>
          <OverviewStat stat={collectionData.tokenCount} description='SUPPLY' />
        </div>
        <div>
          <OverviewStat
            stat={collectionData.ownerCount}
            description='HOLDERS'
          />
        </div>
        <div>
          <OverviewStat stat={avgOwned} description='AVG OWNED' />
        </div>
        <div>
          <OverviewStat
            stat={`${uniqueHolders}%`}
            description='UNIQUE HOLDERS'
          />
        </div>
      </div>

      <div className='flex justify-center gap-12 bg-gray-800 px-12 py-6 rounded-md'>
        <div>
          <OverviewStat stat={numHoldersArr[0]} description='HOLDS 1' />
        </div>
        <div>
          <OverviewStat stat={numHoldersArr[1]} description='2-5' />
        </div>
        <div>
          <OverviewStat stat={numHoldersArr[2]} description='6-20' />
        </div>
        <div>
          <OverviewStat stat={numHoldersArr[3]} description='21-50' />
        </div>
        <div>
          <OverviewStat stat={numHoldersArr[4]} description='OVER 50' />
        </div>
      </div>
    </div>
  );
};
