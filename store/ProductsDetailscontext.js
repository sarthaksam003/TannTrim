import React from "react";

const ProductsDetailsContext = React.createContext({
  productDetails: [],
  setProductDetails: (productDetails) => {},
});

export default ProductsDetailsContext;
