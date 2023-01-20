import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import classes from "./ProductCard.module.css";
export default function MediaCard() {
  const [productSaved, setProductSaved] = useState(false);
  return (
    <div className={classes["product-card-layout"]}>
      <Card
        style={{
          width: "280.15px",
          height: "482.43px",
          backgroundColor: "#141414",
          borderRadius: "8px",
        }}
      >
        <div className={classes["product-image"]}>
          <img
            src="/card-imgm.png"
            alt="card-image"
            style={{ width: "100%" }}
          />
        </div>
        <CardContent sx={{ backgroundColor: "#141414" }}>
          <div className={classes["product-name"]}>The Brown Metro Movers</div>
          <div className={classes["product-details"]}>
            <div className={classes["price"]}>
              <p className={classes["discounted-price"]}>₹ 4899</p>
              <div className={classes["original-price-and-discount"]}>
                <p className={classes["original-price"]}>8999&nbsp;</p>
                <p className={classes["discount-percent"]}>&nbsp;(50% off)</p>
              </div>
            </div>
            <div className={classes["add-to-bag"]}>
              <img src="/addToBag.svg" alt="addToBag" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div
        className={classes["saveProduct"]}
        onClick={() => setProductSaved(!productSaved)}
      >
        {productSaved ? (
          <Image
            src="/productSaved.png"
            width={26}
            height={34}
            alt="saveProduct"
          ></Image>
        ) : (
          <Image
            src="/saveProduct.svg"
            width={26}
            height={34}
            alt="saveProduct"
          ></Image>
        )}
      </div>
    </div>
  );
}
