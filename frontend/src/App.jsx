import React, { useEffect } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer/Footer";

import { Routes, Route } from "react-router-dom"
import { AllBooks } from "./pages/AllBooks";
import { LogIn } from "./pages/LogIn";
import { SignUp } from "./pages/SignUp";
import { Cart } from "./pages/Cart";
import { Profile } from "./pages/Profile";
import { ViewDataDetails } from "./components/ViewBookDetails/ViewDataDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Store/auth";
import { Favourites } from "./components/Profile/Favourites";
import { UserOrderHistory } from "./components/Profile/UserOrderHistory";
import { Setting } from "./components/Profile/Setting";


export const App = () => {

  const dispatch=useDispatch();
  const role=useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role") 
    ){
      dispatch(authActions.Login()),
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  },[])

  return (
    <div>

      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/all-books" element={<AllBooks />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/profile" element={<Profile />}>
          <Route index element={<Favourites/>}/>
          <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/>
          <Route path="/profile/setting" element={<Setting/>}/>
        </Route>
        
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/view-book-details/:id" element={<ViewDataDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

// export default App