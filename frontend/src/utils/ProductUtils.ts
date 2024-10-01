import { getProducts } from "../api/ProductsAPI";
import { ProductType } from "../typescript/ProductType";

export const fetchUpdatedProducts = async (
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
) => {
  try {
    const productsData = await getProducts();
    setProducts(productsData);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};
