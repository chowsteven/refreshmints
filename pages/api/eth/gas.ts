import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fetch gas prices
  const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const response = await fetch(url);

  // if error, show error message
  if (!response.ok) {
    res.status(404).json({ message: 'Unexpected error occurred.' });
  }

  // send gas prices as json
  const gas = await response.json();
  res.status(200).json(gas);
}
