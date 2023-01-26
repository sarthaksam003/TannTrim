import React from "react";

const savedProductsContext = React.createContext({
  savedProducts: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default savedProductsContext;
