type Product = {
  _id: string;
  name: string;
  slug: string;
  category: string; // Assuming category stores ObjectId as a string
  price: number;
  image?: string;
  gallery?: string[];
  description?: string;
  discount?: number;
  countInStock?: number;
  featured?: boolean;
  tags?: string[];
  attributes?: string[]; // Assuming attributes store ObjectId as strings
};
