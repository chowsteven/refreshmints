import { ListingCard } from './ListingCard';
import { SingleListing } from '../interfaces/CollectionListingsData';
import { CollectionListingsData } from '../interfaces/CollectionListingsData';

interface CollectionListingsProps {
  collectionListingsData: CollectionListingsData;
}

export const CollectionListings = ({
  collectionListingsData,
}: CollectionListingsProps) => {
  return (
    <>
      {collectionListingsData ? (
        // TODO: increase height to fit ~500 listings
        <div className='h-[300px] overflow-y-auto scrollbar'>
          {collectionListingsData.orders.map(
            (listing: SingleListing, index: number) => (
              <ListingCard key={index} listing={listing} />
            )
          )}
        </div>
      ) : null}
    </>
  );
};
