import { useContext, useState } from "react";
import { Card, CardContent, Snackbar, Alert } from "@mui/material";
import Image from "next/image";
import classes from "./ProductCard.module.css";
import CartContext from "../../store/Cartcontext";
import savedProductsContext from "../../store/SavedProductscontext";
import ProductsDetailsContext from "../../store/ProductsDetailsContext";

export default function ProductCard(props) {
  const [productSaved, setProductSaved] = useState(false);
  const [addedToCartAlertVisibility, setAddedToCartAlertVisibility] =
    useState(false);
  const [productSavedAlertVisibility, setProductSavedAlertVisibility] =
    useState(false);
  const [productUnsavedAlertVisibility, setProductUnsavedAlertVisibility] =
    useState(false);
  const cartCtx = useContext(CartContext);
  const savedProductsCtx = useContext(savedProductsContext);
  const productsDetailsCtx = useContext(ProductsDetailsContext);

  const addProductToCartHandler = (e) => {
    e.stopPropagation();
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      quantity: 1,
    });
    setAddedToCartAlertVisibility(true);
  };

  const addProductToSavedProductsHandler = (e) => {
    e.stopPropagation();
    savedProductsCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
    });
    setProductSaved(!productSaved);
    setProductSavedAlertVisibility(true);
  };

  const removeProductFromSavedProductsHandler = (e) => {
    e.stopPropagation();
    savedProductsCtx.removeItem(props.id);
    setProductSaved(!productSaved);
    setProductUnsavedAlertVisibility(true);
  };

  const setupProductDetailsModalHandler = () => {
    const totalRating = props.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating = totalRating / props.reviews.length;
    props.toggleVisibility();
    productsDetailsCtx.setProductDetails({
      id: props.id,
      name: props.name,
      images: props.images,
      price: props.price,
      fullprice: props.fullprice,
      reviews: props.reviews,
      sizes: props.sizes,
      averageRating: averageRating,
    });
  };

  const addDefaultImage = (e) => {
    e.target.src = props.fallbackimg;
  };

  const closeAddedToCartAlertHandler = (event, reason) => {
    event.stopPropagation();
    if (reason === "clickaway") {
      return;
    }
    setAddedToCartAlertVisibility(false);
  };

  const closeProductSavedAlertHandler = (event, reason) => {
    event.stopPropagation();
    if (reason === "clickaway") {
      return;
    }
    setProductSavedAlertVisibility(false);
  };
  const closeProductUnsavedAlertHandler = (event, reason) => {
    event.stopPropagation();

    if (reason === "clickaway") {
      return;
    }
    setProductUnsavedAlertVisibility(false);
  };

  return (
    <div
      className={classes["product-card-layout"]}
      onClick={setupProductDetailsModalHandler}
    >
      <Card>
        <img
          src={props.img}
          alt="card-image"
          className={classes["product-image"]}
          onError={addDefaultImage}
        />
        <CardContent
          sx={{
            backgroundColor: "#141414",
            marginTop: "-4px",
          }}
        >
          <div className={classes["product-name"]}>{props.name}</div>
          <div className={classes["product-details"]}>
            <div className={classes["price"]}>
              <p className={classes["discounted-price"]}>$ {props.price}</p>
              <div className={classes["original-price-and-discount"]}>
                <p className={classes["original-price"]}>
                  {props.fullprice ? "$ " + props.fullprice : ""}
                </p>
                <p className={classes["discount-percent"]}>
                  &nbsp;
                  {props.fullprice
                    ? Math.round(
                        ((props.fullprice - props.price) * 100) /
                          props.fullprice
                      ) + "% off"
                    : ""}
                </p>
              </div>
            </div>
            <div
              className={classes["add-to-bag"]}
              onClick={addProductToCartHandler}
            >
              <Image
                src="/addToBag.svg"
                alt="addToBag"
                width={45}
                height={45}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className={classes["saveProduct"]}>
        {productSaved ? (
          <Image
            src="/productSaved2.png"
            width={26}
            height={34}
            alt="saveProduct"
            onClick={removeProductFromSavedProductsHandler}
          ></Image>
        ) : (
          <Image
            src="/saveProduct.svg"
            width={26}
            height={34}
            alt="saveProduct"
            onClick={addProductToSavedProductsHandler}
          ></Image>
        )}
      </div>
      <div style={{ zIndex: "40" }}>
        <Snackbar
          open={addedToCartAlertVisibility}
          autoHideDuration={3000}
          onClose={closeAddedToCartAlertHandler}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={closeAddedToCartAlertHandler}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product added to cart!
          </Alert>
        </Snackbar>
        <Snackbar
          open={productSavedAlertVisibility}
          autoHideDuration={3000}
          onClose={closeProductSavedAlertHandler}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={closeProductSavedAlertHandler}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product saved!
          </Alert>
        </Snackbar>
        <Snackbar
          open={productUnsavedAlertVisibility}
          autoHideDuration={3000}
          onClose={closeProductSavedAlertHandler}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={closeProductUnsavedAlertHandler}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product unsaved!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
