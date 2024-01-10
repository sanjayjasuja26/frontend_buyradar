import Routes from "app/routes";
import Footer from "components/footer";
import Header from "components/header";
import Loader from "components/lazyLoader";
import { useEffect, useState } from "react";
import generateFingerprint, { getVisiterId } from "app/fingerprint";
import { useAppSelector } from "app/hooks";
import {
  isLoggingLoaderSelector,
  isRegisterLoaderSelector,
  // isUpdatingCurrencySelector,
} from "features/auth/authSelectors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserFromSession } from "features/auth/authSlice";
import { useAppDispatch } from "app/hooks";
import { checkGuestMode, getBuyRadarUser } from "utils/helpers";
import { withRouter, useLocation } from "react-router-dom";
import { NO_HEADER_FOOTER_ROUTES } from "app/constants";
import { geoFindMe, getIPFromAmazon, getMyLatLong } from "utils/location";

function App() {
  const isLoggingLoader = useAppSelector(isLoggingLoaderSelector);
  const isRegisterLoader = useAppSelector(isRegisterLoaderSelector);
  // const isUpdatingCurrencyLoader = useAppSelector(isUpdatingCurrencySelector);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [renderApp, setRenderApp] = useState(false);

  async function fetchMyAPI() {
    let mode = localStorage.getItem("guestMode");
    if (!mode) {
      await checkGuestMode();
      setRenderApp(true);
    } else {
      setRenderApp(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      // geoFindMe();
      getMyLatLong();
    }, 2000);

    fetchMyAPI();
    getIPFromAmazon();

    // getTimeZone()
    const visitorId = getVisiterId();
    if (!visitorId) {
      generateFingerprint();
    }

    // check user from session
    const user = getBuyRadarUser();
    if (user) {
      dispatch(setUserFromSession(user));
    }
  }, []);

  useEffect(() => {
    const prodPath = window.location.pathname.startsWith("/product");
    if (!prodPath) {
      window.document.title = "BuyRadar";
    }
  }, [window.location.pathname]);

  return renderApp ? (
    <div
      className={`body-wrapper ${
        isLoggingLoader || isRegisterLoader ? `body-wrapper-relative` : ``
      }`}
    >
      {NO_HEADER_FOOTER_ROUTES.includes(location.pathname) ? null : <Header />}
      <ToastContainer />
      <Routes />
      {NO_HEADER_FOOTER_ROUTES.includes(location.pathname) ? null : <Footer />}
      {isLoggingLoader || isRegisterLoader ? <div className="overlay" /> : null}
    </div>
  ) : (
    <div className="page-loader">
      <Loader />
    </div>
  );
}

export default withRouter(App);
