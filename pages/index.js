import Header from "@/components/Header/Header";
import React, { useState } from "react";
import Landing from "./Landing/Landing";
import SavedProductsModal from "../components/SavedProductsModal/SavedProductsModal";
import CartModal from "@/components/CartModal/CartModal";

function HomePage() {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [savedProductsModalOpen, setSavedProductsModalOpen] = useState(false);

  const toggleCartModal = () => {
    setCartModalOpen(!cartModalOpen);
  };
  const toggleSavedProductsModal = () => {
    setSavedProductsModalOpen(!savedProductsModalOpen);
  };
  return (
    <React.Fragment>
      {cartModalOpen && <CartModal toggleCartModal={toggleCartModal} />}
      {savedProductsModalOpen && (
        <SavedProductsModal
          toggleSavedProductsModal={toggleSavedProductsModal}
        />
      )}
      <div>
        <Header
          toggleCartModal={toggleCartModal}
          toggleSavedProductsModal={toggleSavedProductsModal}
        />
        <Landing />
      </div>
    </React.Fragment>
  );
}

export default HomePage;
