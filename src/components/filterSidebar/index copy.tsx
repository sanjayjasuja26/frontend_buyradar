import { Link } from "globalComponents/elements";
import {
  FilterIconSVG,
  HighToLowIconSVG,
  LowToHighIconSVG,
} from "assets/svgComponents/icons";
import StarRatingComponent from "../starRating";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
}: FilterSidebarProps) => {
  const [open, setOpen] = useState(true);
  const [priceFilter, setPriceFilter] = useState({
    min_price: "",
    max_price: "",
  });
  const [err, setErr] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (priceFilter.min_price || priceFilter.max_price) {
      handlePriceFilter();
    }

    if (!priceFilter.min_price && !priceFilter.max_price) {
      delete filter?.min_price;
      delete filter?.max_price;
      setFilter && setFilter({ ...filter });
    }
  }, [priceFilter]);

  const handlePriceFilter = () => {
    if (priceFilter.min_price && priceFilter.max_price) {
      setFilter && setFilter({ ...filter, ...priceFilter });
      setErr("");
    } else {
      setErr("Please provide both fields");
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };

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
                  onChange={(e) => {
                    setPriceFilter({
                      ...priceFilter,
                      min_price: e.target.value,
                    });
                  }}
                  className={err ? "input-error-border" : ""}
                />
                <span>-</span>
                <input
                  type="text"
                  placeholder={t("filters.max")}
                  value={priceFilter.max_price}
                  onChange={(e) => {
                    setPriceFilter({
                      ...priceFilter,
                      max_price: e.target.value,
                    });
                  }}
                  className={err ? "input-error-border" : ""}
                />
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  href="/set-min-max"
                  className="arrow-button"
                >
                  {filter?.max_price || filter?.min_price ? (
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => {
                        setPriceFilter({
                          min_price: "",
                          max_price: "",
                        });
                        delete filter?.min_price;
                        delete filter?.max_price;
                        setFilter && setFilter({ ...filter });
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa fa-chevron-right"
                      aria-hidden="true"
                      onClick={handlePriceFilter}
                    ></i>
                  )}
                </Link>
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
                <h4>{`${t("filters.madeInUSA")}`}</h4>
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
