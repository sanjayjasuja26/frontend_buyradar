import { Link } from "globalComponents/elements";
import loadable from "@loadable/component";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { productDetailSelector } from "../../productSelectors";
import ProductImages from "./productImages";
import StarRating from "components/starRating";
// import TargetPriceModal from "components/modals/targetPrice";
import { useState } from "react";
import FlagIcon from "components/flagIcon";
import {
  GreenPlantIconSVG,
  NotifyIconYellowBgSVG,
  HeartFilledIconSVG,
  ShareBlueBGIconSVG,
  RedUpArrowIconSVG,
  GreenDownArrowIconSVG,
  PickUpIconBlueSVG,
  ReceiveIconBlueSVG,
  HeartEmptyIconSVG,
} from "assets/svgComponents/icons";
import withCountry from "hoc/countryName";
import {
  addToWishListThunk,
  removeFromWishListThunk,
} from "features/home/homeThunks";
import { updateIsWishlist } from "../../productSlice";
import { loggedInUserSelector } from "features/auth/authSelectors";
import { useHistory, useLocation } from "react-router-dom";
import { AddToCartLink, BuyNowLink } from "globalComponents/themeComponents";
import { addToCartThunk } from "features/userAccount/userThunks";
import { STATIC_NO_IMAGE } from "app/constants";
import TranslatedText from "components/translatedText";
import { toast } from "react-toastify";

const TargetPriceModal = loadable(
  () =>
    import(
      /*  webpackChunkName: "target-price-modal" */
      "../../../../components/modals/targetPrice"
    )
);
const InCorrectPrice = loadable(
  () =>
    import(
      /*  webpackChunkName: "target-price-modal" */
      "../../../../components/modals/IncorrectPrice"
    )
);

interface FlagIconProps {
  countryName?: any;
  countryCode?: any;
}

const DetailSection = ({ countryName, countryCode }: FlagIconProps) => {
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const [isTargetPriceModal, setIsTargetPriceModal] = useState(false);
  const [isIncorrectPriceModal, setIsIncorrectPriceModal] = useState(false);
  const { productDetail } = useAppSelector(productDetailSelector);
  const [isShowToast, setShowTast] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  let {
    id,
    product_pictures,
    name,
    supportLocalEconomy,
    currency_symbol,
    maxPrice,
    minPrice,
    deal_type,
    soonest_delivery_date,
    soonest_pickup_date,
    product_configurations,
    ratingAvg,
    reviews_count,
    countryOforigin,
    isWishlist,
    is_eco,
    single_product_mode,
    merchants_product,
    product_main_image,
    image_url,
  } = productDetail;
  const addToWishListHandler = async () => {
    let res = await dispatch(
      addToWishListThunk({
        body: {
          product_id: id,
        },
      })
    );
    if (res.payload.status_code === 200) {
      dispatch(updateIsWishlist({ id, isWishlist: true }));
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
      dispatch(updateIsWishlist({ id, isWishlist: false }));
    }
  };

  const addToCartHandler = () => {
    if (loggedInUser && loggedInUser.token) {
      dispatch(
        addToCartThunk({
          body: {
            product_id: id,
            merchant_id: merchants_product[0].merchant_id,
          },
        })
      );
    } else {
      history.push({
        pathname: "/login",
        state: { path: location?.pathname },
      });
    }
  };

  if (product_pictures && product_pictures?.length < 1) {
    let image = {
      date: 0,
      id,
      image_order: 1,
      image_url: image_url || product_main_image || STATIC_NO_IMAGE,
      merchant_id: null,
      original_image_url: "",
      product_id: id,
      isNoImage: image_url || product_main_image ? false : true,
    };
    product_pictures = [image];
  }

  return (
    <section className="single-itemsec">
      <div className="custom-container">
        <div className="singleitem-otter">
          <ProductImages images={product_pictures} name={name} />
          <div className="singleitem-text">
            <h2>{name && name}</h2>
            <div className="singleitem-textinr">
              <div className="singleitem-text-left">
                {supportLocalEconomy ? (
                  <h3>
                    <TranslatedText text="product.supportLocalEconomy" />
                  </h3>
                ) : null}
                {single_product_mode === 1 && merchants_product?.length > 0 && (
                  <h4>
                    <TranslatedText text="product.by" />{" "}
                    <span
                      style={{
                        color: `${merchants_product[0].hex_color}`,
                        fontWeight: "bold",
                      }}
                    >
                      {merchants_product[0].name}{" "}
                      <img src={merchants_product[0]?.image_url} alt="" />
                    </span>
                  </h4>
                )}
                <div className="singleitem-rating">
                  <ul>
                    <StarRating rate={ratingAvg} />
                  </ul>
                  <h4>
                    {ratingAvg} <span>({reviews_count})</span>
                  </h4>
                </div>
                <div className="pick-receive">
                  {soonest_pickup_date && (
                    <div className="pick-receiveinr">
                      <div className="pickrecevie-img pick-img">
                        <PickUpIconBlueSVG />
                        <h3>
                          <TranslatedText text="product.pickupAt" />:
                        </h3>
                      </div>
                      <h4>
                        {soonest_pickup_date ? soonest_pickup_date : "N/A"}
                      </h4>
                    </div>
                  )}
                  {soonest_delivery_date && (
                    <div className="pick-receiveinr">
                      <div className="pickrecevie-img recevie-img">
                        <ReceiveIconBlueSVG />
                        <h3>
                          <TranslatedText text="product.receiveBy" />:
                        </h3>
                      </div>
                      <h4>
                        {soonest_delivery_date ? (
                          soonest_delivery_date
                        ) : (
                          <TranslatedText text="global.notAvailable" />
                        )}
                      </h4>
                    </div>
                  )}
                </div>
                <div className="singleitem-price">
                  <h3>
                    {currency_symbol ? (
                      <>
                        {minPrice === maxPrice
                          ? `${currency_symbol} ${!minPrice ? 0 : minPrice}`
                          : `${currency_symbol} ${!minPrice ? 0 : minPrice
                          } - ${currency_symbol} ${!maxPrice ? 0 : maxPrice}`}
                      </>
                    ) : null}
                  </h3>
                  <h4>
                    <Link
                      type="button"
                      href="set-price-range"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {deal_type === "good" ? (
                        <GreenDownArrowIconSVG />
                      ) : deal_type === "bad" ? (
                        <RedUpArrowIconSVG />
                      ) : (
                        ""
                      )}{" "}
                      <span className={`deal-${deal_type} text-capitalize `}>
                        {deal_type} <TranslatedText text="product.deal" />
                      </span>
                    </Link>
                  </h4>
                </div>
              </div>
              <div className="singleitem-text-rght">
                <div className="itemplant-flag">
                  <ul>
                    {is_eco === 1 && (
                      <li>
                        <GreenPlantIconSVG />
                      </li>
                    )}
                    {countryOforigin && (
                      <li className="flag-icone-detail">
                        <FlagIcon
                          countryName={countryName}
                          countryCode={countryCode}
                        />
                      </li>
                    )}
                  </ul>
                </div>
                <div className="item-ions">
                  {isShowToast && <p>Copied </p>}

                  <ul>
                    <li
                      onClick={() => {
                        if (loggedInUser && loggedInUser.token) {
                          setIsTargetPriceModal(true);
                        }
                      }}
                    >
                      <NotifyIconYellowBgSVG />
                    </li>
                    {loggedInUser && loggedInUser.token ? (
                      <li
                        className="heartproduct-icon"
                        onClick={() => {
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
                          <HeartEmptyIconSVG />
                        )}
                      </li>
                    ) : (
                      <li
                        onClick={() =>
                          history.push({
                            pathname: "/login",
                            state: { path: location?.pathname },
                          })
                        }
                        className="heartproduct-icon"
                      >
                        <HeartEmptyIconSVG />
                      </li>
                    )}
                    <li
                      onClick={() => {
                        navigator.clipboard
                          .writeText(window.location.href)
                          .then(
                            function () {
                              toast.success("Product URL Copied");
                              // setShowTast(true);
                              // setTimeout(() => {
                              //   setShowTast(false);
                              // }, 1000);
                            },
                            function () {
                              console.log("not copied");
                            }
                          );
                      }}
                    >
                      <ShareBlueBGIconSVG />
                    </li>
                  </ul>
                </div>
                {single_product_mode === 1 && merchants_product?.length > 0 && (
                  <div className="availableshop-btn avalbleinr-box">
                    <BuyNowLink
                      className="buy-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          merchants_product[0].product_store_link,
                          "_blank"
                        );
                      }}
                    />
                    <AddToCartLink
                      className="addcart-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCartHandler();
                      }}
                    />
                  </div>
                )}
                {single_product_mode === 1 && merchants_product?.length > 0 && (
                  <div className="incorrectPrice">
                    <Link
                      // type="button"
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setIsIncorrectPriceModal(true);
                      }}
                    >
                      <TranslatedText text="product.inCorrectPrice" />
                    </Link>
                  </div>
                )}

              </div>
            </div>
            {product_configurations &&
              product_configurations.attributes &&
              product_configurations.attributes.length
              ? product_configurations.attributes.map(
                (attr: any, index: number) => {
                  if (attr.name === "Color") {
                    return (
                      <div key={index} className="itemcolor">
                        <h3>{attr.name}</h3>
                        <ul>
                          {attr.values && attr.values.length
                            ? attr.values.map((i: any, j: number) => (
                              <li key={j} style={{ background: i }}></li>
                            ))
                            : null}
                        </ul>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="itemoter">
                        <h3>{attr.name}</h3>
                        <ul>
                          {attr.values && attr.values.length
                            ? attr.values.map((i: any, j: number) => (
                              <li key={j}>{i}</li>
                            ))
                            : null}
                        </ul>
                      </div>
                    );
                  }
                }
              )
              : null}
          </div>
        </div>
      </div>
      <TargetPriceModal
        show={isTargetPriceModal}
        onHide={() => setIsTargetPriceModal(false)}
        productId={id}
      />
      {single_product_mode == 1? 
      <InCorrectPrice show={isIncorrectPriceModal}
        onHide={() => setIsIncorrectPriceModal(false)}
        product_id={id}
        merchants_product={merchants_product}
      /> :null}
      
    </section>
  );
};

const DetailSectionWithCountry = withCountry(DetailSection);
export default DetailSectionWithCountry;
