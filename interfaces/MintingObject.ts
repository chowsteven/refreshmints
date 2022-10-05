export interface MintingObject {
  [collection: string]: {
    count: number;
    id: string;
    image: string | null;
    name: string;
    price: number;
  };
}
