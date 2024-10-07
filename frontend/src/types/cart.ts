export interface CartTypes {
  userId: string;
  products: [{ productId: string; quantity: number }];
}
