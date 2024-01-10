import { Image } from "globalComponents/elements";
import StarRating from "components/starRating";
import {
  // AverageIconSVG,
  GreenDownArrowIconSVG,
  RedUpArrowIconSVG,
  WarningIconSVG,
} from "assets/svgComponents/icons";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { productDetailSelector } from "../../productSelectors";
import { similarProductsSelector } from "features/productDetail/productSelectors";
import { useEffect, useRef, useState } from "react";
import { similarProductsThunk } from "features/productDetail/productThunks";
import { toggleSimilarProductsStatus } from "../../productSlice";
import SingleProductPlaceholder from "components/placeholders/singleProductLoading";
import { useHistory } from "react-router-dom";
import TranslatedText from "components/translatedText";
import SomethingWentWrong from "components/somethingWentWrong";
import { ProductListingImageLoader } from "components/placeholders/image";
import { PLATFORM_WEBSITE } from "app/constants";
interface SimilarProductsProps {
  countryName?: any;
  countryCode?: any;
  productDetailRef?: React.RefObject<HTMLDivElement>;
}

const SimilarProducts = ({
  countryName,
  countryCode,
  productDetailRef,
}: SimilarProductsProps) => {
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector(productDetailSelector);
  const [isApicalled, setIsApicalled] = useState(false);
  const { id, name, reviews, description } = productDetail;
  const myRef = useRef<HTMLDivElement>(null);

  const {
    similarProducts,
    similarProductsStatus,
    isSimilarProductsError,
    currentSimilarProductsPage,
    isMoreSimilarProducts,
    similarProductsPageTotal,
    // viewMoreSimilarProducts
  } = useAppSelector(similarProductsSelector);

  useEffect(() => {
    if (
      !isApicalled &&
      productDetailRef &&
      productDetailRef.current &&
      myRef &&
      myRef.current &&
      similarProductsStatus === "loading"
    ) {
      const loader = document.querySelector(".product-sidebar");
      if (loader) {
        const loaderStyle = getComputedStyle(loader);
        let parentPaddingTopBottom = 0;
        const productsidebarOter = document.querySelector(
          ".productsidebar-oter"
        );
        if (productsidebarOter) {
          const productsidebarOterStyle = getComputedStyle(productsidebarOter);
          parentPaddingTopBottom =
            +productsidebarOterStyle.paddingBottom.split("px")[0] +
            +productsidebarOterStyle.paddingTop.split("px")[0];
        }
        let loaderHeight =
          +loaderStyle.marginBottom.split("px")[0] +
          +loaderStyle.marginTop.split("px")[0] +
          myRef?.current?.clientHeight +
          parentPaddingTopBottom;

        setIsApicalled(true);
        dispatch(
          similarProductsThunk({
            body: {
              page: currentSimilarProductsPage,
              platform: PLATFORM_WEBSITE,
              resultsNumber:
                description && reviews.length === 0
                  ? 1
                  : Math.floor(
                      productDetailRef?.current?.clientHeight / loaderHeight
                    ), //We will modify this number based on height of .productdetaildetail in product detail page
              country_name: countryName,
              product_id: id,
              keyword: name,
            },
          })
        );
      }
    }
  }, [myRef.current]);

  useEffect(() => {
    return () => {
      dispatch(toggleSimilarProductsStatus());
    };
  }, []);

  return (
    <div className="productsidebar-oter">
      <h3>
        <TranslatedText text="product.similarProducts" />
      </h3>
      {similarProductsStatus === "loading" && !isSimilarProductsError ? (
        <>
          <div className="product-sidebar" ref={myRef}>
            <SingleProductPlaceholder />
          </div>
        </>
      ) : !isSimilarProductsError && similarProducts.length ? (
        similarProducts.map((prod) => <ProductItem key={prod.id} item={prod} />)
      ) : !isSimilarProductsError ? (
        <div className="product-sidebar">
          <div className="warning" style={{ width: "unset" }}>
            <WarningIconSVG />
            <p>
              <TranslatedText text="global.noProductsFound" />
            </p>
          </div>
        </div>
      ) : (
        <>
          <SomethingWentWrong />
        </>
      )}
    </div>
  );
};

export default SimilarProducts;

export const ProductItem = ({ item }: any) => {
  const {
    image_url,
    name,
    min_price_usd_cache,
    max_price_usd_cache,
    currency_symbol,
    rating_cache,
    reviews_count,
    deal_type,
    merchant_image_url,
    merchant_name
  } = item;

  const history = useHistory();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const onClickHandler = (product: any, merchantId: any) => {
    history.push({
      pathname: `/product/${product.id}`,
      state: {
        title: product.name ? `BuyRadar - ${product.name}` : "BuyRadar",
        merchant: merchantId,
      },
    });
  };

  return (
    <a
      className="product-sidebar pointer"
      href={`/product/${item.id}?title=${
        item.name ? `BuyRadar - ${item.name}` : "BuyRadar"
      }`}
      // onClick={() => onClickHandler(item, null)}
    > 
      <div className="review-product">
        <div className="review-productimg product-images position-relative">
          {isImageLoading ? <ProductListingImageLoader /> : null}
          <Image
            src={image_url}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            className="img-fluid"
            alt="icon"
          />
          <div className="client-logo">
            <ul>
              <li>
                <img src={merchant_image_url} alt=""/>
              </li>
            </ul>  
          </div>
        </div>
        <div className="review-productxt">
          <h3>{name}</h3>
          <small>{merchant_name}</small>
          <h4
            className={
              deal_type === "good"
                ? "reive-green"
                : deal_type === "normal"
                ? "reive-purple"
                : "reive-red"
            }
          >
            {min_price_usd_cache === max_price_usd_cache
              ? `${currency_symbol ? currency_symbol : "$"} ${
                  !max_price_usd_cache ? 0 : max_price_usd_cache
                }`
              : `${currency_symbol ? currency_symbol : "$"} ${
                  !min_price_usd_cache ? 0 : min_price_usd_cache
                } - ${currency_symbol ? currency_symbol : "$"} ${
                  !max_price_usd_cache ? 0 : max_price_usd_cache
                }`}{" "}
            {deal_type === "good" ? (
              <GreenDownArrowIconSVG />
            ) : deal_type === "bad" ? (
              <RedUpArrowIconSVG />
            ) : // :
            // deal_type === 'normal'
            // ? <AverageIconSVG />
            null}
          </h4>
          {rating_cache > 0 && (
            <div className="reviewside-ratng">
              <StarRating rate={rating_cache} />
              <h4></h4>
            </div>
          )}
        </div>
      </div>
    </a>
  );
};
