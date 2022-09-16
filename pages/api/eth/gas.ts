import type { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  status: string;
  message: string;
  result: {
    LastBlock: string;
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
    suggestBaseFee: string;
    gasUsedRatio: string;
  };
}

interface ErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorResponse>
) {
  const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    res.status(404).json({ message: 'Unexpected error occurred.' });
  }

  const gas: ResponseData = await response.json();
  res.status(200).json(gas);
}
