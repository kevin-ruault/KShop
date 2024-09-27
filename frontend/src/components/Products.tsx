import { useEffect, useState } from "react";
import { ProductType } from "../typescript/ProductType";
import { getProducts } from "../api/ProductsAPI";
import { NavLink } from "react-router-dom";

export function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);

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
