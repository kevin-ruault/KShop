import { useState } from "react"
import { createProduct } from "../api/ProductsAPI"

export function Admin() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [image, setImage] = useState<File | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifie que l'image est sélectionnée
    if (!image) {
      alert('Please upload an image.');
      return;
    }

    const formData = {
      title,
      description,
      price,
      stock,
      image, // Fichier sélectionné
    };

    try {
      await createProduct(formData); // Envoie les données du produit et l'image au serveur
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "30%" }}>
        <label>
          Titre :
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description :
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Prix :
          <input pattern="[0-9]*" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
        <label>
          Prix :
          <input pattern="[0-9]*" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
        </label>
        <label>Upload Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <input type="submit" value="Créer" />
      </form>
    </div>
  )
}