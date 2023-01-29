import React, { useContext } from "react";
import classes from "./SavedProductsModal.module.css";
import SavedProductsContext from "../../store/SavedProductscontext";
import { Button } from "@mui/material";
import CartContext from "../../store/Cartcontext";
import Image from "next/image";

export default function SavedProductsModal(props) {
  const savedProductsCtx = useContext(SavedProductsContext);
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (product) => {
    cartCtx.addItem(product);
  };
  const removeFromSavedProductsHandler = (id) => {
    savedProductsCtx.removeItem(id);
  };

  return (
    <div className={classes["backdrop"]}>
      <div className={classes["modal"]}>
        <Image
          src="/closeIconblack.svg"
          alt="closeIconblack"
          onClick={props.toggleSavedProductsModal}
          className={classes["close-icon"]}
          width={30}
          height={30}
        />
        <div className={classes["saved-items"]}>
          <h3>Saved Products</h3>
          <div className={classes["saved-item-div"]}>
            {savedProductsCtx.savedProducts.length > 0 ? (
              savedProductsCtx.savedProducts.map((savedProduct, idx = 0) => {
                idx++;
                return (
                  <div
                    key={savedProduct.id}
                    className={classes["single-saved-item"]}
                  >
                    <div className={classes["saved-item-name"]}>
                      {idx}. {savedProduct.name}
                    </div>
                    <div className={classes["saved-item-btn"]}>
                      <Button
                        variant="contained"
                        className={classes["add-to-cart-btn"]}
                        onClick={() => {
                          addToCartHandler({
                            id: savedProduct.id,
                            name: savedProduct.name,
                            price: savedProduct.price,
                            quantity: 1,
                          });
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="contained"
                        className={classes["add-to-cart-btn"]}
                        onClick={() => {
                          removeFromSavedProductsHandler(savedProduct.id);
                        }}
                      >
                        Unsave
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={classes["no-products-saved"]}>
                No products saved
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
