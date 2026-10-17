export type Product = {
  id: string | number;
  name: string;
  slug?: string;
  image?: string;
  price?: number;
  description?: string;
  category?: string;
  [key: string]: unknown;
};