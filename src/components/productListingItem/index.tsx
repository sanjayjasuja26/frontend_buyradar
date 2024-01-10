import { Image } from "globalComponents/elements";
import FlagIcon from "components/flagIcon";
import {
  AddToCartIconSVG,
  PickUpIconWhiteSVG,
  ReceiveIconWhiteSVG,
  GreenPlantIconSVG,
  GreenDownArrowIconSVG,
  RedUpArrowIconSVG,
  StarIconYellowIconSVG,
  HeartFilledIconSVG,
  EmptyHeartNoBgIconSVG,
  DefaultProductImage,
} from "assets/svgComponents/icons";
import withCountry from "hoc/countryName";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  addToWishListThunk,
  removeFromWishListThunk,
} from "features/home/homeThunks";
import { updateBrowseIsWishlist } from "features/browse/browseSlice";
import { updateProductIsWishlist } from "features/home/homeSlice";
import { updateIsWishlist } from "features/productDetail/productSlice";
import { loggedInUserSelector } from "features/auth/authSelectors";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TranslatedText from "components/translatedText";
import { ProductListingImageLoader } from "components/placeholders/image";
interface ProductItemProps {
  product: any;
  onClick: (a: any, b: any) => void;
  countryName?: any;
  countryCode?: any;
  isWishlistRecommended?: boolean;
  isProductDetailRecommended?: boolean;
  isBrowse?: boolean;
}

const ProductItem = ({
  product,
  onClick,
  countryName,
  countryCode,
  isWishlistRecommended,
  isProductDetailRecommended,
  isBrowse,
}: ProductItemProps) => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const history = useHistory();
  const location = useLocation();
  const {
    id,
    countryOforigin,
    soonest_pickup_date,
    soonest_delivery_date,
    supportLocalEconomy,
    name,
    currency_symbol,
    minPrice,
    maxPrice,
    ratingAvg,
    reviews_count,
    image_url,
    deal_type,
    product_main_image,
    isWishlist,
    is_eco,
    merchant,
  } = product;

  const [singleMerchant, setSingleMerchant] = useState<any>({});
  const [isImageLoader, setIsImageLoader] = useState<boolean>(true);

  useEffect(() => {
    if (merchant && merchant?.length > 0) {
      setSingleMerchant(merchant[0]);
    }
  }, [merchant]);

  const addToWishListHandler = async () => {
    const res = await dispatch(
      addToWishListThunk({
        body: {
          product_id: id,
        },
      })
    );

    if (res.payload.status_code === 200) {
      if (isBrowse) {
        dispatch(
          updateBrowseIsWishlist({
            id,
            isWishlist: true,
          })
        );
      } else {
        dispatch(
          updateProductIsWishlist({
            id,
            isWishlist: true,
            isWishlistRecommended,
            product,
          })
        );
        dispatch(updateIsWishlist({ id, isWishlist: true }));
      }
      if (isProductDetailRecommended) {
        dispatch(updateIsWishlist({ id, isWishlist: true }));
      }
    }
  };

  const removeFromWishListHandler = async () => {
    let res = await dispatch(
      removeFromWishListThunk({
        body: {
          product_id: id,
        },
      })
    );

    if (res.payload.status_code === 200) {
      if (isBrowse) {
        dispatch(
          updateBrowseIsWishlist({
            id,
            isWishlist: false,
          })
        );
      } else {
        dispatch(
          updateProductIsWishlist({
            id,
            isWishlist: false,
            isWishlistRecommended,
            product,
          })
        );
        dispatch(updateIsWishlist({ id, isWishlist: false }));
      }
      if (isProductDetailRecommended) {
        dispatch(updateIsWishlist({ id, isWishlist: false }));
      }
    }
  };
  return (
    <a
      className="homeproduct-inner homeprduct2"
      // onClick={(e) => onClick(product, merchant && merchant[0]?.id)}
      href={`/product/${id}?merchant=${merchant ? merchant[0]?.id : ""}&title=${
        product.name ? `BuyRadar - ${product.name}` : "BuyRadar"
      }`}
    >
      <div className="product-images">
        <div className="prductssingle-image position-relative">
          {isImageLoader ? <ProductListingImageLoader /> : null}
          {image_url || product_main_image ? (
            <Image
              src={image_url || product_main_image}
              alt="buyradar_product"
              onLoad={() => setIsImageLoader(false)}
              onError={() => setIsImageLoader(false)}
            />
          ) : (
            <DefaultProductImage />
          )}
        </div>
        <div className="client-logo">
          <ul>
            {singleMerchant?.image_url && (
              <li>
                <img src={singleMerchant.image_url} alt="" />
              </li>
            )}
          </ul>
        </div>
        <div className="top-icons">
          <ul>
            {/* <li>
              <AddToCartIconSVG />
            </li> */}
            {loggedInUser && loggedInUser.token ? (
              <li
                className="heartproduct-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isWishlist) {
                    removeFromWishListHandler();
                  } else {
                    addToWishListHandler();
                  }
                }}
              >
                {isWishlist ? (
                  <HeartFilledIconSVG />
                ) : (
                  <EmptyHeartNoBgIconSVG />
                )}
              </li>
            ) : (
              <li
                className="heartproduct-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push({
                    pathname: "/login",
                    state: {
                      path: location?.search
                        ? location.pathname + location.search
                        : location.pathname,
                    },
                  });
                }}
              >
                <EmptyHeartNoBgIconSVG />
              </li>
            )}
            {countryOforigin && (
              <li className="flag-icone">
                <FlagIcon countryName={countryName} countryCode={countryCode} />
              </li>
            )}
          </ul>
        </div>
        <div className="bottom-icons">
          <ul>
            {soonest_pickup_date && (
              <li>
                <PickUpIconWhiteSVG />
                <TranslatedText text="product.pickUp" />:{" "}
                {soonest_pickup_date ? soonest_pickup_date : "N/A"}
              </li>
            )}
            {soonest_delivery_date && (
              <li>
                <ReceiveIconWhiteSVG />
                <TranslatedText text="product.receiveBy" />:{" "}
                {soonest_delivery_date ? soonest_delivery_date : "N/A"}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="homeproduct-text">
        <div className="homeproduct-hdng">
          <h3>{name}</h3>
          {is_eco === 1 && <GreenPlantIconSVG />}
        </div>
        {singleMerchant && (
          <small
            style={{ color: `${singleMerchant.hex_color}`, fontWeight: "bold" }}
          >
            {singleMerchant.name}
          </small>
        )}
        {supportLocalEconomy ? (
          <div className="homeproduct-price">
            <h3>
              <TranslatedText text="product.supportLocalEconomy" />
            </h3>
          </div>
        ) : null}
        <div className="homeproduct-priceiner">
          <h4
            className={
              deal_type === "good"
                ? "reive-green"
                : deal_type === "normal"
                ? "reive-purple"
                : "reive-red"
            }
          >
            {minPrice === maxPrice
              ? `${currency_symbol ? currency_symbol : "$"} ${
                  !minPrice ? 0 : minPrice
                }`
              : `${currency_symbol ? currency_symbol : "$"} ${
                  !minPrice ? 0 : minPrice
                } - ${currency_symbol ? currency_symbol : "$"} ${
                  !maxPrice ? 0 : maxPrice
                }`}
          </h4>
          {deal_type === "good" ? (
            <GreenDownArrowIconSVG />
          ) : deal_type === "bad" ? (
            <RedUpArrowIconSVG />
          ) : null}
        </div>
        {reviews_count > 0 && (
          <div className="homeproduct-rating">
            <StarIconYellowIconSVG />
            <h4>
              {ratingAvg} <span>({reviews_count})</span>
            </h4>
          </div>
        )}
      </div>
    </a>
  );
};
const ProductItemWithCountry = withCountry(ProductItem);
export default ProductItemWithCountry;
