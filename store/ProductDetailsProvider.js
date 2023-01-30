import ProductsDetailsContext from "./ProductsDetailscontext";
import { useReducer } from "react";

const initialProductDetailsState = {
  productDetails: [],
};

const productDetailsReducer = (state, action) => {
  if (action.type === "setup") {
    let updatedProductDetails = [action.chosenproductDetails];
    return {
      productDetails: updatedProductDetails,
    };
  }
  return initialProductDetailsState;
};

const ProductDetailsProvider = (props) => {
  const [productDetailsState, dispatchAction] = useReducer(
    productDetailsReducer,
    initialProductDetailsState
  );

  const setProductDetailsHandler = (chosenproductDetails) => {
    dispatchAction({
      type: "setup",
      chosenproductDetails: chosenproductDetails,
    });
  };

  const productDetailsContext = {
    productDetails: productDetailsState,
    setProductDetails: setProductDetailsHandler,
  };

  return (
    <ProductsDetailsContext.Provider value={productDetailsContext}>
      {props.children}
    </ProductsDetailsContext.Provider>
  );
};

export default ProductDetailsProvider;
