import "@/styles/globals.css";
import CartProvider from "@/store/CartProvider";
import SavedProductsProvider from "@/store/savedProductsProvider";
export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <SavedProductsProvider>
        <Component {...pageProps} />
      </SavedProductsProvider>
    </CartProvider>
  );
}
