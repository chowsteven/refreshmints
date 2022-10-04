import { SaleCard } from './SaleCard';
import { SingleSale } from '../interfaces/CollectionSalesData';
import { CollectionSalesData } from '../interfaces/CollectionSalesData';

interface CollectionSalesProps {
  collectionSalesData: CollectionSalesData;
}

export const CollectionSales = ({
  collectionSalesData,
}: CollectionSalesProps) => {
  return (
    <>
      {collectionSalesData ? (
        <div className='h-[960px] overflow-y-auto scrollbar'>
          {collectionSalesData.sales.map((sale: SingleSale, index: number) => (
            <SaleCard key={index} sale={sale} />
          ))}
        </div>
      ) : null}
    </>
  );
};
