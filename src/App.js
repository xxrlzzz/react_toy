import "./App.css";
import React from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <Header />
      <div className="Content">
        <div className="Profile">
          <img
            src="https://neal.fun/spend/billgates.jpg"
            alt="billgates"
            className="ProfileImage"
            style={{ "border-radius": "50%", display: "block" }}
          ></img>
          {t("gameName")}
        </div>
        <ProductList />
      </div>
      <Footer />
    </div>
  );
}
