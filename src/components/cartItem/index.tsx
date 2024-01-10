import { Image } from "../../globalComponents/elements";
import CartItemImage from "assets/images/cart/cimg1@2x.png";
import {
  AverageIconSVG,
  DeleteNoBgCartIconSVG,
  EmptyHeartNoBgIconSVG,
  GreenDownArrowIconSVG,
  HeartFilledIconSVG,
  RedUpArrowIconSVG,
} from "assets/svgComponents/icons";
import { Link } from "globalComponents/elements";
import { useAppDispatch } from "app/hooks";
import { updateCartProducts } from "features/userAccount//userSlice";
import {
  addToWishListThunk,
  removeFromWishListThunk,
} from "features/home/homeThunks";
import { useHistory } from "react-router-dom";
import Warning from "components/modals/warning ";
import { useState } from "react";
import TranslatedText from "components/translatedText";

const CartItem = ({ item }: { item: any }) => {
  const { product } = item;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const addToWishListFromCart = async () => {
    const res = await dispatch(
      addToWishListThunk({
        body: { product_id: product.id },
      })
    );

    if (res.payload.status_code === 200) {
      dispatch(updateCartProducts(res.payload));
      // dispatch(updateWishlistCount({ isWishlist: true }))
    }
  };

  const removeWishListFromCart = async () => {
    const res = await dispatch(
      removeFromWishListThunk({
        body: { product_id: product.id },
      })
    );

    if (res.payload.status_code === 200) {
      dispatch(updateCartProducts(res.payload));
      // dispatch(updateWishlistCount({ isWishlist: true }))
    }
  };

  const productDetail = () => {
    history.push({
      pathname: `/product/${product.id}`,
      state: {
        title: product.name ? `BuyRadar - ${product.name}` : "BuyRadar",
        merchant: item.merchant_id,
      },
    });
  };

  return (
    <>
      <div className="cartiner">
        <div className="checkbox-imgtxt">
          <div className="chartcheckbox">
            <label className="cartbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="cartimgtxt">
            <div className="cartimg pointer" onClick={() => productDetail()}>
              <Image
                src={
                  product.product_main_image
                    ? product.product_main_image
                    : CartItemImage
                }
                alt="img"
              />
            </div>
            <div className="carttxt">
              <div className="cartxt-inr">
                <h3 className="pointer" onClick={() => productDetail()}>
                  {product.name}
                </h3>
                <h4>
                  <TranslatedText text="product.by" />{" "}
                  <span>{item.merchant_name}</span>
                </h4>
              </div>
              <div className="singleitem-price">
                <h3>
                  {product.currency_symbol} {item.price_when_added}
                </h3>
                {item.merchant_base_deal_type === "good" ? (
                  <h4 className="gooddeal">
                    <GreenDownArrowIconSVG />{" "}
                    <TranslatedText text="product.goodDeal" />
                  </h4>
                ) : item.merchant_base_deal_type === "bad" ? (
                  <h4 className="gooddeal goodreddeal">
                    <RedUpArrowIconSVG />{" "}
                    <TranslatedText text="product.badDeal" />
                  </h4>
                ) : (
                  <h4 className="gooddeal goodpurpledeal">
                    <AverageIconSVG />{" "}
                    <TranslatedText text="product.normalDeal" />
                  </h4>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="carticons">
          <div className="max-min">
            <ul>
              {/* <li>+</li> */}
              <li>
                <TranslatedText text="cart.1" />
              </li>
              {/* <li>-</li> */}
            </ul>
          </div>
          <div className="del-likeicon">
            <ul>
              {product.isWishlist === false ? (
                <li>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      addToWishListFromCart();
                    }}
                    href="/"
                    className="del"
                  >
                    <EmptyHeartNoBgIconSVG />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      removeWishListFromCart();
                    }}
                    href="/"
                    className="del"
                  >
                    <HeartFilledIconSVG />
                  </Link>
                </li>
              )}
              <li>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAlert(true);
                  }}
                  href="/"
                  className="del"
                >
                  <DeleteNoBgCartIconSVG />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Warning
        show={showAlert}
        onHide={() => setShowAlert(false)}
        productId={product.id}
        merchantId={item.merchant_id}
      />
    </>
  );
};

export default CartItem;
