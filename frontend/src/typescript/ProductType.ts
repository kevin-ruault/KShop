export type ProductType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  imagePath?: string;
};

export type CreateProductType = {
  title: string;
  description: string;
  price: number;
  stock: number;
  image?: File | null;
};

export type ProductsContextType = {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};
