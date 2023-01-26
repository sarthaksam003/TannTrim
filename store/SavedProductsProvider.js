import SavedProductsContext from "./savedProducts-context";
import { useContext, useReducer } from "react";

const initialSavedProductsState = {
  savedProducts: [],
};

const savedProductsReducer = (state, action) => {
  if (action.type === "add") {
    const updatedSavedProducts = state.savedProducts.concat(action.item);

    return {
      savedProducts: updatedSavedProducts,
    };
  }
  if (action.type === "print") {
    console.log(state.savedProducts);
    return {
      savedProducts: state.savedProducts,
    };
  }
  if (action.type === "remove") {
    const updatedSavedProducts = state.savedProducts.filter(
      (item) => item.id !== action.id
    );

    return {
      savedProducts: updatedSavedProducts,
    };
  }

  return initialSavedProductsState;
};

const SavedProductsProvider = (props) => {
  const [savedProductsState, dispatchAction] = useReducer(
    savedProductsReducer,
    initialSavedProductsState
  );

  const addItemToSavedProducts = (item) => {
    dispatchAction({ type: "add", item: item });
  };
  const removeItemFromSavedProducts = (id) => {
    dispatchAction({ type: "remove", id: id });
    // console.log("After removing saved products:");
    // dispatchAction({ type: "print" });
  };

  const savedProductsContext = {
    savedProducts: savedProductsState.savedProducts,
    addItem: addItemToSavedProducts,
    removeItem: removeItemFromSavedProducts,
  };
  return (
    <SavedProductsContext.Provider value={savedProductsContext}>
      {props.children}
    </SavedProductsContext.Provider>
  );
};

export default SavedProductsProvider;
