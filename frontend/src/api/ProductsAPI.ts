import axios from "axios";
import { CreateProductType, ProductType } from "../typescript/ProductType";

export async function getProducts(): Promise<ProductType[]> {
  try {
    const res = await axios.get("http://localhost:5000/product");
    return res.data;
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
}

export async function getProduct(id: String): Promise<ProductType> {
  try {
    const res = await axios.get("http://localhost:5000/product/" + id);
    return res.data;
  } catch (error) {
    console.error("Error fetching products", error);
    return {
      _id: "undefined",
      title: "undefined",
      description: "undefined",
      price: 0,
      stock: 0,
    };
  }
}

export async function createProduct(form: CreateProductType) {
  try {
    const formData = new FormData();

    // Ajouter les champs au FormData
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price.toString());
    formData.append("stock", form.stock.toString());

    // Ajouter le fichier image si présent
    if (form.image) {
      formData.append("image", form.image); // L'image doit être un fichier Blob/File
    }

    // Envoi de la requête POST avec les données du formulaire
    const response = await axios.post(
      "http://localhost:5000/product/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Nécessaire pour envoyer des fichiers
        },
      }
    );

    return response.data; // Retourne la réponse si nécessaire
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // Lance l'erreur pour qu'elle puisse être attrapée ailleurs
  }
}

export async function deleteProduct(id: String) {
  try {
    await axios.delete("http://localhost:5000/product/" + id);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
