import { useAppSelector, useAppDispatch } from "app/hooks";
import { browseProductsSelector } from "../../browseSelectors";
// import { ViewMoreBtn } from "globalComponents/themeComponents";
// import ProductsListingPlaceholder from "components/placeholders/productsListing";
import { useHistory } from "react-router-dom";
import ProductItem from "components/productListingItem";
// import useScrollPagination from "hooks/scollPagination";
import { isElementXPercentInViewport } from "utils/helpers";
import { viewMoreBrowseProducts } from "../../browseSlice";
import { useEffect, useRef, useState } from "react";
import { ProductLoader } from "components/placeholders/productsListing";
// import TranslatedText from "components/translatedText";
import SomethingWentWrong, {
  NoProductFound,
} from "components/somethingWentWrong";

var lastScroll = 0;
var footerSection;

const scrollDetect = () => {
  let currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0 && lastScroll <= currentScroll) {
    lastScroll = currentScroll;
    return true;
  } else {
    lastScroll = currentScroll;
    return false;
  }
};

const TrendingContent = ({
  viewMoreProducts,
}: {
  viewMoreProducts: (a: any) => void;
}) => {
  const {
    products,
    browseProductsStatus,
    isBrowseProductsError,
    currentProductPage,
    totalBrowseProductPages,
    isMoreBrowseProducts,
    viewMoreStatus,
  } = useAppSelector(browseProductsSelector);

  const history = useHistory();
  const dispatch = useAppDispatch();
  const browseProductsRef = useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    footerSection = document.getElementById("footerSection");
    return () => {
      lastScroll = 0;
    };
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrolling]);

  const handleScroll = () => {
    setScrolling(!scrolling);
    if (
      products.length &&
      browseProductsStatus !== "loading" &&
      viewMoreStatus !== "loading" &&
      scrollDetect() &&
      !isElementXPercentInViewport(footerSection, 10) &&
      browseProductsRef &&
      browseProductsRef.current &&
      currentProductPage < totalBrowseProductPages &&
      isElementXPercentInViewport(browseProductsRef.current, 10)
    ) {
      dispatch(viewMoreBrowseProducts());
      viewMoreProductsHandler();
    }
  };

  const onClickHandler = (product: any, merchantId: any) => {
    history.push({
      pathname: `/product/${product.id}`,
      state: {
        title: product.name ? `BuyRadar - ${product.name}` : "BuyRadar",
        merchant: merchantId,
      },
    });
  };

  const viewMoreProductsHandler = () => {
    viewMoreProducts({ isLoadMore: false, page: currentProductPage + 1 });
  };

  return (
    <div
      className="tab-content slidertabbing-inner"
      style={{ marginBottom: "6%" }}
    >
      <div id="watches" className="tab-pane active slidertabbing">
        {!isBrowseProductsError && browseProductsStatus === "loading" ? (
          <>
            <ProductLoader />
            <div style={{ paddingTop: "40px", width: "100%" }} />
            <ProductLoader />
            <div style={{ paddingTop: "40px", width: "100%" }} />
            <ProductLoader />
          </>
        ) : null}
        {!isBrowseProductsError &&
        browseProductsStatus === "idle" &&
        products.length > 0
          ? products.map((product, index) => {
              return (
                <ProductItem
                  key={`key_${index}_${product.unique_id}`}
                  product={product}
                  onClick={onClickHandler}
                  isBrowse={true}
                />
              );
            })
          : null}

        {browseProductsStatus === "failed" && <SomethingWentWrong />}

        {isMoreBrowseProducts ? (
          <>
            <>
              <ProductLoader />
              <div style={{ paddingTop: "40px", width: "100%" }} />
              <ProductLoader />
              <div style={{ paddingTop: "40px", width: "100%" }} />
              <ProductLoader />
            </>
          </>
        ) : null}

        <div ref={browseProductsRef} />
      </div>
    </div>
  );
};

export default TrendingContent;
