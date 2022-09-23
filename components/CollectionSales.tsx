import { SaleCard } from './SaleCard';
import { SingleSale } from '../interfaces/CollectionSalesData';
import { CollectionSalesData } from '../interfaces/CollectionSalesData';

interface CollectionSalesProps {
  collectionSalesData: CollectionSalesData;
}

export const CollectionSales = ({
  collectionSalesData,
}: CollectionSalesProps) => {
  console.log(collectionSalesData);
  return (
    <>
      {collectionSalesData ? (
        // TODO: increase height to fit ~500 sales but avoid full-page scroll
        // may have to change flex-1 property in layout
        <div className='h-[300px] overflow-y-auto scrollbar'>
          {collectionSalesData.sales.map((sale: SingleSale, index: number) => (
            <SaleCard key={index} sale={sale} />
          ))}
        </div>
      ) : null}
    </>
  );
};
