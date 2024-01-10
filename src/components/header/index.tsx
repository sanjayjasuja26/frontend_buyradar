import TopHeader from "./components/topHeader";
import ShopCategories from "./components/shopCategories";
import AppNavigations from "./components/appNavigations";
import HeaderSearchInput from "./components/headerSearchInput";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { categoriesSelector } from "features/category/categorySelectors";

const Header = () => {
  const [responsiveDropDownIsOpen, setResponsiveDropDownIsOpen] =
    useState(false);

  const location = useLocation();
  const [offset, setOffset] = useState(0);
  const [notificationToggle, setNotificationToggle] = useState(false);
  const { categories } = useAppSelector(categoriesSelector);

  useEffect(() => {
    setNotificationToggle(notificationToggle);
  }, [notificationToggle]);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
      if (window.pageYOffset >= 120 && notificationToggle) {
        setNotificationToggle(false);
      }
    };
  }, [notificationToggle]);

  return (
    <>
      <TopHeader
        offset={offset}
        notificationToggle={notificationToggle}
        setNotificationToggle={setNotificationToggle}
      />
      <div
        className={`navbaroter clearHeader ${
          offset >= 125 ? "darkHeader" : ""
        }`}
      >
        <nav
          className={`navbar navbar-expand-lg customnav ${
            (location.pathname === "/privacy-policy" ||
              location.pathname === "/terms-and-conditions" ||
              location.pathname === "/browse") &&
            "no-category"
          }`}
        >
          <button
            className={
              responsiveDropDownIsOpen
                ? "navbar-toggler"
                : " navbar-toggler collapsed"
            }
            type="button"
            onClick={() => {
              setResponsiveDropDownIsOpen(!responsiveDropDownIsOpen);
            }}
          >
            <span className="navbar-toggler-icon">
              <FaBars />
            </span>
          </button>
          <AppNavigations
            responsiveDropDownIsOpen={responsiveDropDownIsOpen}
            setResponsiveDropDownIsOpen={setResponsiveDropDownIsOpen}
          />
          {location.pathname === "/privacy-policy" ||
          location.pathname === "/terms-and-conditions" ||
          location.pathname === "/browse" ? null : (
            <ShopCategories
              responsiveDropDownIsOpen={responsiveDropDownIsOpen}
            />
          )}
        </nav>
        <div className="searchbar mobile">
          <HeaderSearchInput mode="mobile" />
        </div>
      </div>
    </>
  );
};

export default Header;
