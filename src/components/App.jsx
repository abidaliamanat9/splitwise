import React from "react";
import NavBar from "./NavBar";
import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import Report from "./Report";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Expense from "./Expense";
import PrivateRoutes from "../routes/PrivateRoutes"
import { auth } from "../utils/firebase"
import { useState, useEffect } from "react";
const App =() => {
  console.log(auth.currentUser)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
    return (
      <BrowserRouter>
      <Routes>
        {!user ? (
          <Route path="/"  element={<NavBar />} />
        ):(
          <Route path="/"  element={
          <>
          <NavBar />
          <Home />
          </>
          } />
        )}
        
        <Route path="/signin/" element={
          <>
          <NavBar />
          <Login />
          </>} />
        <Route path="/signup/" element={
          <>
          <NavBar />
          <SignUp />
          </>} />
        <Route element={<PrivateRoutes />}>
          <Route path="/addexpense/" element={
            <>
            <NavBar />
            <Expense />
            </>
          } />
          <Route path="/expenses/" element={
            <>
            <NavBar />
            <Report />
            </>} />
        </Route>
      </Routes>
      </BrowserRouter>
  );
  }

export default App;
