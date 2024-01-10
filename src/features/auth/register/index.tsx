import { Link, BuyRadarLogo } from "globalComponents/elements";
import { useHistory } from "react-router-dom";
import RegisterForm from "./components/registerForm";
import { registerThunk } from "../authThunks";
import { useAppDispatch } from "app/hooks";
import SocialLogin from "../socialLogin";
import { DEVICE_TYPE_WEB } from "app/constants";
import { isRegisterLoaderSelector } from "../authSelectors";
import { useAppSelector } from "app/hooks";
import { FullPageLoader } from "globalComponents/loaders";
import { getVisiterId } from "app/fingerprint";
import { refreshErrorMsgs } from "features/auth/authSlice";
import { useEffect } from "react";
import TranslatedText from "components/translatedText";

const Register = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isRegisterLoader = useAppSelector(isRegisterLoaderSelector);

  const registerHandler = ({
    values,
    actions,
  }: {
    values: any;
    actions: any;
  }) => {
    let locationData: any = localStorage.getItem("geolocation");
    if (locationData) {
      locationData = JSON.parse(locationData);
    }
    dispatch(
      registerThunk({
        body: {
          ...values,
          visitor_id: getVisiterId(),
          device_type: DEVICE_TYPE_WEB,
          // country_code: "IN",
          // country_name: "India",

          // country_code: locationData.countryCode,
          // country_name: locationData.country,
          location_longitude: locationData?.longitude.toString(),
          location_latitude: locationData?.latitude.toString(),
        },
        callback: actions,
      })
    );
    // });
  };
  useEffect(() => {
    return () => {
      dispatch(refreshErrorMsgs());
    };
  }, []);

  return (
    <section className="loginsec createaccount-sec">
      {isRegisterLoader ? <FullPageLoader /> : null}
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
          <h2>Create account</h2>
        </div> */}
        <div className="loginoter">
          <div className="login-lft">
            <h3 className="login-hdng">
              <TranslatedText text="auth.fillDetailsCreateNewAccount" />
            </h3>
            <RegisterForm registerHandler={registerHandler} />
            <SocialLogin />
            <div className="registernow">
              <h4>
                <TranslatedText text="auth.alreadyHaveAccount" />{" "}
                <Link
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/login");
                  }}
                >
                  <TranslatedText text="auth.login" />
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
