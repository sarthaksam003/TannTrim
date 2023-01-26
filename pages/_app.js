import "../styles/globals.css";
import Head from "next/head";
import CartProvider from "../store/CartProvider";
import SavedProductsProvider from "../store/SavedProductsProvider";
export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Head>
        <title>
          TANNTRIM | Online Shopping for Women, Men, Kids – Bags, Accessories ,
          Jewellery and many more
        </title>
      </Head>
      <SavedProductsProvider>
        <Component {...pageProps} />
      </SavedProductsProvider>
    </CartProvider>
  );
}
