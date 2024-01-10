import { Image, Link } from "globalComponents/elements";
import LoginBannerImg from "assets/images/login/rightimg.png";
import ForgotPasswordForm from "./components/forgotPasswordForm";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { forgotPasswordThunk } from "../authThunks";
import { refreshErrorMsgs } from "features/auth/authSlice";
import { useEffect } from "react";


const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const forgotPasswordHandler = ({
    values,
    callback,
  }: {
    values: any;
    callback: any;
  }) => {
    dispatch(
      forgotPasswordThunk({
        body: {
          ...values,
        },
        callback,
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
      <div className="custom-container">   
        <div className="heading">
          <h2>Welcome!</h2>
        </div>
        <div className="loginoter">
          <div className="login-lft">
            <h3 className="login-hdng">Enter registered email</h3>
            <ForgotPasswordForm forgotPassword={forgotPasswordHandler} />
            <div className="registernow">
              <h4>
                Don't have an account?{" "}
                <Link
                  href="/create-account"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/create-account");
                  }}
                >      
                  Register now{" "}
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

export default ForgotPassword;
