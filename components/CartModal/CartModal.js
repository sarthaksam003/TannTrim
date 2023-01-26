import React, { useContext } from "react";
import classes from "./CartModal.module.css";
import CartContext from "./store/Cart-context";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CartModal(props) {
  const cartCtx = useContext(CartContext);
  const addProductToCartHandler = (item) => {
    cartCtx.addItem(item);
  };
  const removeProductFromCartHandler = (id) => {
    cartCtx.removeItem(id);
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
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">id</StyledTableCell>
                      <StyledTableCell align="center">Product</StyledTableCell>
                      <StyledTableCell align="center">Price</StyledTableCell>
                      <StyledTableCell align="center">Quantity</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartCtx.items.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell align="center">
                          ₹ {row.price}
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
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <div className={classes["no-items-in-cart"]}>No items in cart</div>
          )}
          {/* <div className={classes["saved-items-list"]}>
            <ul className={classes["saved-items-ul"]}>
              <li className={classes["saved-items-ul"]}></li>
              {cartCtx.items.map((itemInCart) => {
                return (
                  <li key={itemInCart.id} className={classes["saved-items-li"]}>
                    {itemInCart.id}. {itemInCart.name} = {itemInCart.price} X{" "}
                    {itemInCart.quantity}
                  </li>
                );
              })}
            </ul>
          </div> */}
          {cartCtx.items.length > 0 && (
            <div className={classes["cart-actions"]}>
              <div>Total: {cartCtx.totalAmount}</div>
              <div>
                <Button
                  variant="contained"
                  className={classes["place-order-btn"]}
                >
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
