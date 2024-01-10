import { Link } from "globalComponents/elements";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { userSelector } from "features/userAccount/userSelectors";
import { cartCheckoutThunk } from "features/userAccount/userThunks";
import { ButtonLoader } from "globalComponents/loaders";
import TranslatedText from "components/translatedText";

const Checkout = () => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const [totalPrice, setTotalPrice] = useState(0);

  const { getCartStatus, cart, cartCheckOutStatus, cartCheckOutErrorMsg } =
    useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTotalPrice(+cart.total_cost + +cart.shipping_cost);
  }, [cart.total_cost, cart.shipping_cost]);

  return (
    <div className="cartinner-rght">
      {getCartStatus === "idle" && cart ? (
        <>
          <div className="shiping-toal">
            <ul>
              <li>
                <h4>
                  <TranslatedText text="cart.subtotal" />({cart.cart_count}{" "}
                  <TranslatedText text="cart.items" />)
                </h4>
                <h3>
                  {cart?.items[0]?.product?.currency_symbol}{" "}
                  {cart.total_cost.toFixed(2)}
                </h3>
              </li>
              <li>
                <h4>
                  <TranslatedText text="cart.shippingFee" />
                </h4>
                <h3>
                  {cart?.items[0]?.product?.currency_symbol}{" "}
                  {cart.shipping_cost.toFixed(2)}
                </h3>
              </li>
            </ul>
          </div>
          {/* <div className="vochurecode">
							<input type="text" placeholder="Enter voucher code" />
							<button>
							<Link
								onClick={(e) => {
								e.preventDefault();
								// history.push("/");
								}}
								className={
								pathname === "/" ? "nav-link active" : "nav-link"
								}
								href="/"
							>
								Apply
							</Link>
							</button>
						</div> */}
          <div className="totalcart pt-5">
            <ul>
              <li>
                <h4>
                  <TranslatedText text="cart.total" />
                </h4>
                <h3>
                  {cart?.items[0]?.product?.currency_symbol}{" "}
                  {totalPrice.toFixed(2)}
                </h3>
              </li>
            </ul>
          </div>
          {cartCheckOutErrorMsg && cartCheckOutStatus === "failed" ? (
            <span className="input-error-msg">{cartCheckOutErrorMsg}</span>
          ) : null}
          <div className="checkout">
            <Link
              onClick={async (e) => {
                e.preventDefault();
                const { items } = cart;

                let ordered_items = items.map((item: any) => {
                  return {
                    product_id: item.product_id,
                    merchant_id: item.merchant_id,
                    quantity: 1,
                    price: item.price_when_added,
                  };
                });

                let res = await dispatch(
                  cartCheckoutThunk({
                    body: {
                      ordered_items,
                      grand_total: totalPrice,
                      tax: 0,
                      currency_symbol: items[0].product.currency_symbol,
                    },
                  })
                );

                if (res.payload.status_code === 200) {
                  history.push("/");
                }
              }}
              className={pathname === "/" ? "nav-link active" : "nav-link"}
              href="/"
            >
              {cartCheckOutStatus === "loading" ? (
                <ButtonLoader show={cartCheckOutStatus === "loading"} />
              ) : (
                <TranslatedText text="cart.checkOut" />
              )}
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Checkout;
