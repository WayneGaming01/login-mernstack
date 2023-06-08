import React from "react";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/secure/Home";
import Unauthorized from "./pages/error/Unauthorized";
import PageNotFound from "./pages/error/PageNotFound";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} exact />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact-support" element={<Contact />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
