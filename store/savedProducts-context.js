import React from "react";

const SavedProductsContext = React.createContext({
  savedProducts: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default SavedProductsContext;
