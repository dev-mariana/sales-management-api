export interface CreateProductInput {
  name: string;
  size: string;
  price: number;
  items?: {
    id: string;
  }[];
}
