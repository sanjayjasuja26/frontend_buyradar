import { useAppDispatch, useAppSelector } from "app/hooks";
import { HeadingH2, Section } from "globalComponents/elements";
import ProductItem from "components/productListingItem";
import { justForYouSelector } from "features/home/homeSelectors";
import { justForYouThunk } from "features/home/homeThunks";
// import { updateViewMoreJustForYouPrducts } from "features/home/homeSlice";
import withCountry from "hoc/countryName";
import { useEffect, useRef, useState } from "react";
import { WarningIconSVG } from "assets/svgComponents/icons";
import { useHistory } from "react-router-dom";
import { isElementXPercentInViewport } from "utils/helpers";
import { ProductLoader } from "components/placeholders/productsListing";
import { PLATFORM_WEBSITE } from "app/constants";
import TranslatedText from "components/translatedText";

var lastScroll = 0;
var footerSection;

const scrollDetect = () => {
  let currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0 && lastScroll <= currentScroll) {
    lastScroll = currentScroll;
    return true;
    // if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    //   // alert("at page bottom")
    //   return false;
    // } else {
    //   return true;
    // }
  } else {
    lastScroll = currentScroll;
    return false;
  }
};
interface JustForYouProps {
  countryName?: any;
  countryCode?: any;
}

const JustForYou = ({ countryName, countryCode }: JustForYouProps) => {
  const history = useHistory();
  const justForYouRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const {
    justForYouProduct,
    justForYouProductStatus,
    isJustForYouProductError,
    currentJustForYouProductPage,
    justForYouProductPageTotal,
    viewMoreJustForYouPrducts,
    justForYouMoreProductStatus,
    nextJustForYouProductPage,
  } = useAppSelector(justForYouSelector);

  useEffect(() => {
    dispatch(
      justForYouThunk({
        body: {
          platform: PLATFORM_WEBSITE,
          page: 1,
          country_name: countryName,
        },
        isMore: false,
      })
    );
    footerSection = document.getElementById("footerSection");
    return () => {
      lastScroll = 0;
    };
  }, []);

  const onClickHandler = (product: any, merchantId: any) => {
    history.push({
      pathname: `/product/${product.id}`,
      state: {
        title: product.name ? `BuyRadar - ${product.name}` : "BuyRadar",
        merchant: merchantId,
      },
    });
  };

  // infinite scroll
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrolling]);

  const handleScroll = () => {
    setScrolling(!scrolling);
    if (
      justForYouProduct.length &&
      justForYouProductStatus !== "loading" &&
      justForYouMoreProductStatus !== "loading" &&
      scrollDetect() &&
      !isElementXPercentInViewport(footerSection, 10) &&
      justForYouRef &&
      justForYouRef.current &&
      currentJustForYouProductPage < justForYouProductPageTotal &&
      isElementXPercentInViewport(justForYouRef.current, 10)
    ) {
      viewMoreJustForYouProducts();
    }
  };

  const viewMoreJustForYouProducts = () => {
    dispatch(
      justForYouThunk({
        body: {
          platform: PLATFORM_WEBSITE,
          page: currentJustForYouProductPage + 1,
          country_name: countryName,
          nextJustForYouProductPage: currentJustForYouProductPage + 2,
        },
        isMore: true,
      })
    );
  };

  return (
    <Section className="justforyou-sec">
      <div className="custom-container">
        <HeadingH2 heading="home.justForYou" />
        <div className="homeproducts position-relative">

          {justForYouProductStatus === "loading" &&
          !isJustForYouProductError ? (
            <>
              <ProductLoader />
              <div style={{ paddingTop: "40px", width: "100%" }} />
              <ProductLoader />
            </>
          ) : null}

          {justForYouProductStatus === "idle" &&
          !isJustForYouProductError &&
          justForYouProduct.length > 0
            ? justForYouProduct.map((product) => (
                <ProductItem
                  key={product.unique_id}
                  product={product}
                  onClick={onClickHandler}
                  isWishlistRecommended={false}
                  isProductDetailRecommended={false}
                  isBrowse={false}
                />
              ))
            : null}

          {justForYouMoreProductStatus === "loading" ? (
            <>
              <ProductLoader />
              <div style={{ paddingTop: "40px", width: "100%" }} />
              <ProductLoader />
            </>
          ) : null}

          {isJustForYouProductError ? (
            <div className="warning">
              <WarningIconSVG />
              <p>
                <TranslatedText text="global.somethingWentWrong" /> <br />
                <TranslatedText text="global.failedToFetch." />
              </p>
            </div>
          ) : null}

          <div ref={justForYouRef} />
        </div>
      </div>
    </Section>
  );
};

const JustForYouWithCountry = withCountry(JustForYou);
export default JustForYouWithCountry;
