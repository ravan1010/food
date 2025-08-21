// import MultiImageUploader from "./image"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserPage from './image';
// import MultiImageUploader from './image';
import Home from './componets/home';

//og
import SignupOne from './signup/signup';
// //main token for user
import ProtectedRoute from './signup/auth/authroute/atokenroute';

//login
import Login from './login/login';
// import { AuthProvider, useAuth } from './login/logout';

//admin
import ADMINsignup from './admin/adminsignup';
//admin otp to verify
import ProtectedRouteADMINOTP from './admin/auth/adminauthroute/adminotproute';
import AdminOTPverify from './admin/adminotp';
//admin info
import AdminAddress from './admin/admininfo';
import ProtectedRouteADMININFO from './admin/auth/adminauthroute/admininforoute'
import ProtectedRouteADMINMain from './admin/auth/adminauthroute/adminMainroute';
import OpenDayCalendar from './admin/days';

import ProtectedRouteAuthlocation from './signup/auth/authroute/lnauthroute';
//adminlandmark dashboard and product create route
import Adminlandmark from './admincategory/adminlandmark/adminlandmarkcreate';
import Adminlandmarkdashboard from './admincategory/adminlandmark/adminlandmarkdashboard';


import CategoryPage from './componets/category';

import ToAddress from './componets/address';
import Profile from './componets/profile';
import Addresslist from './componets/addresslist';

import Ownerlog from './owner/ownerlog';
import Ownerverify from './owner/ownerverify';
import Ownerdashboard from './owner/ownerdashboard';
import Explore from './componets/Explore';
import Cart from './componets/cart'
import Checkout from './componets/checkout';
import { Order } from './componets/order';
import { Postaddandremove } from './owner/componetstoowner/postaddandremove';
import OwnerRoute from './owner/authandroute/owneraut';
import { Allorder } from './owner/componetstoowner/allorder';
import { Pendingorder } from './owner/componetstoowner/orderpending';
import { Ordercancel } from './owner/componetstoowner/ordercancel';
import { Tocomplete } from './owner/componetstoowner/tocomplete';
import { OrderComplete } from './owner/componetstoowner/ordercomplete';


function App() {

  return (
    <>
    <Router>
      <Routes>
        //user email or number for signup
        <Route path='/signup' element={<SignupOne />} />
        //address
       

         <Route path='/address' element={
          <ProtectedRoute >
            <ToAddress />
          </ProtectedRoute> 
        }/>

        //login
        <Route path='/login' element={<Login />} />
        //logout
        
        //admin signup
        <Route path='/admin' element={
          <ProtectedRoute >
              <ADMINsignup />
          </ProtectedRoute>
        }/>

        //admin otp
        <Route path='/admin/verify' element={
          <ProtectedRoute >
              <ProtectedRouteADMINOTP >
                <AdminOTPverify />
              </ProtectedRouteADMINOTP>
          </ProtectedRoute>
        }/>
        <Route path='/admin/info' element={
          <ProtectedRoute>
              <ProtectedRouteADMININFO>
                <AdminAddress />
              </ProtectedRouteADMININFO> 
          </ProtectedRoute>
         } />
          <Route path='/admin/setdate' element={
            <ProtectedRoute>
              <ProtectedRouteADMINMain>
                  <OpenDayCalendar />
              </ProtectedRouteADMINMain>
          </ProtectedRoute>
          } />


//admin dashboard and create, delete based on category
//admin create adminlandmark product
          <Route path='/adminlandmark/productcreate' element={
          <ProtectedRoute>
              <ProtectedRouteADMINMain>
                  <Adminlandmark />
              </ProtectedRouteADMINMain>
          </ProtectedRoute>
         } />

         //admin food dashboard
          <Route path='/adminlandmark/dashboard' element={
          <ProtectedRoute>
              <ProtectedRouteADMINMain>
                  <Adminlandmarkdashboard />
              </ProtectedRouteADMINMain>
          </ProtectedRoute>
         } />

        <Route path='/order' element={
          <Order />
        } />

        <Route path='/cart' element={
          <Cart />
        } />

        <Route path='/checkout' element={
          <Checkout />
        } />

         <Route path='/' element={
                  <Home /> 
          } />
        <Route path='/explore' element={
          <Explore />
        }/>
         <Route path='/events' element={
                <CategoryPage />
         } />
        
         <Route path='/profile' element={
                <Profile />
          } />

          <Route path='/address-list' element={
            <ProtectedRoute>
              <Addresslist />
            </ProtectedRoute>
            } />

        
          
          

          <Route path='/owner/log' element={
            <Ownerlog />
          } />
           <Route path='/owner/verify' element={
            <Ownerverify />
          } />
          <Route path='/owner' element={
            <OwnerRoute>
              <Ownerdashboard />
            </OwnerRoute>
          } />
          <Route path='/postaddandremove' element={
            <OwnerRoute>
              <Postaddandremove />
            </OwnerRoute>
          } />
          <Route path='/allorder' element={
              <OwnerRoute>
                <Allorder />
              </OwnerRoute>
          } />
 
          <Route path='/pending' element={
              <OwnerRoute>
                <Pendingorder />
              </OwnerRoute>
          } />

           <Route path='/cancel' element={
              <OwnerRoute>
                <Ordercancel />
              </OwnerRoute>
          } />

          <Route path='/process' element={
              <OwnerRoute>
                <Tocomplete />
              </OwnerRoute>
          } />

          <Route path='/complete' element={
              <OwnerRoute>
                <OrderComplete />
              </OwnerRoute>
          } />




      </Routes>
     
    </Router>
    




        
    
    </>
  )
}

export default App
