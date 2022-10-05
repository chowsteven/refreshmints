import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchOptions } from '../../../../utils/fetchOptions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let url: string;
  const { id } = req.query;

  // fetch collection
  const queryId = id as string;

  if (queryId.length > 42) {
    // fetching more than one collection
    url = `https://api.reservoir.tools/collections/v5?contract=${queryId}&includeTopBid=false&limit=10`;
  } else {
    // one collection
    url = `https://api.reservoir.tools/collections/v5?id=${queryId}&includeTopBid=false&includeOwnerCount=true&limit=1`;
  }
  const response = await fetch(url, fetchOptions);

  // if error, send error message
  // TODO: improve error handling
  if (!response.ok) {
    res.status(404).json({ message: 'Unexpected error occurred.' });
  }

  // send sales as json
  const collectionData = await response.json();
  res.status(200).json(collectionData);
}
