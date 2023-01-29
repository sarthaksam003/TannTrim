import React, { useContext, useState, useRef } from "react";
import classes from "./ProductDetailModal.module.css";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import ProductsDetailsContext from "../../store/ProductsDetailsContext";
import CartContext from "../../store/Cartcontext";
import {
  Button,
  TextField,
  Select,
  InputLabel,
  Rating,
  MenuItem,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import ReviewCard from "../ReviewCard/ReviewCard";

const monthsOfTheYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const ProductDetailModal = (props) => {
  const productDetailsCtx = useContext(ProductsDetailsContext);
  const cartCtx = useContext(CartContext);
  const [sizeChosen, setSizeChosen] = useState("S");
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [averageRating, setAverageRating] = useState(
    productDetailsCtx.productDetails.productDetails[0].averageRating
  );
  const [ratingByUser, setRatingByUser] = useState(0);
  const nameRef = useRef();
  const reviewRef = useRef();

  const images = productDetailsCtx.productDetails.productDetails[0].images;
  const totalRatings =
    productDetailsCtx.productDetails.productDetails[0].reviews.length;
  const reviewsArray =
    productDetailsCtx.productDetails.productDetails[0].reviews;

  const date = new Date("2019-01-03T18:30:00Z");
  const currentDate = new Date();

  const setSizeChosenHandler = (event) => {
    setSizeChosen(event.target.value);
  };

  const addDefaultImage = (e) => {
    e.target.src = "/noimage.png";
  };
  const addToCartHandler = (product) => {
    cartCtx.addItem(product);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    reviewsArray.push({
      first_name: nameRef.current.value,
      last_name: "",
      rating: ratingByUser,
      review: reviewRef.current.value,
      created: `${currentDate}`,
    });
    nameRef.current.value = "";
    reviewRef.current.value = "";
    setRatingByUser(0);
    setAlertVisibility(true);
  };

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertVisibility(false);
  };

  return (
    <div className={classes["backdrop"]}>
      <div className={classes["modal"]} onClick={props.openProductDetailModal}>
        <Image
          src="/closeIconblack.svg"
          alt="closeIconblack"
          onClick={props.toggleProductDetailsModal}
          className={classes["close-icon"]}
          width={30}
          height={30}
        />
        <div className={classes["product-modal-content-layout"]}>
          <div className={classes["carousel"]}>
            <Carousel>
              {images.map((item, i = 0) => {
                i++;
                return (
                  <img
                    key={i}
                    src={item}
                    alt={`item-${i}`}
                    onError={addDefaultImage}
                  />
                );
              })}
            </Carousel>
          </div>
          <div className={classes["product-reviews"]}>
            <h1>{productDetailsCtx.productDetails.productDetails[0].name}</h1>
            <div className={classes["product-rating"]}>
              <Rating
                name="simple-controlled"
                value={averageRating}
                onChange={(event, newValue) => {
                  setAverageRating(newValue);
                }}
                precision={0.5}
                readOnly
              />
              {totalRatings} ratings
            </div>
            <div className={classes["price-size"]}>
              Price : $
              {productDetailsCtx.productDetails.productDetails[0].price}
              {productDetailsCtx.productDetails.productDetails[0].sizes
                .length !== 0 && (
                <FormControl fullWidth id={classes["size-dropdown"]}>
                  <InputLabel id="demo-simple-select-label">
                    Choose Size
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sizeChosen}
                    label="Choose size"
                    onChange={setSizeChosenHandler}
                    MenuProps={{
                      style: { zIndex: 35001 },
                    }}
                  >
                    {productDetailsCtx.productDetails.productDetails[0].sizes.map(
                      (size, idx = 0) => {
                        idx++;
                        return (
                          <MenuItem value={size} key={idx}>
                            {size}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
              )}
              <Button
                variant="contained"
                id={classes["add-to-cart-btn"]}
                onClick={() => {
                  addToCartHandler({
                    id: productDetailsCtx.productDetails.productDetails[0].id,
                    name: productDetailsCtx.productDetails.productDetails[0]
                      .name,
                    price:
                      productDetailsCtx.productDetails.productDetails[0].price,
                    quantity: 1,
                  });
                }}
              >
                Add to Cart
              </Button>
            </div>
            <div className={classes["write-review-section"]}>
              <h3 style={{ margin: "1em 0" }}>Write a review</h3>
              <form onSubmit={submitReviewHandler}>
                <TextField
                  id="outlined-multiline-static"
                  label="Write your review here"
                  multiline
                  rows={4}
                  defaultValue=""
                  style={{ margin: "0.5rem 0", width: "100%" }}
                  inputRef={reviewRef}
                  required
                />
                <div className={classes["name-rating-btn-section"]}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Your Name"
                    defaultValue=""
                    style={{ margin: "0.5rem 0" }}
                    inputRef={nameRef}
                    className={classes["outlined-required"]}
                  />
                  <div
                    style={{
                      marginTop: "1.5rem",
                      alignContent: "center",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    Rating:
                    <Rating
                      name="simple-controlled"
                      value={ratingByUser}
                      onChange={(event, newValue) => {
                        setRatingByUser(newValue);
                      }}
                      className={classes["rating-comp"]}
                    />
                  </div>
                  <Button
                    variant="contained"
                    id={classes["submit-review-btn"]}
                    type="submit"
                  >
                    Submit Review
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={classes["reviews-section"]}>
          <h3 style={{ margin: "2rem" }}>Reviews</h3>
          <div className={classes["review-from-users"]}>
            {reviewsArray.map((reviewer, idx = 0) => {
              idx++;
              const date = new Date(reviewer.created);
              const dateToSend =
                date.getDate() +
                "-" +
                monthsOfTheYear[+date.getMonth()] +
                "-" +
                date.getFullYear();
              return (
                <ReviewCard
                  rating={reviewer.rating}
                  review={
                    reviewer.review ? reviewer.review : "No review written"
                  }
                  name={
                    reviewer.first_name || reviewer.last_name
                      ? reviewer.first_name + " " + reviewer.last_name
                      : "Anonymous"
                  }
                  date={dateToSend}
                  key={idx}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Snackbar
        open={alertVisibility}
        autoHideDuration={3000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeAlert} severity="success" sx={{ width: "100%" }}>
          Your review has been submitted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetailModal;
