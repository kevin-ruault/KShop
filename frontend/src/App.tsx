import { createBrowserRouter, NavLink, Outlet, RouterProvider, useParams, useRouteError } from 'react-router-dom';
import './App.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
            element: <Single />
          }
        ]
      },
      {
        path: 'contact',
        element: <div>Contact</div>,
      }
    ]
  }
])


function Products() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/product").then((res) => {
      setData(res.data);
    });
  }, []);

  console.log(data)
  return (
    <ul>
      {data.map((product) => (
        <li key={product.id}>
          <NavLink to={product.id}>{product.title}</NavLink>
        </li>
      ))}
    </ul>
  )
}

function Single() {
  const { id } = useParams()
  return <>
    <h1>Produit {id}</h1>
  </>
}

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
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
    <div><Outlet /></div>
  </>
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
