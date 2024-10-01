import { useEffect, useState } from "react";
import { ProductType } from "../typescript/ProductType";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/ProductsAPI";

export function Product() {
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();

  function handleCartClick() {
    console.log("ajouter au panier")
  }

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productData = await getProduct(id);
        setProduct(productData);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-card" key={product._id} style={styles.container}>
      <div className="product-image" style={styles.imageContainer}>
        <img src={`http://localhost:5000/${product.imagePath}`} alt={product.title} style={styles.image} />
      </div>
      <div className="product-details" style={styles.details}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Stock:</strong> {product.stock} items left</p>
        <button onClick={handleCartClick}>Ajouter au panier</button>
      </div>
    </div>
  );
};

// Styles inline pour simplifier
const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '400px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 'auto',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  details: {
    marginTop: '10px',
    textAlign: 'center' as 'center',
  }
};
