export interface CreateProductRequest {
  name: string;
  size: string;
  price: number;
  items?: {
    id: string;
  }[];
}
