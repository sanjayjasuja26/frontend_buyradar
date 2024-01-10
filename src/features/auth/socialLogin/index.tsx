import FacebookLogin from "react-facebook-login";
import LoginWithFbIconImg from "assets/images/login/fb.png";
import { Image, Link } from "globalComponents/elements";
import { useHistory } from "react-router-dom";
import { loginThunk } from "../authThunks";
import { useAppDispatch } from "app/hooks";
import {
  loginType,
  FACEBOOK_APP_ID,
  DEVICE_TYPE_WEB,
  GOOGLE_APP_CLIENT_ID,
} from "app/constants";
import { selectLoginState } from "../authSelectors";
import { useEffect } from "react";
import { useAppSelector } from "app/hooks";
import { GoogleLogin } from "react-google-login";
import { getVisiterId } from "app/fingerprint";
import TranslatedText from "components/translatedText";
interface SocialLoginInterface {
  loginHandler?: (e: any) => void;
}

const SocialLogin = ({}: SocialLoginInterface) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useAppSelector(selectLoginState);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/home");
    }
  }, [isLoggedIn, history]);

  const loginHandler = ({ values }: { values: any }) => {
    let locationData: any = localStorage.getItem("geolocation");
    if (locationData) {
      locationData = JSON.parse(locationData);
    }
    dispatch(
      loginThunk({
        body: {
          ...values,
          visitor_id: getVisiterId(),
          device_type: DEVICE_TYPE_WEB,
          // country_code: "IN",
          // country_name: "India",

          country_code: locationData.countryCode,
          country_name: locationData.country,
          location_longitude: locationData?.longitude.toString(),
          location_latitude: locationData?.latitude.toString(),
        },
      })
    );
    // });
  };

  const facebookLoginHandler = (data: any) => {
    let username: any = {};
    if (data.name) {
      let name = data.name.split(" ");
      if (name[0]) {
        username.first_name = name[0];
        if (name[1]) {
          username.last_name = name[1];
        }
      }
    }
    loginHandler({
      values: {
        email: data.email,
        ...username,
        social_id: data.userID,
        login_type: loginType.LOGIN_WITH_FACEBOOK,
      },
    });
  };

  const googleLoginFailureHandler = (error: any) => {
    console.log("@googleLoginFailureHandler ===error", error);
  };

  const googleLoginSuccess = (data: any) => {
    let username: any = {};
    const { profileObj } = data;
    if (profileObj.givenName || profileObj.familyName) {
      if (profileObj.givenName) {
        username.first_name = profileObj.givenName;
      }
      if (profileObj.familyName) {
        username.last_name = profileObj.familyName;
      }
    } else {
      username.first_name = profileObj.name;
    }

    loginHandler({
      values: {
        email: data.profileObj.email,
        ...username,
        social_id: data.googleId,
        login_type: loginType.LOGIN_WITH_GOOGLE,
      },
    });
  };

  return (
    <>
      <div className="contiue">
        <h3>
          <TranslatedText text="auth.orContinueWith" />
        </h3>
      </div>
      <div className="loginsicons">
        <ul>
          <li>
            <Link
              href="/login-buyradar-with-facebook"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {/* public_profile */}
              <FacebookLogin
                appId={FACEBOOK_APP_ID || ""}
                autoLoad={false}
                fields="name,email,picture"
                cssClass="my-facebook-button-class"
                textButton=""
                icon={
                  <Image
                    src={LoginWithFbIconImg}
                    alt="login-buyradar-with-facebook"
                  />
                }
                callback={facebookLoginHandler}
                scope="public_profile"
              />
            </Link>
          </li>
          <li>
            <Link
              href="/login-buyradar-with-gmail"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <GoogleLogin
                clientId={GOOGLE_APP_CLIENT_ID || ""}
                buttonText=""
                className="google_bttn"
                onSuccess={googleLoginSuccess}
                onFailure={(response: any) => {
                  googleLoginFailureHandler(true);
                }}
                cookiePolicy={"single_host_origin"}
                responseType="code,token"
              />
              {/* <Image
                src={LoginWithGmailIconImg}
                alt="login-buyradar-with-gmail"
              /> */}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SocialLogin;
