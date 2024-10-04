import axios from "axios";
import { getProduct } from "./ProductsAPI";
import { ProductType } from "../typescript/ProductType";
import { DisplayCartType } from "../typescript/CartType";

export const getCart = async (
  token: string
): Promise<DisplayCartType | undefined> => {
  try {
    const response = await axios.get("http://localhost:5000/cart/cart", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const products = response.data.products;

    let productPromises: Promise<{ product: ProductType; quantity: number }>[] =
      [];

    products.forEach((element: { product_id: String; quantity: number }) => {
      const productPromise = getProduct(element.product_id).then((product) => ({
        product,
        quantity: element.quantity,
      }));
      productPromises.push(productPromise);
    });

    const resolvedProducts = await Promise.all(productPromises);

    return {
      products: resolvedProducts,
      totalPrice: response.data.total_price,
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

// Fonction pour ajouter un produit au panier
export const addToCart = async (productId: string, token: string) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/cart/add",
      { productId }, // Envoyer l'ID du produit
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ajouter le token pour l'authentification
        },
      }
    );

    if (response.status === 200) {
      alert("Produit ajouté au panier !");
    } else {
      alert("Erreur lors de l'ajout au panier");
    }
  } catch (error) {
    alert("Une erreur s'est produite");
  }
};

export const removeFromCart = async (productId: string, token: string) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/cart/remove",
      { productId }, // Envoyer l'ID du produit
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ajouter le token pour l'authentification
        },
      }
    );
    if (response.status === 200) {
      alert("Produit retiré du panier !");
    } else {
      alert("Erreur lors de la suppression du panier");
    }
  } catch (error) {
    alert("Une erreur s'est produite");
  }
};
