export interface SingleCollection {
  id: string;
  slug: string;
  name: string;
  image: string;
  banner: string | null;
  discordUrl: string | null;
  externalUrl: string | null;
  twitterUsername: string | null;
  openseaVerificationStatus: string | null;
  description: string | null;
  sampleImages: string[];
  tokenCount: string;
  onSaleCount: string;
  primaryContract: string;
  tokenSetId: string;
  royalties: {
    bps: number;
    recipient: string;
  };
  lastBuy: {
    value: number | null;
  };
  floorAsk: {
    id: string;
    sourceDomain: string;
    price: {
      currency: {
        contract: string;
        name: string;
        symbol: string;
        decimals: number;
      };
      amount: {
        raw: string;
        decimal: number;
        usd: number;
        native: number;
      };
    };
    maker: string;
    validFrom: number;
    validUntil: number;
    token: {
      contract: string;
      tokenId: string;
      name: string | null;
      image: string;
    };
  };
  rank: {
    '1day': number;
    '7day': number;
    '30day': number;
    allTime: number;
  };
  volume: {
    '1day': number;
    '7day': number;
    '30day': number;
    allTime: number;
  };
  volumeChange: {
    '1day': number;
    '7day': number;
    '30day': number;
  };
  floorSale: {
    '1day': number;
    '7day': number;
    '30day': number;
  };
  floorSaleChange: {
    '1day': number;
    '7day': number;
    '30day': number;
  };
  collectionBidSupported: boolean;
  ownerCount: number;
}

export interface CollectionData {
  collections: Array<SingleCollection>;
}
