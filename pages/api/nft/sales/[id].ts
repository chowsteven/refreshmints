import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchOptions } from '../../../../utils/fetchOptions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  // fetch latest sales
  const url = `https://api.reservoir.tools/sales/v4?contract=${id}&includeTokenMetadata=true&limit=5`;
  const response = await fetch(url, fetchOptions);

  // if error, send error message
  // TODO: improve error handling
  if (!response.ok) {
    res.status(404).json({ message: 'Unexpected error occurred.' });
  }

  // send sales as json
  const sales = await response.json();
  res.status(200).json(sales);
}
