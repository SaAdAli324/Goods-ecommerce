import './App.css'
import { ProductProvider } from './assets/components/context/ProductContext'
import { SearchProvider } from './assets/components/context/SearchBarContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductPreview from './assets/components/productPreview/ProductPreview'
import Layout from './assets/components/Layout'
import Products from './assets/components/Products'
import Cart from './assets/components/cart/Cart'
import SignUp from './assets/components/Auth/SignUp'
import Login from './assets/components/Auth/Login'
import Orders from './assets/components/orders/Orders'
import { LoaderProvider } from './assets/components/context/LoaderContext'
import Posters from './assets/components/posters/Banner'
import Category from './assets/components/category/Category'
import About from './assets/components/About/About'
import CheckOutComponent from './assets/components/cart/CheckOutComponent'
function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout/>,
      children: [{
        path: '/',
        element: (<> <Posters/><Category/><Products/> </>)

      },{
        path:'/productsPreview',
        element: <ProductPreview/>
      },{
        path:'/cart',
        element: <Cart/>
      }
      ,{
        path:'/signup',
        element: <SignUp/>
      },
      {
        path:'/login',
        element: <Login/>
      },
      {
        path:'/orders',
        element: <Orders/>
      },
      {
        path:"/category",
        element:<Category/>
      }
      ,{
        path:"/products",
        element:<Products/>
      }
      ,{
        path:"/about",
        element:<About/>
      }
      ,{
        path:"/checkOut",
        element:<CheckOutComponent/>
      }
      ]
    }

  ])
  return (
    <LoaderProvider>
    <SearchProvider>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
    </SearchProvider>
    </LoaderProvider> 
  )
}

export default App
