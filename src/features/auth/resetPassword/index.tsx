import { Image, Link } from "globalComponents/elements";
import LoginBannerImg from "assets/images/login/rightimg.png";
import ResetPasswordForm from "./components/resetPasswordForm";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { resetPasswordThunk } from "../authThunks";
import { useEffect } from "react";
import { getQueryStringEmail } from "utils/helpers";
import { refreshErrorMsgs } from "features/auth/authSlice";
import TranslatedText from "components/translatedText";

interface ResetPasswordProps {}
type UseParamsTypes = {
  token: string;
};

const ResetPassword = ({}: ResetPasswordProps) => {
  const history = useHistory();
  const params = useParams<UseParamsTypes>();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const email = getQueryStringEmail(location.search, "email");
  // const isLoggingLoader = useAppSelector(isLoggingLoaderSelector);

  const resetPasswordHandler = ({
    values,
    actions,
  }: {
    values: any;
    actions: any;
  }) => {
    dispatch(
      resetPasswordThunk({
        body: {
          ...values,
          token: params.token,
        },
        callback: actions,
      })
    );
  };

  useEffect(() => {
    if (!email) {
      history.push("/");
    }
    return () => {
      dispatch(refreshErrorMsgs());
    };
  }, []);

  useEffect(() => {}, []);
  return (
    <section className="loginsec loginsec1">
      <div className="custom-container">
        <div className="heading">
          <h2>
            <TranslatedText text="auth.welcome" />
          </h2>
        </div>
        <div className="loginoter">
          <div className="login-lft">
            <h3 className="login-hdng">
              <TranslatedText text="auth.resetPassword" />
            </h3>
            <ResetPasswordForm
              resetPassword={resetPasswordHandler}
              email={email}
            />
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

export default ResetPassword;
