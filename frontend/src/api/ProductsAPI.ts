import axios from "axios";
import {
  CreateProductType,
  ProductType,
  UpdateProductType,
} from "../typescript/ProductType";

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

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price.toString());
    formData.append("stock", form.stock.toString());

    if (form.image) {
      formData.append("image", form.image);
    }

    const response = await axios.post(
      "http://localhost:5000/product/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function updateProduct(form: UpdateProductType, id: string) {
  try {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price.toString());
    formData.append("stock", form.stock.toString());

    if (form.image) {
      formData.append("image", form.image);
    }

    const response = await axios.put(
      `http://localhost:5000/product/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
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
