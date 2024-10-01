import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Products } from './components/Products';
import { Product } from './components/Product';
import { PageError } from './components/PageError';
import { Root } from './components/Root';
import { CreateProduct } from './components/CreateProduct';
import Admin from './components/Admin';

import './App.scss';
import { getProducts } from './api/ProductsAPI';
import { useEffect, useState } from 'react';
import { ProductType } from './typescript/ProductType';
import { ProductsContextProvider } from './context/ProductsContext';

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
            element: <>modification du produit</>
          }
        ]
      }
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
