import { Product } from './product';

export interface CartTypes {
  userId: string;
  products: [{ product: Product; productId: string }];
  quantity: number;
}
