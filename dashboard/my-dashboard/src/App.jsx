import './App.css';
import Layout from './components/layout/Layout';
import AddProducts from './components/main/AddProducts';
import DisplayProducts from './components/main/DisplayProducts';
import Orders from './components/oders/Orders';
import Login from './components/Auth/Login';
import ProductPreview from './components/ProductPreview/ProductPreview'
import { ProductProvider } from './components/Context/ProductContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoutes from './components/verification/ProtectedRoutes';
import { useEffect } from 'react';
import { TokenExpire } from './components/verification/TokenExpire';
import { useNavigate } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
function App() {
  
  const router = createBrowserRouter([

    {
      path: "/login",
      element: <Login />,
    },
  
    {
      element: <ProtectedRoutes />, 
      children: [
        {
          element: <Layout />, 
          children: [
            { path: "/", element: <AddProducts/> },
            {path:"/dashboard", element: <Dashboard/>},
            { path: "/addProducts", element: <AddProducts /> },
            { path: "/products", element: <DisplayProducts /> },
            { path: "/orders", element: <Orders /> },
             { path: "/ProductsPreview", element: <ProductPreview /> },
          ],
        },
      ],
    },
  ]);

  return (
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  );
}

export default App;
