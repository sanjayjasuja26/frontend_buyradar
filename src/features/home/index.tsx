import { useEffect } from "react";
import Banner from "./components/banner";
import Products from "./components/products";
import ShopLocal from "./components/shopLocal";
import TopCollections from "./components/topCollections";
import DealOfTheDay from "./components/dealOfTheDay";
// import SubscribeNow from "components/subscribeNow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getVisiterId } from "app/fingerprint";
import { homeFeedThunk } from "./homeThunks";
import { PLATFORM_WEBSITE } from "app/constants";
import withCountry from "hoc/countryName";
import { browseProductsThunk } from "features/browse/browseThunks";
import { browseProductsSelector } from "features/browse/browseSelectors";
import { useTranslation } from "react-i18next";
import loadable from "@loadable/component";

const JustForYou = loadable(
  () => import(/*webpackChunkName: "just-for-you"*/ "./components/justForYou")
);
const ShopByCategories = loadable(
  () =>
    import(
      /*webpackChunkName: "shop-by-categories"*/ "./components/shopByCategories"
    )
);
const ShopByBrands = loadable(
  () =>
    import(/*webpackChunkName: "shop-by-brands"*/ "./components/shopByBrands")
);

const SubscribeNow = loadable(
  () =>
    import(
      /*webpackChunkName: "subscribeNow"*/ "../../components/subscribeNow"
    )
);

const Home = ({ countryName }: { countryName?: string }) => {
  const dispatch = useAppDispatch();
  const {
    products,
    currentProductPage,
    browseProductsStatus,
    isBrowseProductsError,
    browseProductsErrorMsg,
  } = useAppSelector(browseProductsSelector);

  useEffect(() => {
    const body = {
      page: 1,
      country_name: countryName,
      platform: PLATFORM_WEBSITE,
      visitor_id: getVisiterId(),
    };
    dispatch(homeFeedThunk({ body }));
    dispatch(
      browseProductsThunk({
        body: {
          page: currentProductPage,
          platform: PLATFORM_WEBSITE,
          country_name: countryName,
          shop_local: countryName,
        },
      })
    );
  }, [countryName]);
  const { t } = useTranslation();

  return (
    <>
      <Banner />
      <Products filters={false} />
      {browseProductsStatus === "idle" &&
        !isBrowseProductsError &&
        browseProductsErrorMsg === "" &&
        products.length > 0 && <ShopLocal countryName={countryName} />}
      <TopCollections />
      <DealOfTheDay />
      <ShopByCategories />
      <ShopByBrands />
      <JustForYou />
      <SubscribeNow />
    </>
  );
};
const HomeWithCountry = withCountry(Home);
export default HomeWithCountry;
