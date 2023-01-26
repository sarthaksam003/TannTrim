import CartContext from "./Cartcontext";
import { useReducer } from "react";

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "add") {
    let flag = false;
    if (state.items.length !== 0) {
      state.items.map((itemInCart) => {
        if (itemInCart.id === action.item.id) {
          itemInCart.quantity += 0.5;
          flag = true;
          return;
        }
      });
    }
    if (flag) {
      console.log("item already in cart");
      return {
        items: state.items,
        totalAmount: state.totalAmount,
      };
    }
    const updatedItems = state.items.concat(action.item);

    // const updatedTotalAmount =
    //   state.totalAmount + action.item.price * action.item.quantity;
    // return {
    //   items: updatedItems,
    //   totalAmount: updatedTotalAmount,
    // };
    return {
      items: updatedItems,
      totalAmount: state.totalAmount,
    };
  }

  //idhar
  if (action.type === "calculate") {
    let updatedTotalAmount = 0;

    state.items.map((itemInCart) => {
      updatedTotalAmount += itemInCart.price * itemInCart.quantity;
    });
    return {
      items: state.items,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "remove") {
    const idxOfCartItemToRemove = state.items.findIndex(
      (item) => item.id === action.id
    );
    console.log(idxOfCartItemToRemove);
    const cartItemToRemove = state.items[idxOfCartItemToRemove];
    const updatedAmount = state.totalAmount - cartItemToRemove.price;
    let updatedItems;
    if (cartItemToRemove.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...cartItemToRemove,
        quantity: cartItemToRemove.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[idxOfCartItemToRemove] = updatedItem;
    }

    // state.items.map((itemInCart) => {
    //   updatedTotalAmount += itemInCart.price * itemInCart.quantity;
    // });
    // console.log(idxOfItemToRemove);
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  return initialCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchAction] = useReducer(cartReducer, initialCartState);

  const addItemToCart = (item) => {
    dispatchAction({ type: "add", item: item });
    dispatchAction({ type: "calculate" });
  };
  const removeItemFromCart = (id) => {
    dispatchAction({ type: "remove", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
