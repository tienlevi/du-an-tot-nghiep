export interface Order {
  _id: string;
  customer: string;
  totalPrice: string;
  status: string;
  items: Array<{
    product: string;
    quantity: string;
    price: number;
  }>;
  createdAt: string;
}
