import React, { useContext, useState } from "react";
import classes from "./CartModal.module.css";
import CartContext from "../../store/Cartcontext";
import {
  Button,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  tableCellClasses,
  TableCell,
  TableBody,
  Table,
  Snackbar,
  Alert,
  styled,
} from "@mui/material";
import Image from "next/image";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CartModal(props) {
  const cartCtx = useContext(CartContext);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [clearCartAlertVisibility, setClearCartAlertVisibility] =
    useState(false);

  const addProductToCartHandler = (item) => {
    cartCtx.addItem(item);
  };
  const removeProductFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const placeOrderhandler = () => {
    console.log("Order placed by user: ", cartCtx.items);
    setAlertVisibility(true);
    cartCtx.clearCart();
  };
  const clearCartHandler = () => {
    setClearCartAlertVisibility(true);
    cartCtx.clearCart();
  };
  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertVisibility(false);
  };
  const closeClearCartAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setClearCartAlertVisibility(false);
  };
  return (
    <div className={classes["backdrop"]}>
      <div className={classes["modal"]}>
        <Image
          src="/closeIconblack.svg"
          alt="closeIconblack"
          onClick={props.toggleCartModal}
          className={classes["close-icon"]}
          width={30}
          height={30}
        />
        <div className={classes["saved-items"]}>
          <h3>Cart Items</h3>
          {cartCtx.items.length > 0 ? (
            <div className={classes["cart-items-table"]}>
              <TableContainer
                component={Paper}
                sx={{ fontFamily: "Encode Sans" }}
              >
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">S. no.</StyledTableCell>
                      <StyledTableCell align="center">Product</StyledTableCell>
                      <StyledTableCell align="center">Price</StyledTableCell>
                      <StyledTableCell align="center">Quantity</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartCtx.items.map((row, idx = 0) => {
                      idx += 1;
                      return (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {idx++}
                          </StyledTableCell>
                          <StyledTableCell>{row.name}</StyledTableCell>
                          <StyledTableCell align="center">
                            $ {row.price}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <div className={classes["quantity-and-actions"]}>
                              <span>{row.quantity}</span>
                              <div className={classes["add-or-remove-actions"]}>
                                <button
                                  variant="contained"
                                  className={classes["add-remove-btn"]}
                                  onClick={() => {
                                    addProductToCartHandler({
                                      id: row.id,
                                      name: row.name,
                                      price: row.price,
                                      quantity: row.quantity,
                                    });
                                  }}
                                >
                                  +
                                </button>
                                <button
                                  variant="contained"
                                  className={classes["add-remove-btn"]}
                                  onClick={() => {
                                    removeProductFromCartHandler(row.id);
                                  }}
                                >
                                  -
                                </button>
                              </div>
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <div className={classes["no-items-in-cart"]}>No items in cart</div>
          )}
        </div>
        {cartCtx.items.length > 0 && (
          <div className={classes["cart-actions"]}>
            <div>Total: ${cartCtx.totalAmount}</div>
            <div className={classes["cart-actions-div"]}>
              <Button
                variant="contained"
                className={classes["place-order-btn"]}
                onClick={placeOrderhandler}
              >
                Place Order
              </Button>
              <Button
                variant="contained"
                className={classes["place-order-btn"]}
                onClick={clearCartHandler}
              >
                Clear cart
              </Button>
            </div>
          </div>
        )}
      </div>
      <Snackbar
        open={alertVisibility}
        autoHideDuration={3000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeAlert} severity="success" sx={{ width: "100%" }}>
          Order placed successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={clearCartAlertVisibility}
        autoHideDuration={3000}
        onClose={closeClearCartAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeClearCartAlert}
          severity="info"
          sx={{ width: "100%" }}
        >
          Cart cleared
        </Alert>
      </Snackbar>
    </div>
  );
}
