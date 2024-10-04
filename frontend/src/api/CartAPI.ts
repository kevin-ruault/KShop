import axios from "axios";

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
