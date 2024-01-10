import { Link } from "globalComponents/elements";
import {
  FilterIconSVG,
  HighToLowIconSVG,
  LowToHighIconSVG,
} from "assets/svgComponents/icons";
import StarRatingComponent from "../starRating";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MIN_PRICE, MAX_PRICE } from "app/constants";
interface FilterSidebarProps {
  isBrowse: boolean;
  filter?: any;
  rating?: number | 0;
  showOrderByFilter?: boolean;
  orderByLowToHigh?: boolean;
  setFilter?: (a: any) => void;
  setRating?: (a: number) => void;
  setOrderByLowToHigh?: (a: any) => void;
  setShowOrderByFilter?: (a: any) => void;
  country?: string;
}

const FilterSidebar = ({
  isBrowse,
  filter,
  rating,
  orderByLowToHigh,
  setFilter,
  setRating,
  setOrderByLowToHigh,
  showOrderByFilter,
  setShowOrderByFilter,
  country,
}: FilterSidebarProps) => {
  const [open, setOpen] = useState(true);
  const [priceFilter, setPriceFilter] = useState({
    min_price: MIN_PRICE,
    max_price: MAX_PRICE,
  });
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [err, setErr] = useState("");
  const { t } = useTranslation();

  // commented for now =====
  useEffect(() => {
    if (priceFilter.min_price || priceFilter.max_price) {
      // handlePriceFilter();
      setFilter && setFilter({ ...filter, ...priceFilter });
    }
    // if (!priceFilter.min_price && !priceFilter.max_price) {
    //   debugger
    //   delete filter?.min_price;
    //   delete filter?.max_price;
    //   setFilter && setFilter({ ...filter });
    // }
  }, []);

  const handlePriceFilter = () => {
    // if (
    //   priceFilter.min_price === MIN_PRICE &&
    //   priceFilter.max_price === MAX_PRICE
    // ) {
    setFilter && setFilter({ ...filter, ...priceFilter });
    // setErr("");
    // }
    // else {
    //   setErr("Please provide both fields");
    //   setTimeout(() => {
    //     setErr("");
    //   }, 3000);
    // }
  };
  let priceKey = displayPriceFilterHitKey({
    priceFilter,
    filter,
    isFilterApplied,
  });
  return (
    <div className="homefilters">
      <Link
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        href="#demo"
        className="customclollapsed"
        // data-toggle="collapse"
      >
        <FilterIconSVG />
        {`${t("filters.filters")}`}
      </Link>

      {open ? (
        <div id="demo" className="collapse show">
          <div className="inputs-outer">
            <div className="d-flex align-items-center justify-content-between">
              <h3>{`${t("filters.orderBy")}`}</h3>
              {showOrderByFilter && (
                <div
                  className="pointer"
                  onClick={() => {
                    setOrderByLowToHigh &&
                      setOrderByLowToHigh(!orderByLowToHigh);
                  }}
                >
                  {orderByLowToHigh ? (
                    <LowToHighIconSVG />
                  ) : (
                    <HighToLowIconSVG />
                  )}
                </div>
              )}
            </div>
            <label className="input-text">
              {`${t("filters.price")}`}
              <input
                type="checkbox"
                id="price"
                name="orderBy"
                checked={filter?.orderByFilter === "minPrice" ? true : false}
                onChange={(e) => {
                  setShowOrderByFilter &&
                    setShowOrderByFilter(!showOrderByFilter);
                  if (setFilter) {
                    if (e.target.checked) {
                      setFilter({ ...filter, orderByFilter: "minPrice" });
                    } else {
                      setFilter({ ...filter, orderByFilter: "" });
                    }
                  }
                }}
              />
              <span className="checkmark"></span>
            </label>
            <label className="input-text">
              {`${t("filters.shippingTime")}`}
              <input
                type="checkbox"
                id="shippingTime"
                name="orderBy"
                checked={
                  filter?.orderByFilter === "soonest_delivery_date"
                    ? true
                    : false
                }
                onChange={(e) => {
                  setShowOrderByFilter && setShowOrderByFilter(false);
                  if (setFilter) {
                    if (e.target.checked) {
                      setFilter({
                        ...filter,
                        orderByFilter: "soonest_delivery_date",
                      });
                    } else {
                      setFilter({ ...filter, orderByFilter: "" });
                    }
                  }
                }}
              />
              <span className="checkmark"></span>
            </label>
            <label className="input-text">
              {`${t("filters.pickupTime")}`}
              <input
                type="checkbox"
                id="pickUpTime"
                name="orderBy"
                checked={
                  filter?.orderByFilter === "soonest_pickup_date" ? true : false
                }
                onChange={(e) => {
                  setShowOrderByFilter && setShowOrderByFilter(false);
                  if (setFilter) {
                    if (e.target.checked) {
                      setFilter({
                        ...filter,
                        orderByFilter: "soonest_pickup_date",
                      });
                    } else {
                      setFilter({ ...filter, orderByFilter: "" });
                    }
                  }
                }}
              />
              <span className="checkmark"></span>
            </label>
            {/* <label className="input-text">
            Company Eco-Friendly Meter
            <input type="radio" id="ecoFriendly" disabled={true} name="orderBy" onChange={() => {
              setFilter && setFilter({...filter, orderBy: 'eco_friendly' })
            }} />
            <span className="checkmark"></span>
          </label>
          <label className="input-text">
            Best Deal
            <input type="radio" id="bestDeal" name="orderBy" disabled={true} onChange={() => {
              setFilter && setFilter({...filter, orderBy: 'best_deal' })
            }} />
            <span className="checkmark"></span>
          </label>   */}
          </div>
          {isBrowse && (
            <div className="inputs-outer price-outer">
              <h3>{`${t("filters.priceRange")}`}</h3>
              <div className="price-inputs">
                <input
                  type="text"
                  placeholder={t("filters.min")}
                  value={priceFilter.min_price}
                  onKeyPress={(event) => {
                    var iKeyCode = event.which ? event.which : event.keyCode;
                    if (
                      // iKeyCode != 46 &&
                      iKeyCode > 31 &&
                      (iKeyCode < 48 || iKeyCode > 57)
                    ) {
                      event.preventDefault();
                      return false;
                    } else {
                      return true;
                    }
                  }}
                  onChange={(e) => {
                    let val = +e.target.value;

                    setPriceFilter({
                      ...priceFilter,
                      min_price: val ? val : MIN_PRICE,
                    });

                    if (val > priceFilter.max_price) {
                      setIsFilterApplied(false);
                      setErr(
                        "Min Price should be less than or equal to Max price"
                      );
                    } else {
                      setIsFilterApplied(true);
                      setErr("");
                    }
                  }}
                  className={err ? "input-error-border" : ""}
                />
                <span>-</span>
                <input
                  type="text"
                  placeholder={t("filters.max")}
                  value={priceFilter.max_price}
                  onKeyPress={(event) => {
                    var iKeyCode = event.which ? event.which : event.keyCode;
                    if (
                      // iKeyCode != 46 &&
                      iKeyCode > 31 &&
                      (iKeyCode < 48 || iKeyCode > 57)
                    ) {
                      event.preventDefault();
                      return false;
                    } else {
                      return true;
                    }
                  }}
                  onChange={(e) => {
                    let val = e.target.value;
                    setPriceFilter({
                      ...priceFilter,
                      max_price: +val,
                    });
                    if (+val === 0) {
                      setIsFilterApplied(false);
                      setErr("Max Price can't be 0");
                    }
                    if (+val < priceFilter.min_price) {
                      setIsFilterApplied(false);
                      setErr(
                        "Max Price should be greater than or equal to Min price"
                      );
                    } else {
                      setErr("");
                      setIsFilterApplied(true);
                    }
                  }}
                  className={err ? "input-error-border" : ""}
                />
                {err === "" ? (
                  priceKey === "nothing" ? null : priceKey === "del" ? (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        setPriceFilter({
                          min_price: MIN_PRICE,
                          max_price: MAX_PRICE,
                        });
                        setFilter &&
                          setFilter({
                            ...filter,
                            min_price: MIN_PRICE,
                            max_price: MAX_PRICE,
                          });
                        setErr("");
                        setIsFilterApplied(false);
                      }}
                      href="/set-min-max"
                      className="arrow-button"
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </Link>
                  ) : priceKey === "hit" ? (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        if (err === "") {
                          handlePriceFilter();
                        }
                      }}
                      href="/set-min-max"
                      className="arrow-button"
                    >
                      <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </Link>
                  ) : null
                ) : null}
              </div>
              {err && (
                <small className="api-resposne-error-msg-small">{err}</small>
              )}
            </div>
          )}
          <div className="inputs-outer">
            <h3>{`${t("filters.rating")}`}</h3>
            <ul className="filterrating">
              <StarRatingComponent
                rate={rating ? rating : 0}
                editing={isBrowse ? true : false}
                setPropsRating={setRating}
              />
              {rating && rating > 0 ? (
                <button
                  className="rating-clear-btn"
                  onClick={() => {
                    setRating && setRating(0);
                  }}
                >
                  {`${t("filters.clear")}`}
                </button>
              ) : (
                ""
              )}
            </ul>
          </div>
          {isBrowse && (
            <div className="inputs-outer filter-toggle">
              <div className="homeadressiner">
                <h4>{`${t("filters.ecoFriendly")}`}</h4>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setFilter &&
                        setFilter({ ...filter, is_eco: e.target.checked });
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="homeadressiner">
                <h4>{`${t("filters.madeInUSA")} ${country}`}</h4>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setFilter &&
                        setFilter({ ...filter, made_in_usa: e.target.checked });
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="homeadressiner">
                <h4>{`${t("filters.goodDeal")}`}</h4>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setFilter &&
                        setFilter({ ...filter, good_deal: e.target.checked });
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FilterSidebar;

const displayPriceFilterHitKey = ({ filter, priceFilter, isFilterApplied }) => {
  // console.log(
  //   "displayPriceFilterHitKey filter =====",
  //   filter,
  //   "priceFilter ====",
  //   priceFilter,
  //   "isFilterApplied==",
  //   isFilterApplied
  // );
  if (
    filter &&
    filter.min_price === MIN_PRICE &&
    filter.max_price === MAX_PRICE &&
    !isFilterApplied
  ) {
    // console.log("CHECK 1");
    return "nothing";
  }

  // if (
  //   filter &&
  //   (filter.max_price === priceFilter.max_price ||
  //     filter.min_price === priceFilter.min_price)
  //     // && priceFilter.min_price > 0
  // ) {
  //   console.log("CHECK 2");
  //   return "del";
  // }

  if (
    filter &&
    (filter.max_price !== priceFilter.max_price ||
      filter.min_price !== priceFilter.min_price)
  ) {
    // console.log("CHECK 3");
    return "hit";
  }

  if (
    filter &&
    filter.max_price === priceFilter.max_price &&
    filter.min_price === priceFilter.min_price &&
    isFilterApplied
  ) {
    // console.log("CHECK 2");
    return "del";
  }
};
