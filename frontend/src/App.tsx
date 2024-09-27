import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Products } from './components/Products';
import { Product } from './components/Product';
import { PageError } from './components/PageError';
import { Root } from './components/Root';
import './App.scss';

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
