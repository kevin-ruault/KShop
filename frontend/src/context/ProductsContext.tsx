import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ProductsContextType, ProductType } from "../typescript/ProductType";
import { getProducts } from "../api/ProductsAPI";

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => { },
})

export function ProductsContextProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<ProductType[]>([])

  const valueProductsContext = { products: products, setProducts: setProducts }

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={valueProductsContext}>
      {children}
    </ProductsContext.Provider>
  )
}