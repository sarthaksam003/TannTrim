import "../styles/globals.css";
import Head from "next/head";
import CartProvider from "../store/CartProvider";
import SavedProductsProvider from "../store/SavedProductsProvider";
import ProductDetailsProvider from "../store/ProductDetailsProvider";

export default function App({ Component, pageProps }) {
  return (
    <ProductDetailsProvider>
      <CartProvider>
        <Head>
          <title>
            TANNTRIM | Online Shopping for Women, Men, Kids – Bags, Accessories
            , Jewellery and many more
          </title>
        </Head>
        <SavedProductsProvider>
          <Component {...pageProps} />
        </SavedProductsProvider>
      </CartProvider>
    </ProductDetailsProvider>
  );
}
