export interface SingleListing {
  id: string;
  kind: string;
  side: string;
  status: string;
  tokenSetId: string;
  tokenSetSchemaHash: string;
  contract: string;
  maker: string;
  taker: string;
  price: {
    currency: {
      contract: string;
      name: string;
      symbol: string;
      decimal: number;
    };
    amount: {
      raw: string;
      decimal: number;
      usd: number;
      native: number;
    };
    netAmount: {
      raw: string;
      decimal: number;
      usd: number;
      native: number;
    };
  };
  validFrom: number;
  validUntil: number;
  quantityFilled: number;
  quantityRemaining: number;
  metadata: {
    kind: string;
    data: {
      collectionName: string;
      tokenName: string;
      image: string;
    };
  };
  source: {
    id: string;
    name: string;
    icon: string;
    url: string;
  };
  feeBps: number;
  feeBreakdown: [
    {
      bps: number;
      kind: string;
      recipient: string;
    }
  ];
  expiration: number;
  isReservoir: boolean | null;
  isDynamic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionListingsData {
  orders: SingleListing[];
  continuation: string | null;
}
