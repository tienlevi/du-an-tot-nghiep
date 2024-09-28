export interface Order {
    _id: string;
    customer: string;
    totalPrice: number;
    status: string;
    items: Array<{
      product: string;
      quantity: number;
      price: number;
    }>;
    createdAt: string;
  }
  