"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantHeader from "../_components/RestaurantHeader";
import "./style.css";
import Footer from "../_components/Footer";


const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
    <div className="container">
      <RestaurantHeader />
      <h1>Restaurant Login/Signup Page</h1>
      {login ? <RestaurantLogin /> : <RestaurantSignup />}

      <div>
        <button className="button-link" onClick={() => setLogin(!login)}>
          {login
            ? "Don't have an account? Signup"
            : "Alredy have an accoutn? Login"}
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
};
export default Restaurant;
