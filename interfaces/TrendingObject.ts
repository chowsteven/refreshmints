export interface TrendingObject {
  [collection: string]: {
    count: number;
    floor: number | null;
    id: string;
    image: string | null;
    name: string;
    volume: number;
  };
}
