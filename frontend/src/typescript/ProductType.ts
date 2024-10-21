export type ProductType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  disable: boolean;
  imagePath?: string;
};

export type CreateProductType = {
  title: string;
  description: string;
  price: number;
  stock: number;
  image: File;
};

export type UpdateProductType = {
  title: string;
  description: string;
  price: number;
  stock: number;
  disable: boolean;
  image?: File | null;
};

export type ProductsContextType = {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};
