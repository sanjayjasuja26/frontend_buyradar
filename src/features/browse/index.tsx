// import FilterSidebar from "components/filterSidebar";
import ShopByTabs from "./components/shopByTabs";
import CategoriesSlider from "components/categoriesSlider";
// import { useAppSelector } from "app/hooks";
import { Section } from "globalComponents/elements";
import TrendingContent from "./components/trendingContent";
import { useEffect, useState, useRef } from "react";
import { getQueryString } from "utils/helpers";
import { useLocation, useHistory } from "react-router-dom";
import { BROWSE_SHOP_BY_LIST, PLATFORM_WEBSITE } from "app/constants";
import { browseProductsThunk } from "./browseThunks";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { viewMoreBrowseProducts } from "./browseSlice";
import withCountry from "hoc/countryName";
import SubscribeNow from "components/subscribeNow";
// import { browseProductsSelector } from "./browseSelectors";
import { loggedInUserSelector } from "features/auth/authSelectors";
import loadable from "@loadable/component";
// import { MIN_PRICE, MAX_PRICE } from "app/constants";
// import useScrollPagination from "hooks/scollPagination";

const FilterSidebar = loadable(
  () =>
    import(
      /*webpackChunkName: "filter-sidebar"*/ "../../components/filterSidebar"
    )
);

interface BrowseProps {
  countryName?: any;
  countryCode?: any;
}
const Browse = ({ countryName, countryCode }: BrowseProps) => {
  const location: any = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(loggedInUserSelector);
  // const browseProductsRef = useRef<HTMLDivElement>(null);
  // const { products } = useAppSelector(browseProductsSelector);
  const shopBy = getQueryString(location.search, "shop-by");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [orderByLowToHigh, setOrderByLowToHigh] = useState(true);
  const [showOrderByFilter, setShowOrderByFilter] = useState(false);
  const [filter, setFilter] = useState(null);
  const [rating, setRating] = useState(-1);

  useEffect(() => {
    if (!shopBy || !BROWSE_SHOP_BY_LIST.includes(shopBy)) {
      history.push("/browse?shop-by=trending");
    }
  }, [shopBy, history]);

  useEffect(() => {
    if (location?.state?.categoryId) {
      setSelectedCategory(location.state.categoryId);
    }
    if (rating >= 0 || filter !== null) {
      getProductsHandler({
        category: location?.state?.categoryId
          ? location?.state?.categoryId
          : selectedCategory,
        isLocal: shopBy === "local" ? true : false,
        page: 1,
        isLoadMore: false,
        rating: rating,
        filter,
      });
    }
  }, [
    filter,
    rating,
    location.state,
    shopBy,
    orderByLowToHigh,
    showOrderByFilter,
  ]);

  // useEffect(() => {
  //   if(location?.state?.categoryId){
  //     setSelectedCategory(location.state.categoryId);
  //     getProductsHandler({
  //       category: location?.state?.categoryId ? location.state.categoryId : selectedCategory,
  //       isLocal: shopBy === "local" ? true : false,
  //       page: 1,
  //       isLoadMore: false,
  //     });
  //   }
  // }, [location.state]);

  const selectCategoryHandler = (id: any) => {
    if (id === selectedCategory) {
      setSelectedCategory(null);
      history.push({
        pathname: location.pathname,
        search: location.search,
        state: {
          categoryId: null,
        },
      });
    } else {
      setSelectedCategory(id);
      history.push({
        pathname: location.pathname,
        search: location.search,
        state: {
          categoryId: id,
        },
      });
    }
  };

  const getProductsHandler = ({
    category,
    isLocal,
    page,
    isLoadMore,
    filter,
    rating,
    orderBy,
  }: {
    category?: any;
    isLocal?: boolean;
    page?: number;
    isLoadMore?: boolean;
    filter?: any;
    rating?: number;
    orderBy?: string;
  }) => {
    let body: {
      page?: number;
      shop_local?: string;
      country_name?: string;
      category_id?: number;
      rating?: number;
      min_price?: number;
      max_price?: number;
      orderByFilter?: string;
      made_in_usa?: string;
      good_deal?: string;
      is_eco?: string;
      orderBy?: string;
    } = {};
    body["platform"] = PLATFORM_WEBSITE;
    body["country_name"] = countryName;
    if (showOrderByFilter) {
      body["orderBy"] = orderByLowToHigh ? "ASC" : "DESC";
      body["orderByFilter"] = "minPrice";
    }
    if (page) {
      body["page"] = page;
    }
    if (category) {
      body["category_id"] = category;
    }
    if (isLocal) {
      body["shop_local"] = countryName;
    }
    if (rating && rating > 0) {
      body["rating"] = rating;
    }
    if (filter) {
      if (filter.made_in_usa) {
        body["made_in_usa"] = "1";
      }
      if (filter.good_deal) {
        body["good_deal"] = "1";
      }
      if (filter.is_eco) {
        body["is_eco"] = "1";
      }
      if (filter.orderByFilter) {
        body["orderByFilter"] = filter.orderByFilter;
      }
      // if (filter.min_price && filter.max_price) {@browse page modifications this check removed to implement default price filter
      body["min_price"] = +filter.min_price;
      body["max_price"] = +filter.max_price;
      body["currency_symbol"] = loggedInUser.selected_currency.sign;
      // }
    }

    if (isLoadMore) {
      dispatch(viewMoreBrowseProducts());
    }
    dispatch(browseProductsThunk({ body }));
  };

  const viewMoreProductsHandler = ({
    isLoadMore,
    page,
  }: {
    isLoadMore: boolean;
    page: number;
  }) => {
    getProductsHandler({
      isLoadMore,
      page,
      category: selectedCategory,
      isLocal: shopBy === "local" ? true : false,
      rating: rating,
      filter,
    });
  };

  const onTabChangeHandler = (tab: string) => {
    // getProductsHandler({
    //   category: selectedCategory,
    //   isLocal: tab === "local" ? true : false,
    //   page: 1,
    //   isLoadMore: false,
    // });
  };

  return (
    <>
      <Section className="homeproducts-filter innerproducts-filter browseproduct-filters">
        <div className="custom-containerfluid">
          <div className="homeproducts-otter">
            <FilterSidebar
              isBrowse={true}
              filter={filter}
              rating={rating}
              setFilter={setFilter}
              setRating={setRating}
              orderByLowToHigh={orderByLowToHigh}
              setOrderByLowToHigh={setOrderByLowToHigh}
              showOrderByFilter={showOrderByFilter}
              setShowOrderByFilter={setShowOrderByFilter}
              country={countryName}
            />
            <div className="homeproducts innerproducts-tabs tab-content">
              <ShopByTabs shopBy={shopBy} onTabChange={onTabChangeHandler} />
              <div
                id="categories"
                className="tab-pane browse-tabbinginner active"
                // role="tablist"
              >
                <CategoriesSlider
                  isHeading={false}
                  slides={5}
                  loaderClassName="width-85"
                  onClickSlideItem={selectCategoryHandler}
                  selectedCategory={selectedCategory}
                />
              </div>
              <div
                id="trending"
                className={`tab-pane browse-tabbinginner active`}
                // className={`tab-pane browse-tabbinginner ${
                //   shopBy === `trending` ? `active` : ``
                // }`}
                role="tablist"
              >
                <TrendingContent viewMoreProducts={viewMoreProductsHandler} />
              </div>
              {/* <div
              id="shop-local"
              className={`tab-pane browse-tabbinginner ${
                shopBy === `local` ? `active` : ``
              }`}
            >
              <ShopLocalContent />
            </div> */}
            </div>
          </div>
        </div>
      </Section>
      <SubscribeNow />
    </>
  );
};
const BrowseWithCountry = withCountry(Browse);
export default BrowseWithCountry;
