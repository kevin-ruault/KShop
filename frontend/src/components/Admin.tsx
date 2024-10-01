import { useContext, useEffect, useState } from "react";
import { deleteProduct } from "../api/ProductsAPI";
import { ProductType } from "../typescript/ProductType";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

export function Admin() {
  const { products, setProducts } = useContext(ProductsContext)

  function handleDelete(id: string) {
    deleteProduct(id).then(() => {
      setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
    });
  }

  return (
    <div>
      <h1>Admin</h1>
      <NavLink to={"newproduct"}>Ajouter un produit</NavLink>
      <h2>Tous les produits</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} style={{ display: "flex", gap: "50px", alignItems: "center" }}>
            <p>{product.title}</p><p>{product.price}€</p><p>{product.stock}</p><NavLink to={product._id}>Modifier</NavLink><button onClick={() => handleDelete(product._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default Admin