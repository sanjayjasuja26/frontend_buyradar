import { HeadingH2, Section } from "globalComponents/elements";
import CartItem from "components/cartItem";
import Checkout from "./components/checkout";
import { useEffect } from "react";
import { getCartThunk } from "../userThunks";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { userSelector } from "../userSelectors";
import { CartAndWishListPlaceholder } from "components/placeholders/cartAndWishList";
import { loggedInUserSelector } from "features/auth/authSelectors";
import { WarningIconSVG } from "assets/svgComponents/icons";
import Loader from "components/lazyLoader";
import withCountry from "hoc/countryName";
import TranslatedText from "components/translatedText";
interface CartProps {
  countryName?: any;
  countryCode?: any;
}
const Cart = ({ countryName, countryCode }: CartProps) => {
  const dispatch = useAppDispatch();
  const { getCartStatus, removeCartStatus, cart } =
    useAppSelector(userSelector);
  const loggedInUser = useAppSelector(loggedInUserSelector);

  useEffect(() => {
    if (loggedInUser && loggedInUser.token) {
      dispatch(
        getCartThunk({
          body: {
            country_name: countryName,
          },
        })
      )
    }
  }, [loggedInUser]);

  return (
    <Section className="cart-sec">
      <div className="custom-containerfluid">
        <HeadingH2 heading="cart.myCart" />
        {removeCartStatus === "loading" ? (
          <Loader />
        ) : (
          <div className="cart-oter">
            <div className="cartinner-left">
              {getCartStatus === "loading" ? (
                <>
                  <div className="cartiner">
                    <CartAndWishListPlaceholder />
                  </div>
                  <div className="cartiner">
                    <CartAndWishListPlaceholder />
                  </div>
                </>
              ) : cart && cart.items.length > 0 ? (
                cart.items.map((item: any) => (
                  <CartItem key={item.id} item={item} />
                ))
              ) : (
                <div className="whishlist-otr">
                  <div className="warning">
                    <WarningIconSVG />
                    <p>
                      <TranslatedText text="cart.emptyCart" />
                    </p>
                  </div>
                </div>
              )}
            </div>
            {cart.cart_count > 0 ? <Checkout /> : ""}
          </div>
        )}
      </div>
    </Section>
  );
};

const CartWithCountry = withCountry(Cart);
export default CartWithCountry;
