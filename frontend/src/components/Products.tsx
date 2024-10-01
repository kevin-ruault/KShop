import { useContext, useEffect, useState } from "react";
import { ProductType } from "../typescript/ProductType";
import { getProducts } from "../api/ProductsAPI";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

export function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const contextValue = useContext(ProductsContext)

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <ul>
      {products.map((product) => (
        <li key={product._id}>
          <NavLink to={product._id}>{product.title}</NavLink>
        </li>
      ))}
    </ul>
  );
}
