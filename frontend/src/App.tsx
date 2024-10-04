import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Products } from './components/Products';
import { Product } from './components/Product';
import { PageError } from './components/PageError';
import { Root } from './components/Root';
import { CreateProduct } from './components/CreateProduct';
import { Admin } from './components/Admin';
import { ProductsContextProvider } from './context/ProductsContext';

import './App.scss';
import { UpdateProduct } from './components/UpdateProduct';
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import { Cart } from './components/Cart';

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
        children: [
          {
            path: "",
            element: <Admin />
          },
          {
            path: "newproduct",
            element: <CreateProduct />,
          },
          {
            path: ":id",
            element: <UpdateProduct />
          }
        ]
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'profile/:id',
        element: <Profile />
      },
      {
        path: 'cart/',
        element: <Cart />
      },
    ]
  }
])

function App() {
  return (
    <ProductsContextProvider>
      <RouterProvider router={router} />
    </ProductsContextProvider>
  )
}

export default App;
