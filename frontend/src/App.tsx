import { createBrowserRouter, NavLink, Outlet, RouterProvider, useParams, useRouteError } from 'react-router-dom';
import './App.scss';
import { useEffect, useState } from 'react';
import { getProduct, getProducts } from './api/ProductsAPI';
import { ProductType } from './typescript/ProductType';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageError />,
    children: [
      {
        path: 'produit',
        children: [
          {
            path: "",
            element: <Products />
          },
          {
            path: ":id",
            element: <Product />
          }
        ]
      },
      {
        path: 'admin',
        element: <div>Admin</div>,
      }
    ]
  }
])

function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

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

function Product() {
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();

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
        <img src={`http://localhost:5000${product.imagePath}`} alt={product.title} style={styles.image} />
      </div>
      <div className="product-details" style={styles.details}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Stock:</strong> {product.stock} items left</p>
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

function PageError() {
  const error = useRouteError()
  console.log(error)
  return <>
    <h1> Une erreur est survenue </h1>
  </>
}

function Root() {
  return <>
    <header>
      <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/produit">Produit</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>
    </header>
    <div><Outlet /></div>
  </>
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
