import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoutes from "./routes/PrivateRoutes";

import { auth } from "./utils/firebase";

import {
  NavBar,
  Home,
  Login,
  SignUp,
  Report,
  Expense,
} from "./components/Index";

const App = () => {
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
    <NavBar />
      <Routes>
        {!user ? ('') : (
          <Route
            path="/"
            element={              
                <Home />
            }
          />
        )}

        <Route
          path="/signin/"
          element={
              <Login />
          }
        />
        <Route
          path="/signup/"
          element={
              <SignUp />
          }
        />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/addexpense/"
            element={
                <Expense />
            }
          />
          <Route
            path="/expenses/"
            element={
                <Report />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
