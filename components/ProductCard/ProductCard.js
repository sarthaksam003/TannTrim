import { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import classes from "./ProductCard.module.css";
import CartContext from "@/store/Cart-context";
import savedProductsContext from "@/store/SavedProducts-context";
export default function ProductCard(props) {
  const [productSaved, setProductSaved] = useState(false);
  const cartCtx = useContext(CartContext);
  const savedProductsCtx = useContext(savedProductsContext);

  const addProductToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      quantity: 1,
    });
  };

  const addProductToSavedProductsHandler = () => {
    savedProductsCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
    });
    setProductSaved(!productSaved);
  };
  const removeProductFromSavedProductsHandler = () => {
    savedProductsCtx.removeItem(props.id);
    setProductSaved(!productSaved);
  };

  return (
    <div className={classes["product-card-layout"]}>
      <Card>
        <Image
          src={props.img}
          alt="card-image"
          className={classes["product-image"]}
          priority={true}
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
              <p className={classes["discounted-price"]}>₹ {props.price}</p>
              <div className={classes["original-price-and-discount"]}>
                <p className={classes["original-price"]}>8999</p>
                <p className={classes["discount-percent"]}>&nbsp;(50% off)</p>
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
            src="/productSaved.png"
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
    </div>
  );
}
