import { Image } from "globalComponents/elements";
import {
  USFlagIcon,
  AddToCartLink,
  BuyNowLink,
} from "globalComponents/themeComponents";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { merchantSelector } from "../../productSelectors";
import StarRating from "components/starRating";
import {
  PickupIconYellowSvg,
  ReceiveByYellowIconSVG,
  GreenPlantIconSVG,
  GreenDownArrowIconSVG,
  RedUpArrowIconSVG,
  AverageIconSVG,
} from "assets/svgComponents/icons";
import { addToCartThunk } from "features/userAccount/userThunks";
import React, { useEffect, useState } from "react";
import { loggedInUserSelector } from "features/auth/authSelectors";
import { useHistory, useLocation } from "react-router-dom";
import { merchantListThunk } from "features/productDetail/productThunks";
// import NumericPagination from "components/numericPagination";
import NumericPagination from "hooks/numericPagination";
import { MerchantPlaceholder } from "components/placeholders/merchantList";
import TranslatedText from "components/translatedText";
import { Link } from "globalComponents/elements";
import loadable from "@loadable/component";
const InCorrectPrice = loadable(
  () =>
    import(
      /*  webpackChunkName: "target-price-modal" */
      "../../../../components/modals/IncorrectPrice"
    )
);



const AvailableOnOtherShops = ({ productId }: any) => {
  const dispatch = useAppDispatch();
  const {
    merchants,
    currentMerchantsPage,
    merchantsStatus,
    merchantListLimit,
    merchantTotalRecords,
  } = useAppSelector(merchantSelector);

  const [page, setPage] = useState(1);
  

  useEffect(() => {
    dispatch(
      merchantListThunk({
        body: {
          product_id: productId,
          page: page ? page : currentMerchantsPage,
          per_page: merchantListLimit,
        },
      })
    );
  }, [page]);

  return merchants && merchants.length ? (
    <section className="available-shops-sec">
      <div className="custom-container">
        <div className="availableshop-iner">
          <h2>Available in following stores</h2>
          {merchantsStatus === "loading" ? (
            <div className="text-center my-3">
              <MerchantPlaceholder />
            </div>
          ) : null}
          {merchantsStatus === "idle" && merchants && merchants.length
            ? merchants.map((merchant: any, index: number) => (
                <AvailableOnOtherShopsItem
                  merchant={merchant}
                  key={merchant.merchant_id}
                />
              ))
            : null}
          {merchants && merchants.length ? (
            <NumericPagination
              page={currentMerchantsPage}
              limit={merchantListLimit}
              totalRecords={merchantTotalRecords}
              setPage={setPage}
            />
          ) : null}
        </div>
      </div>
    </section>
  ) : null;
};

export default AvailableOnOtherShops;

export const AvailableOnOtherShopsItem = ({ merchant }: { merchant: any }) => {
  const {
    image_url,
    merchantReviewsAvg,
    merchantReviewsCount,
    supportLocalEconomy,
    product_price,
    currency_symbol,
    name,
    deal_type,
    soonest_delivery_date,
    soonest_pickup_date,
    product_store_link,
    is_eco,
    made_in_usa,
    merchant_id,
    product_id
  } = merchant;

  const history = useHistory();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const loggedInUser = useAppSelector(loggedInUserSelector);
  const [isIncorrectPriceModal, setIsIncorrectPriceModal] = useState(false);
  const addToCartHandler = () => {
    if (loggedInUser && loggedInUser.token) {
      dispatch(
        addToCartThunk({
          body: {
            product_id: merchant.product_id,
            merchant_id: merchant.merchant_id,
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

  return (
    <div className="availableshops-txt">
      <div className="shoplogo avalbleinr-box">
        <div className="shoplogoinr">
          <Image src={image_url} alt="product_img" />
          <h3>{name}</h3>
        </div>
        <div className="singleitem-rating">
          <ul>
            <StarRating rate={merchantReviewsAvg} />
          </ul>
          <h4>
            {merchantReviewsAvg ? merchantReviewsAvg : null}{" "}
            <span>({merchantReviewsCount})</span>
          </h4>
        </div>
      </div>
      <div className="shop-deals avalbleinr-box">
        <div className="singleitem-price">
          <h3>
            {currency_symbol}
            {product_price}
          </h3>
          {deal_type === "good" ? (
            <h4 className="gooddeal">
              <GreenDownArrowIconSVG />
              <TranslatedText text="product.goodDeal" />
            </h4>
          ) : deal_type === "bad" ? (
            <h4 className="gooddeal goodreddeal">
              <RedUpArrowIconSVG />
              <GreenDownArrowIconSVG />
              <TranslatedText text="product.badDeal" />
            </h4>
          ) : (
            <h4 className="gooddeal goodpurpledeal">
              <AverageIconSVG />
              <GreenDownArrowIconSVG />
              <TranslatedText text="product.normalDeal" />
            </h4>
          )}
        </div>
        <div className="pick-receive">
          {soonest_pickup_date && (
            <div className="pick-receiveinr">
              <div className="pickrecevie-img pick-img">
                <PickupIconYellowSvg />
                <h3>
                  <GreenDownArrowIconSVG />
                  <TranslatedText text="product.pickupAt" />:
                </h3>
              </div>
              <h4>
                {soonest_pickup_date ? (
                  soonest_pickup_date
                ) : (
                  <TranslatedText text="global.notAvailable" />
                )}
              </h4>
            </div>
          )}
          {soonest_delivery_date && (
            <div className="pick-receiveinr">
              <div className="pickrecevie-img recevie-img">
                <ReceiveByYellowIconSVG />
                <h3>
                  <GreenDownArrowIconSVG />
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
      </div>
      <div className="localeconmy avalbleinr-box">
        {supportLocalEconomy ? (
          <h3>
            <GreenDownArrowIconSVG />
            <TranslatedText text="product.itemSupportLocalEconomy" />
          </h3>
        ) : null}
        <ul>
          {made_in_usa && (
            <li>
              <span>
                <USFlagIcon />
              </span>
              <h3>
                <GreenDownArrowIconSVG />
                <TranslatedText text="product.madeInUSA" />
              </h3>
            </li>
          )}
          {is_eco && (
            <li>
              <span>
                <GreenPlantIconSVG />
              </span>
              <h3>
                <GreenDownArrowIconSVG />
                <TranslatedText text="product.ecoFriendly" />
              </h3>
            </li>
          )}
        </ul>
      </div>
      <div className="availableshop-btn avalbleinr-box">
        <BuyNowLink
          className="buy-btn"
          onClick={(e) => {
            e.preventDefault();
            window.open(product_store_link, "_blank");
          }}
        />
        <AddToCartLink
          className="addcart-btn"
          onClick={(e) => {
            e.preventDefault();
            addToCartHandler();
          }}
        />
         {/* {single_product_mode === 1 && merchants_product?.length > 0 && ( */}
         <div className="incorrectPrice">
                    <Link
                      // type="button"
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setIsIncorrectPriceModal(true)
                      }}
                    >
                      <TranslatedText text="product.inCorrectPrice" />
                    </Link>
                  </div>
                {/* )} */}
      </div>
      <InCorrectPrice show={isIncorrectPriceModal}
        onHide={() => setIsIncorrectPriceModal(false)}
        product_id={product_id}
        merchants_product={merchant_id}
      />
    </div>
    
  );
};
