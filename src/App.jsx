import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { UserProvider } from './context/UserContext'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductsHub from './pages/ProductsHub'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoutes'
import ProductDetail from './pages/ProductDetail'
import Admin from './pages/Admin'
import Payment from './pages/Payment'
import PaymentSuccess from './pages/PaymentSuccess'
import DeliveryConfirmationPage from './pages/DeliveryConfirmationPage'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
      <div >
        <Navbar/>
        <Home/>
        <Footer/>
      </div>
    },

    {
      path: '/login',
      element:
      <div>
      <Login/>
      </div>
    },

    {
      path: '/signup',
      element:
      <div>
        <Signup/>
      </div>
    },
    {
      path: "/products-hub",
      element:
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
        <Navbar/>
        <ProductsHub/>
      </div>
    },
    {
      path: "/dashboard",
      element:
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
        <Navbar/>
        <Dashboard/>
      </div>
    },

    {
      path: "/admin",
      element:
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
        <Navbar/>
        <Admin/>
      </div>
    },

    {
      path: "/product-detail/:product_id",
      element:
        <div className='min-h-screen max-w-screen bg-gradient-to-br from-slate-50 to-blue-50'>
          <Navbar/>
          <ProductDetail/>
        </div>
    },

    {
      path: "/payment-success/:order_id",
      element:
      <div className='min-h-screen max-w-screen bg-gradient-to-br from-green-50 to-emrald-50'>
        <Navbar/>
        <PaymentSuccess/>
      </div>
    }, 
    
    {
      path: "/delivery-confirmation/:order_id",
      element:
      <div className='min-h-screen max-w-screen bg-white'>
        <DeliveryConfirmationPage/>
      </div>
    }

  ]
)

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
