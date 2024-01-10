import { PlantGreenIcon } from "globalComponents/themeComponents";
import {
  PickupIconYellowSvg,
  ReceiveByYellowIconSVG,
  AddToCartNoBgIconSVG,
  DeleteNoBgIconSVG,
  GreenDownArrowIconSVG,
  RedUpArrowIconSVG,
  AverageIconSVG,
} from "assets/svgComponents/icons";
import { Link, Image } from "globalComponents/elements";
import { removeFromWishListThunk } from "features/home/homeThunks";
import { useAppDispatch } from "app/hooks";
import { useHistory } from "react-router-dom";
import { updateIsWishlist } from "features/productDetail/productSlice";
import TranslatedText from "components/translatedText";

const WishListItem = ({ wish }: { wish: any }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    id,
    product_main_image,
    name,
    deal_type,
    soonest_delivery_date,
    soonest_pickup_date,
    supportLocalEconomy,
    currency_symbol,
    maxPrice,
  } = wish.product;

  const removeFromWishListHandler = async () => {
    let res = await dispatch(
      removeFromWishListThunk({ body: { product_id: id } })
    );

    if (res.payload.status_code === 200) {
      dispatch(updateIsWishlist({ id, isWishlist: false }));
    }
  };

  const addToCartHandler = () => {
    history.push({
      pathname: `/product/${id}`,
      state: { title: name ? `BuyRadar - ${name}` : "BuyRadar" },
    });
  };

  return (
    <div className="cartiner">
      <div className="checkbox-imgtxt">
        <div className="cartimgtxt">
          <div className="cartimg pointer" onClick={() => addToCartHandler()}>
            <Image src={product_main_image} alt="wishlist_item_buyradar" />
          </div>
          {/* <!-- <div className="whisflag-icon">
          <img src="images/home/flag.png">
        </div> --> */}
          <div className="carttxt">
            <div className="cartxt-inr">
              <h3 onClick={() => addToCartHandler()} className="pointer">
                {name}
              </h3>
              {/* <h4>
                By <span>ShopMe</span>
              </h4> */}
            </div>
            {supportLocalEconomy ? (
              <div className="whishplat">
                <PlantGreenIcon />
              </div>
            ) : null}
            <div className="singleitem-price">
              <h3>
                {currency_symbol} {maxPrice ? maxPrice : 0}
              </h3>
              {deal_type === "good" ? (
                <h4 className="gooddeal">
                  <GreenDownArrowIconSVG />{" "}
                  <TranslatedText text="product.goodDeal" />
                </h4>
              ) : deal_type === "bad" ? (
                <h4 className="gooddeal goodreddeal">
                  <RedUpArrowIconSVG />{" "}
                  <TranslatedText text="product.badDeal" />
                </h4>
              ) : (
                <h4 className="gooddeal goodpurpledeal">
                  <AverageIconSVG />
                  {"  "}
                  <TranslatedText text="product.averageDeal" />
                </h4>
              )}
            </div>
            <div className="pick-receive">
              {soonest_pickup_date && (
                <div className="pick-receiveinr">
                  <div className="pickrecevie-img pick-img">
                    <PickupIconYellowSvg />
                    <h3>
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
        </div>
      </div>
      <div className="carticons">
        <div className="del-likeicon">
          <ul>
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  addToCartHandler();
                }}
                href="/move-to-cart"
                className="cart"
              >
                <AddToCartNoBgIconSVG />
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromWishListHandler();
                }}
                href="delete"
                className="del"
              >
                <DeleteNoBgIconSVG />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WishListItem;
