export interface Order {
  _id?: string;
  orderId: string;
  userId: string;
  items: [];
  email: string;
  name: string;
  address: string;
  totalPrice: number;
  method: string;
  phone: string;
  status: string;
}
