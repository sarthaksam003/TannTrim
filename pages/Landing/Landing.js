import classes from "./Landing.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../components/Carousel/responsive";
import Image from "next/image";
import ProductCard from "../../components/ProductCard/ProductCard";
const Landing = () => {
  return (
    <div className={classes["layout"]}>
      <div className={classes["carousel"]}>
        <Carousel responsive={responsive}>
          <div className={classes["carousel-item"]}>
            <Image
              src="/AllBags.svg"
              alt="AllBags"
              width={90}
              height={90}
              style={{ cursor: "pointer" }}
            />
            <p>All bags</p>
          </div>
          <div className={classes["carousel-item"]}>
            <Image
              src="/VanityPouch.svg"
              alt="VanityPouch"
              width={90}
              height={90}
              style={{ cursor: "pointer" }}
            />
            <p>Vanity Pouch</p>
          </div>
          <div className={classes["carousel-item"]}>
            <Image
              src="/ToteBag.svg"
              alt="ToteBag"
              width={90}
              height={90}
              style={{ cursor: "pointer" }}
            />
            <p>Tote Bag</p>
          </div>
          <div className={classes["carousel-item"]}>
            <Image
              src="/DuffleBag.svg"
              alt="DuffleBag"
              width={90}
              height={90}
              style={{ cursor: "pointer" }}
            />
            <p>Duffle Bag</p>
          </div>
          <div className={classes["carousel-item"]}>
            <Image
              src="/LaptopSleeve.svg"
              alt="LaptopSleeve"
              width={90}
              height={90}
              style={{ cursor: "pointer" }}
            />
            <p>Laptop Sleeve</p>
          </div>
          <div className={classes["carousel-item"]}>
            <Image
              src="/MessengerBag.svg"
              alt="MessengerBag"
              width={90}
              height={90}
              style={{ cursor: "pointer" }}
            />
            <p>Messenger Bag</p>
          </div>
          <div className={classes["carousel-item"]}>
            <Image
              src="/SlingBags.svg"
              alt="SlingBags"
              width={90}
              height={90}
              style={{ cursor: "pointer" }}
            />
            <p>Sling Bags</p>
          </div>
          <div className={classes["carousel-item"]}>
            <Image
              src="/HandBags.svg"
              alt="HandBags"
              width={90}
              height={90}
              style={{ cursor: "pointer" }}
            />
            <p>Hand Bags</p>
          </div>
          <div className={classes["carousel-item"]}>
            <Image
              src="/BucketBag.svg"
              alt="BucketBag"
              width={90}
              height={90}
              style={{ cursor: "pointer" }}
            />
            <p>Bucket Bag</p>
          </div>
        </Carousel>
      </div>
      <div className={classes["breadcrumbs-and-filter"]}>
        <div className={classes["breadcrumbs"]}>
          <p>Bags</p>
          <Image src="/ellipse.svg" alt="ellipse" width={5} height={5}></Image>
          <p>Backpacks</p>
        </div>
        <div className={classes["filter"]}>
          <p>13 Products</p>
          <Image src="/filter.svg" alt="filter" width={20} height={20}></Image>
        </div>
      </div>
      <div className={classes["products"]}>
        <ProductCard className={classes["product-card"]} />
        <ProductCard className={classes["product-card"]} />
        <ProductCard className={classes["product-card"]} />
        <ProductCard className={classes["product-card"]} />
        <ProductCard className={classes["product-card"]} />
        <ProductCard className={classes["product-card"]} />
        <ProductCard className={classes["product-card"]} />
      </div>
    </div>
  );
};

export default Landing;
