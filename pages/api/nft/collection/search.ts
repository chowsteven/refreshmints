import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchOptions } from '../../../../utils/fetchOptions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query;
  const query = q as string;

  // if query matches an ethereum contract address, fetch with contract
  if (query.match(/^0x[a-fA-F0-9]{40}$/)) {
    const url = `https://api.reservoir.tools/collections/v5?contract=${query}&limit=1`;
    const response = await fetch(url, fetchOptions);

    // if error, send error message
    // TODO: improve error handling
    if (!response.ok) {
      res.status(404).json({ message: 'Unexpected error occurred.' });
    }

    // send collection array as json
    const resp = await response.json();
    const searchResults = resp.collections;
    res.status(200).json(searchResults);
  } else {
    // fetch collection with both slug and name
    const slugURL = `https://api.reservoir.tools/collections/v5?slug=${query}&limit=1`;
    const nameURL = `https://api.reservoir.tools/collections/v5?name=${query}&limit=7`;

    // fetch in parallel
    const [slugCollection, nameCollections] = await Promise.all([
      fetch(slugURL, fetchOptions),
      fetch(nameURL, fetchOptions),
    ]);

    const [slugCollectionData, nameCollectionsData] = await Promise.all([
      slugCollection.json(),
      nameCollections.json(),
    ]);

    // TODO: error handling

    // slugCollectionData collections array will be empty or contain one collection
    // concat arrays to show slug collection first if applicable and name collections second
    // this make it so if the user searches i.e. "crypto", the collection with slug crypto will show
    // but other collections like CryptoPunks will also show
    const searchResults = slugCollectionData.collections.concat(
      nameCollectionsData.collections
    );
    res.status(200).json(searchResults);
  }
}
