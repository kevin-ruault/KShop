import axios from "axios";
import { ProductType } from "../typescript/ProductType";

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
