import { Image, Link, BuyRadarLogo } from "globalComponents/elements";
import LoginBannerImg from "assets/images/login/rightimg.png";
import LoginForm from "./components/loginForm";
import { useHistory } from "react-router-dom";
import { loginThunk } from "../authThunks";
import { loginType, DEVICE_TYPE_WEB } from "app/constants";
import { FullPageLoader } from "globalComponents/loaders";
import { isLoggingLoaderSelector } from "features/auth/authSelectors";
import { getVisiterId } from "app/fingerprint";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { refreshErrorMsgs } from "features/auth/authSlice";
import TranslatedText from "components/translatedText";
import loadable from "@loadable/component";
import { getMyLatLong } from "utils/location";
const SocialLogin = loadable(
  () => import(/* webpackChunkName: "social-login" */ "../socialLogin")
);

const Login = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isLoggingLoader = useAppSelector(isLoggingLoaderSelector);

  const loginHandler = async ({ values }: { values: any }) => {
    let locationData: any = localStorage.getItem("geolocation");
    if (locationData) {
      locationData = JSON.parse(locationData);
    }
    const res = await dispatch(
      loginThunk({
        body: {
          ...values,
          visitor_id: getVisiterId(),
          login_type: loginType.LOGIN_WITH_EMAIL,
          device_type: DEVICE_TYPE_WEB,

          // country_code: locationData.countryCode,
          // country_name: locationData.country,
          location_longitude: locationData?.longitude.toString(),
          location_latitude: locationData?.latitude.toString(),
        },
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(refreshErrorMsgs());
    };
  }, []);

  return (
    <section className="loginsec loginsec1">
      {isLoggingLoader ? <FullPageLoader /> : null}
      <div className="custom-container">
        <div className="loginlogo">
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
        {/* <div className="heading">
          <h2>Welcome!</h2>
        </div> */}
        <div className="loginoter">
          <div className="login-lft">
            <h3 className="login-hdng">
              <TranslatedText text="auth.loginHereToContinue" />
            </h3>
            <LoginForm loginHandler={loginHandler} />
            <SocialLogin />
            <div className="registernow">
              <h4>
                <TranslatedText text="auth.dontHaveAccount" />{" "}
                <Link
                  href="/create-account"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/create-account");
                  }}
                >
                  <TranslatedText text="auth.registerNow" />{" "}
                </Link>
              </h4>
            </div>
          </div>
          <div className="login-rght">
            <Image src={LoginBannerImg} alt="login-buyradar-banner" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
