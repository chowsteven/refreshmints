import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { fetcher } from '../utils/fetcher';
import { SingleCollection } from '../interfaces/CollectionData';
import { AutocompleteSuggestion } from './AutocompleteSuggestion';

export const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Array<SingleCollection>>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, error } = useSWR<Array<SingleCollection>, Error>(
    () =>
      debouncedSearchTerm
        ? `/api/nft/collection/search?q=${debouncedSearchTerm}`
        : null,
    fetcher,
    {
      onSuccess: (data) => {
        setSuggestions(data);
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // if user un-focuses the input field and then clicks back in,
  // show suggestions based on the value in the input field
  const handleClick = () => {
    if (data) {
      setSuggestions(data);
    }
  };

  // hide suggestions if user clicks out of input field
  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  };

  return (
    <div className='relative'>
      {/* input field */}
      <input
        type='text'
        value={searchTerm}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
        placeholder='Search by address, name, or slug...'
        className='w-36 px-2 py-1 rounded-md text-sm text-white font-medium bg-gray-600 placeholder-gray-300 md:w-72'
      />

      {/* autocomplete suggestions */}
      <div className='absolute top-full left-0 right-0 rounded-md bg-gray-700'>
        {suggestions &&
          suggestions.length !== 0 &&
          suggestions.map((collection, index: number) => (
            <AutocompleteSuggestion
              key={index}
              collection={collection}
              setSearchTerm={setSearchTerm}
              setSuggestions={setSuggestions}
            />
          ))}
      </div>
    </div>
  );
};
