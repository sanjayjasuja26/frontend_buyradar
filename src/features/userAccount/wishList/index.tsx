import { HeadingH2, Section } from "globalComponents/elements";
import WishListItem from "components/wishListItem";
import { useEffect } from "react";
import { getWishListThunk } from "features/home/homeThunks";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { wishlistSelector } from "features/home/homeSelectors";
import withCountry from "hoc/countryName";
import RecommendedSlider from "components/recommendedSlider";
import { CartAndWishListPlaceholder } from "components/placeholders/cartAndWishList";
import { loggedInUserSelector } from "features/auth/authSelectors";
import { WarningIconSVG } from "assets/svgComponents/icons";
import { PLATFORM_WEBSITE } from "app/constants";
import TranslatedText from "components/translatedText";

interface WishListPorps {
  countryName: string;
  countryCode?: string;
}

const WishList = ({ countryName }: WishListPorps) => {
  const dispatch = useAppDispatch();
  const {
    wishList,
    // recommended,
    getWishListStatus,
  } = useAppSelector(wishlistSelector);

  const loggedInUser = useAppSelector(loggedInUserSelector);

  useEffect(() => {
    if (loggedInUser && loggedInUser.token) {
      dispatch(
        getWishListThunk({
          body: {
            country_name: countryName,
            platform: PLATFORM_WEBSITE,
          },
        })
      );
    }
  }, [loggedInUser]);

  return (
    <>
      <Section className="whishlistsec">
        <div className="custom-container">
          <HeadingH2 heading="wishlist.myWishlist" />
          <div className="whishlist-otr">
            {getWishListStatus === "loading" ? (
              <>
                <div className="cartiner">
                  <CartAndWishListPlaceholder />
                </div>
                <div className="cartiner">
                  <CartAndWishListPlaceholder />
                </div>
              </>
            ) : (
              <>
                {wishList.length ? (
                  wishList.map((item: any) => (
                    <WishListItem key={item.product_id} wish={item} />
                  ))
                ) : (
                  <div className="warning">
                    <WarningIconSVG />
                    <p>
                      <TranslatedText text="wishlist.noItemsAddedInWishlist" />
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          {/* Recommended Product */}
          <RecommendedSlider
            countryName={countryName}
            className="whishlist-sec"
            isProductDetailRecommended={false}
            isWishlistRecommended={true}
          />
        </div>
      </Section>
    </>
  );
};

export default withCountry(WishList);
