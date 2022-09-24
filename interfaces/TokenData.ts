export interface TokenAttribute {
  key: string;
  value: string;
  tokenCount: number;
  onSaleCount: number;
  floorAskPrice: number;
  topBidValue: number | null;
}

export interface SingleToken {
  token: {
    contract: string;
    tokenId: string;
    name: string;
    description: string;
    image: string;
    media: string | null;
    kind: string;
    isFlagged: boolean;
    lastFlagUpdate: string;
    rarity: number;
    rarityRank: number;
    collection: {
      id: string;
      name: string;
      image: string;
      slug: string;
    };
    lastBuy: {
      value: number | null;
      timestamp: number | null;
    };
    lastSell: {
      value: number | null;
      timestamp: number | null;
    };
    owner: string;
    attributes?: Array<TokenAttribute>;
  };
  market: {
    floorAsk: {
      id: string | null;
      price: number | null;
      maker: string | null;
      validFrom: number | null;
      validUntil: number | null;
      source: {
        id?: string;
        name?: string;
        icon?: string;
        url?: string;
      };
    };
  };
}

export interface TokenData {
  tokens: Array<SingleToken>;
  continuation: string | null;
}
