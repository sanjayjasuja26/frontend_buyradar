import {
  CartIconSVG,
  NotificationIconSVG,
  LogoutIconSVG,
  WishListHeaderIconSVG,
  UserProfileSVG,
} from "assets/svgComponents/icons";
import { Link, BuyRadarLogo } from "globalComponents/elements";
import { useHistory, useLocation } from "react-router-dom";
import HeaderSearchInput from "./headerSearchInput";
import { removeBuyRadarUser } from "utils/helpers";
import { loggedInUserSelector } from "features/auth/authSelectors";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getWishListThunk } from "features/home/homeThunks";
import { useEffect, useRef, useState } from "react";
import withCountry from "hoc/countryName";
import {
  wishListCountSelector,
  isWishlistLoaderSelector,
} from "features/home/homeSelectors";
import { DEVICE_TYPE_WEB, PLATFORM_WEBSITE } from "app/constants";
import { getCartThunk } from "features/userAccount/userThunks";
import { cartCountSelector } from "features/userAccount/userSelectors";
import useOutsideClick from "hoc/closePopup";
import { logoutThunk } from "features/auth/authThunks";
import { removeUser } from "features/auth/authSlice";
import CurrencySelector from "./currencySelector";
import TranslatedText from "components/translatedText";
interface TopHeaderProps {
  countryName: string;
  countryCode?: string;
  offset?: number;
  notificationToggle?: boolean;
  setNotificationToggle?: (a: any) => void;
}
const TopHeader = ({
  countryName,
  offset,
  notificationToggle,
  setNotificationToggle,
}: TopHeaderProps) => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const wishListCount = useAppSelector(wishListCountSelector);
  const cartCount = useAppSelector(cartCountSelector);
  const isWishlistLoader = useAppSelector(isWishlistLoaderSelector);
  const history = useHistory();
  const location = useLocation();
  const profileRef = useRef<any>();
  const notificationRef = useRef<any>();
  const [profileToggle, setProfileToggle] = useState(false);
  const [NotificationPopup, setNotificationPopup] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (loggedInUser && loggedInUser.token) {
      if (location.pathname !== "/cart") {
        dispatch(
          getCartThunk({
            body: {
              country_name: countryName,
            },
          })
        );
      }
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

  useOutsideClick(profileRef, () => {
    setProfileToggle(false);
  });

  useOutsideClick(notificationRef, () => {
    setNotificationToggle && setNotificationToggle(false);
  });

  const logoutHandler = () => {
    dispatch(
      logoutThunk({
        body: {
          device_type: DEVICE_TYPE_WEB,
          device_token: "",
        },
      })
    );
    dispatch(removeUser());
    removeBuyRadarUser();

    // if (PRIVATE_PATHNAMES.includes(location.pathname)) {
    history.replace("/login");
    // }
  };

  return (
    <div className="top-header">
      <div className="custom-containerfluid">
        <div className="toplogo-otter">
          <div className="logo">
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                history.push("/");
              }}
            >
              <BuyRadarLogo />
            </Link>
          </div>
          <div className="searchbar desktop">
            <HeaderSearchInput mode="desktop" offset={offset} />
          </div>
          <div className="header-icons">
            <ul>
              {loggedInUser && loggedInUser.token ? (
                <CurrencySelector loggedInUser={loggedInUser} />
              ) : null}
              {/* <li
                className="dropdown customnoti-dropdown"
                ref={notificationRef}
              >
                <Link
                  href="notifications"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!NotificationPopup) {
                      import("./notificationPopup").then((_) => {
                        setNotificationPopup(() => _.default);
                      });
                    }
                    setNotificationToggle &&
                      setNotificationToggle(!notificationToggle);
                  }}
                >
                  <NotificationIconSVG />
                </Link>
                {notificationToggle && NotificationPopup && (
                  <NotificationPopup />
                )}
              </li> */}
              <li className="topnoti">
                <Link
                  href="/buyradar-wishlist"
                  onClick={(e) => {
                    e.preventDefault();
                    if (loggedInUser && loggedInUser.token) {
                      history.push("/wishlist");
                    } else {
                      history.push({
                        pathname: "/login",
                        state: "wishlist",
                      });
                    }
                  }}
                >
                  <WishListHeaderIconSVG />
                </Link>
                {loggedInUser && loggedInUser.token ? (
                  <>
                    {isWishlistLoader ? null : wishListCount ? ( // <ClipLoader color="#6b4eaf" loading={true} css={override} size={15} />
                      <span>{wishListCount}</span>
                    ) : null}
                  </>
                ) : null}
              </li>
              <li className="topnoti topnoticart">
                <Link
                  href="/buyradar-cart"
                  onClick={(e) => {
                    e.preventDefault();
                    if (loggedInUser && loggedInUser.token) {
                      history.push("/cart");
                    } else {
                      history.push({
                        pathname: "/login",
                        state: "cart",
                      });
                    }
                  }}
                >
                  <CartIconSVG />
                </Link>
                {loggedInUser && loggedInUser.token && cartCount > 0 ? (
                  <span>{cartCount}</span>
                ) : null}
              </li>
              {loggedInUser && loggedInUser.token ? (
                <li className="topnoti userimage" ref={profileRef}>
                  <Link
                    href="/buyradar-user"
                    onClick={(e) => {
                      e.preventDefault();
                      setProfileToggle(!profileToggle);
                    }}
                    className="user-avatar"
                  >
                    <UserProfileSVG />
                  </Link>
                  <div
                    className={
                      profileToggle
                        ? "profile-dropdown"
                        : "profile-dropdown profilehide"
                    }
                  >
                    <ul>
                      <li className="capitalize">
                        <TranslatedText text="header.welcome" />{" "}
                        {loggedInUser.username}!
                      </li>
                      <li>
                        <Link
                          href="/account"
                          onClick={(e) => {
                            e.preventDefault();
                            history.push("/account");
                            setProfileToggle(false);
                          }}
                        >
                          <TranslatedText text="header.profile" />
                        </Link>
                      </li>
                      <li className="header-login">
                        <Link
                          href="/login"
                          onClick={(e) => {
                            e.preventDefault();
                            logoutHandler();
                            setProfileToggle(false);
                          }}
                        >
                          <LogoutIconSVG />
                          <TranslatedText text="header.logout" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li className="header-login">
                  <Link
                    href="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push({
                        pathname: "/login",
                      });
                    }}
                  >
                    LOGIN
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopHeaderWithCountry = withCountry(TopHeader);
export default TopHeaderWithCountry;

//  "@types/react-dom": "^16.9.14",
