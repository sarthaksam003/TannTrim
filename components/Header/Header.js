import classes from "./Header.module.css";
import { useContext, useState } from "react";
import Image from "next/image";
import CartContext from "@/store/cart-context";
import savedProductsContext from "@/store/savedProducts-context";

const Header = (props) => {
  const [sidebarOpen, toggleSidebarOpen] = useState(false);
  const sidebarHandler = () => {
    toggleSidebarOpen(!sidebarOpen);
  };
  const cartCtx = useContext(CartContext);
  const savedProductsCtx = useContext(savedProductsContext);
  // const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
  //   return curNumber + item.amount;
  // }, 0);
  const numberOfCartItems = cartCtx.items.length;
  const numberOfSavedItems = savedProductsCtx.savedProducts.length;
  return (
    <div className={classes["layout"]}>
      <div className={classes["hamburger"]} onClick={sidebarHandler}>
        {sidebarOpen ? (
          <Image
            src="Icon_-_Close_-_white.svg"
            className={classes["sidebar-close"]}
            onClick={sidebarHandler}
            alt={"closeIcon"}
            width={30}
            height={30}
          />
        ) : (
          <Image
            src="/Hamburger_icon_white.svg"
            className={classes["sidebar-close"]}
            alt={"hamburgerIconF"}
            width={30}
            height={30}
          />
        )}
      </div>
      {sidebarOpen && (
        <div className={classes["sidebar-layout"]}>
          <div className={classes["interactables-mob"]}>
            <Image
              src="search.svg"
              alt="search"
              width={24}
              height={24}
              className={classes["interactables-mob-icon"]}
            />
            <Image
              src="/alt-user.svg"
              alt="alt-user"
              width={24}
              height={24}
              className={classes["interactables-mob-icon"]}
            />
            <div>
              <div className={classes["saved-products-btn"]}>
                <Image
                  src="/bookmark.svg"
                  alt="bookmark"
                  width={24}
                  height={24}
                  className={classes["interactables-mob-icon"]}
                  onClick={props.toggleSavedProductsModal}
                />
                {numberOfSavedItems > 0 && (
                  <span className={classes["saved-products-badge"]}>
                    {numberOfSavedItems}
                  </span>
                )}
              </div>
            </div>
            <div className={classes["saved-products-btn"]}>
              <Image
                src="/shopping-bag.svg"
                alt="shopping-bag"
                width={24}
                height={24}
                className={classes["interactables-mob-icon"]}
                onClick={props.toggleCartModal}
              />
              {numberOfCartItems > 0 && (
                <span className={classes["cart-badge"]}>
                  {numberOfCartItems}
                </span>
              )}
            </div>
          </div>
          <div className={classes["box2-mob"]}>
            <ul>
              <li>Bags</li>
              <li>Travel</li>
              <li>Accessories</li>
              <li>Gifting</li>
              <li>Jewellery</li>
            </ul>
          </div>
        </div>
      )}
      <div>
        <div className={classes["box1"]}>
          <div className={classes["logo"]}>tann trim</div>
          <div className={classes["interactables"]}>
            <Image src="search.svg" alt="search" width={24} height={24} />
            <Image src="/alt-user.svg" alt="alt-user" width={24} height={24} />
            <div className={classes["saved-products-btn"]}>
              <Image
                src="/bookmark.svg"
                alt="bookmark"
                width={24}
                height={24}
                onClick={props.toggleSavedProductsModal}
              />
              {numberOfSavedItems > 0 && (
                <span className={classes["saved-products-badge"]}>
                  {numberOfSavedItems}
                </span>
              )}
            </div>
            <div className={classes["cart-btn"]}>
              <Image
                src="/shopping-bag.svg"
                alt="shopping-bag"
                width={24}
                height={24}
                onClick={props.toggleCartModal}
              />
              {numberOfCartItems > 0 && (
                <span className={classes["cart-badge"]}>
                  {numberOfCartItems}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={classes["box2"]}>
          <ul>
            <li>Bags</li>
            <li>Travel</li>
            <li>Accessories</li>
            <li>Gifting</li>
            <li>Jewellery</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
