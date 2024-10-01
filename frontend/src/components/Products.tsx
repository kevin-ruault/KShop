import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { fetchUpdatedProducts } from "../utils/ProductUtils";

export function Products() {
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    fetchUpdatedProducts(setProducts);
  }, [products])

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
