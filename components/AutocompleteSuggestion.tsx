import Link from 'next/link';
import Image from 'next/image';
import { SingleCollection } from '../interfaces/CollectionData';

interface AutocompleteSuggestionProps {
  collection: SingleCollection;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSuggestions: React.Dispatch<React.SetStateAction<SingleCollection[]>>;
}

export const AutocompleteSuggestion = ({
  collection,
  setSearchTerm,
  setSuggestions,
}: AutocompleteSuggestionProps) => {
  const truncatedCollectionId =
    collection.id.slice(0, 7) + '...' + collection.id.slice(-8);

  // clear input field and hide suggestions
  const handleClick = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div
      onClick={handleClick}
      className='w-full h-11 py-1 rounded-md z-10 hover:bg-gray-600'
    >
      <Link href={`/collection/${collection.id}`}>
        <a className='flex items-center gap-2'>
          <div className='pl-4'>
            <Image
              src={collection.image ? collection.image : '/images/eth.png'}
              width={26}
              height={26}
              alt='Collection image'
            />
          </div>
          <div>
            <p className='w-56 truncate'>{collection.name}</p>
            <p className='text-xs text-gray-400'>{truncatedCollectionId}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};
