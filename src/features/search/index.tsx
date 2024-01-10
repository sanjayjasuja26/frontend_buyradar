import FilterSidebar from "components/filterSidebar";
import { Section } from "globalComponents/elements";
import TrendingContent from "../browse/components/trendingContent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PLATFORM_WEBSITE } from "app/constants";
import { browseProductsThunk } from "../browse/browseThunks";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { viewMoreBrowseProducts } from "../browse/browseSlice";
import withCountry from "hoc/countryName";
import SubscribeNow from "components/subscribeNow";
import { browseProductsSelector } from "../browse/browseSelectors";
import BreadCrumbs from "features/productDetail/components/breadCrumbs";
import TopRated from "components/topRated";
import SuggestedProducts from "components/suggestedProducts";
import { getQueryString } from "utils/helpers";
interface SearchProps {
  countryName?: any;
  countryCode?: any;
}

const Search = ({ countryName, countryCode }: SearchProps) => {
  const location: any = useLocation();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(browseProductsSelector);
  const [search, setSearch] = useState<any>(null);
  const [orderByLowToHigh, setOrderByLowToHigh] = useState(true);
  const [showOrderByFilter, setShowOrderByFilter] = useState(false);
  const [filter, setFilter] = useState(null);
  const [rating, setRating] = useState(-1);
  const [currencySymbol, setCurrencySymbol] = useState("");

  useEffect(() => {
    if (products.length > 0) {
      setCurrencySymbol(products[0].currency_symbol);
    }
  }, [products]);

  useEffect(() => {
    const searchQueryString = getQueryString(location.search, "k");
    if (location?.state?.search_keyword) {
      setSearch(location.state.search_keyword);
    } else if (location.search !== "" && searchQueryString) {
      setSearch(searchQueryString);
    }
    if (rating >= 0 || filter !== null) {
      getProductsHandler({
        search: location?.state?.search_keyword
          ? location.state.search_keyword
          : searchQueryString,
        page: 1,
        isLoadMore: false,
        rating: rating,
        filter,
      });
    }
  }, [filter, rating, location.state, orderByLowToHigh, showOrderByFilter]);

  const getProductsHandler = ({
    search,
    isLocal,
    page,
    isLoadMore,
    filter,
    rating,
    orderBy,
  }: {
    search?: any;
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
      search?: number;
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
    if (search) {
      body["search"] = search;
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
      if (filter.min_price && filter.max_price) {
        body["min_price"] = +filter.min_price;
        body["max_price"] = +filter.max_price;
        body["currency_symbol"] = currencySymbol;
      }
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
      search,
      rating,
      filter,
    });
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
            />
            <div className="homeproducts innerproducts-tabs tab-content">
              <div
                id="trending"
                className={`tab-pane browse-tabbinginner active`}
                role="tablist"
              >
                <BreadCrumbs productDetail={{ search: true }} />
                <TrendingContent viewMoreProducts={viewMoreProductsHandler} />
              </div>
            </div>
          </div>
        </div>
      </Section>
      <TopRated product={products[0]} />
      <SuggestedProducts product={products[0]} />
      <SubscribeNow />
    </>
  );
};
const SearchWithCountry = withCountry(Search);
export default SearchWithCountry;
