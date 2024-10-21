import { useEffect, useState } from "react";
import { ProductType } from "../typescript/ProductType";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../api/ProductsAPI";

export function UpdateProduct() {
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [disable, setDisable] = useState(false)
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: any = {
      title,
      description,
      price,
      stock,
      disable,
    };

    if (image) {
      formData.image = image;
    }

    try {
      if (id) {
        await updateProduct(formData, id);
        navigate("/admin");
      } else {
        console.error("Product ID is undefined");
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productData = await getProduct(id);
        setProduct(productData);

        if (productData) {
          setTitle(productData.title);
          setDescription(productData.description);
          setPrice(productData.price);
          setStock(productData.stock);
          setDisable(productData.disable);
          setPreview(productData.imagePath ? `http://localhost:5000/${productData.imagePath}` : null);
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-container">
      <h1>Nouveau produit</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "30%" }}>
        <label>
          Titre :
          <input value={title} onChange={(e) => setTitle(e.target.value)} required={true} />
        </label>
        <label>
          Description :
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required={true} />
        </label>
        <label>
          Prix :
          <input pattern="[0-9]*" value={price} onChange={(e) => setPrice(Number(e.target.value))} required={true} />
        </label>
        <label>
          Quantité :
          <input pattern="[0-9]*" value={stock} onChange={(e) => setStock(Number(e.target.value))} required={true} />
        </label>
        <label>
          Disponibilité :
          <input type="checkbox" defaultChecked={disable} readOnly={false} onClick={() => {
            setDisable(!disable)
            console.log(disable)
          }} />
        </label>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {preview && (
          <div>
            <p>Prévisualisation de l'image:</p>
            <img src={preview} alt="Preview" style={{ width: '200px', height: 'auto' }} />
          </div>
        )}

        <input type="submit" value="Modifier" />
      </form>
    </div>
  )
}

