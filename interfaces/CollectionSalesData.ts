export interface SingleSale {
  id: string;
  saleId: string;
  token: {
    contract: string;
    tokenId: string;
    name: string | null;
    image: string | null;
    collection: {
      id: string | null;
      name: string | null;
    };
  };
  orderId: string | null;
  orderSource: string | null;
  orderSide: string;
  orderKind: string;
  from: string;
  to: string;
  amount: string;
  fillSource: string | null;
  block: number;
  txHash: string;
  logIndex: number;
  batchIndex: number;
  timestamp: number;
  price: {
    currency: {
      contract: string;
      name: string;
      symbol: string;
      decimals: number;
    };
    amount: {
      raw: BigInt;
      decimal: number;
      usd: number;
      native: number;
    };
  };
  washTradingScore: number;
}

export interface CollectionSalesData {
  sales: SingleSale[];
  continuation: string | null;
}
