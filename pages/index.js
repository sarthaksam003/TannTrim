import Header from "../components/Header/Header";
import React, { useState, useContext, useEffect } from "react";
import Landing from "./Landing/Landing";
import SavedProductsModal from "../components/SavedProductsModal/SavedProductsModal";
import CartModal from "../components/CartModal/CartModal";
import ProductDetailModal from "../components/ProductDetailModal/ProductDetailModal";
import ProductsDetailsContext from "../store/ProductsDetailsContext";

function HomePage() {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [savedProductsModalOpen, setSavedProductsModalOpen] = useState(false);
  const [productDetailsModalOpen, setproductDetailsModalOpen] = useState(false);

  const toggleCartModal = () => {
    setCartModalOpen(!cartModalOpen);
  };
  const toggleSavedProductsModal = () => {
    setSavedProductsModalOpen(!savedProductsModalOpen);
  };

  const toggleProductDetailsModal = () => {
    setproductDetailsModalOpen(!productDetailsModalOpen);
  };

  return (
    <React.Fragment>
      {cartModalOpen && <CartModal toggleCartModal={toggleCartModal} />}
      {savedProductsModalOpen && (
        <SavedProductsModal
          toggleSavedProductsModal={toggleSavedProductsModal}
        />
      )}
      {productDetailsModalOpen && (
        <ProductDetailModal
          toggleProductDetailsModal={toggleProductDetailsModal}
        />
      )}
      <div>
        <Header
          toggleCartModal={toggleCartModal}
          toggleSavedProductsModal={toggleSavedProductsModal}
        />
        <Landing toggleVisibility={toggleProductDetailsModal} />
      </div>
    </React.Fragment>
  );
}

export default HomePage;
