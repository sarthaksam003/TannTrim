import classes from "./Header.module.css";
import { useState } from "react";
import Image from "next/image";
const Header = () => {
  const [sidebarOpen, toggleSidebarOpen] = useState(false);
  const sidebarHandler = () => {
    toggleSidebarOpen(!sidebarOpen);
  };
  return (
    <div className={classes["layout"]}>
      <div className={classes["hamburger"]} onClick={sidebarHandler}>
        {sidebarOpen ? (
          <img
            src="Icon_-_Close_-_white.svg"
            className={classes["sidebar-close"]}
            onClick={sidebarHandler}
          />
        ) : (
          <img
            src="/Hamburger_icon_white.svg"
            className={classes["sidebar-close"]}
            // style={{ fontSize: 25, color: "white" }}
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
            <Image
              src="/bookmark.svg"
              alt="bookmark"
              width={24}
              height={24}
              className={classes["interactables-mob-icon"]}
            />
            <Image
              src="/shopping-bag.svg"
              alt="shopping-bag"
              width={24}
              height={24}
              className={classes["interactables-mob-icon"]}
            />
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
            <Image src="/bookmark.svg" alt="bookmark" width={24} height={24} />
            <Image
              src="/shopping-bag.svg"
              alt="shopping-bag"
              width={24}
              height={24}
            />
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
