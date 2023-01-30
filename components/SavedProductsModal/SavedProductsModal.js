import React, { useContext, useState } from "react";
import classes from "./SavedProductsModal.module.css";
import SavedProductsContext from "../../store/SavedProductscontext";
import { Button, Snackbar, Alert } from "@mui/material";
import CartContext from "../../store/Cartcontext";
import Image from "next/image";

export default function SavedProductsModal(props) {
  const savedProductsCtx = useContext(SavedProductsContext);
  const cartCtx = useContext(CartContext);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [addedToCartAlertVisibility, setAddedToCartAlertVisibility] =
    useState(false);
  const [productUnsavedAlertVisibility, setProductUnsavedAlertVisibility] =
    useState(false);

  const addToCartHandler = (product) => {
    cartCtx.addItem(product);
    setAddedToCartAlertVisibility(true);
  };
  const removeFromSavedProductsHandler = (id) => {
    savedProductsCtx.removeItem(id);
    setProductUnsavedAlertVisibility(true);
  };
  const clearCarthandler = () => {
    setAlertVisibility(true);
    savedProductsCtx.clearCart();
  };
  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertVisibility(false);
  };

  const closeProductUnsavedAlertHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setProductUnsavedAlertVisibility(false);
  };
  const closeAddedToCartAlertHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAddedToCartAlertVisibility(false);
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
          {savedProductsCtx.savedProducts.length > 0 && (
            <Button
              variant="contained"
              className={classes["clear-cart-btn"]}
              onClick={clearCarthandler}
            >
              Clear Cart
            </Button>
          )}
        </div>
      </div>
      <Snackbar
        open={alertVisibility}
        autoHideDuration={3000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeAlert} severity="info" sx={{ width: "100%" }}>
          Cart cleared
        </Alert>
      </Snackbar>
      <Snackbar
        open={alertVisibility}
        autoHideDuration={3000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeAlert} severity="info" sx={{ width: "100%" }}>
          Cart cleared
        </Alert>
      </Snackbar>
      <Snackbar
        open={productUnsavedAlertVisibility}
        autoHideDuration={3000}
        onClose={closeProductUnsavedAlertHandler}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeProductUnsavedAlertHandler}
          severity="info"
          sx={{ width: "100%" }}
        >
          Product unsaved
        </Alert>
      </Snackbar>
      <Snackbar
        open={addedToCartAlertVisibility}
        autoHideDuration={3000}
        onClose={closeAddedToCartAlertHandler}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeAddedToCartAlertHandler}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
}
