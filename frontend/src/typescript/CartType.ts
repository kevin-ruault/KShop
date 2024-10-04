import { ProductType } from "./ProductType";

export type CartType = {
  user_id: string;
  products: [];
  total_price: Number;
};

export type DisplayCartType = {
  products: {
    product: ProductType;
    quantity: Number;
  }[];
  totalPrice: Number;
};
