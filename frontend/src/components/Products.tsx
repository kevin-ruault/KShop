import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

export function Products() {
  const { products, setProducts } = useContext(ProductsContext)

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
