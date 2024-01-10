import { Formik, Form } from "formik";
import { Link } from "globalComponents/elements";
import { loginValidationSchema } from "utils/validations";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { selectLoginState } from "../../authSelectors";
import { useEffect } from "react";
import withCountry from "hoc/countryName";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  loginHandler: (a: any) => void;
  countryName: string;
  countryCode: string;
}

const InnerForm = ({
  loginHandler,
  countryName,
  countryCode,
}: LoginFormProps) => {
  const history = useHistory();
  const { isLoggedIn, isLoggingStatus, loggingErrorMsg } =
    useAppSelector(selectLoginState);
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/home");
    }
  }, [isLoggedIn, history]);
  const { t } = useTranslation();
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values) => {
          loginHandler({
            values: {
              ...values,
              country_code: countryCode,
              country_name: countryName,
            },
          });
        }}
      >
        {({
          touched,
          errors,
          // isSubmitting,
          // values,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            >
              {isLoggingStatus === "failed" ? (
                <div className="api-resposne-error-msg">{loggingErrorMsg}</div>
              ) : null}
              <div className="login-form">
                <div className="loginput-otr">
                  <div className="logininput loginemail">
                    <input
                      // autoComplete="off"
                      name="email"
                      type="text"
                      placeholder={t("auth.enterEmail")}
                      onChange={handleChange}
                      className={
                        errors.email && touched.email
                          ? "input-error-border"
                          : ""
                      }
                    />
                  </div>
                  {errors.email && touched.email && (
                    <span className="input-error-msg">
                      {t(`auth.validationMsgs.${[errors.email]}`)}
                    </span>
                  )}
                </div>
                <div className="loginput-otr">
                  <div className="logininput loginpass">
                    <input
                      // autoComplete="off"
                      name="password"
                      type="password"
                      placeholder={t("auth.enterPassword")}
                      onChange={handleChange}
                      className={
                        errors.password && touched.password
                          ? "input-error-border"
                          : ""
                      }
                    />
                  </div>
                  {errors.password && touched.password && (
                    <span className="input-error-msg">
                      {t(`auth.validationMsgs.${[errors.password]}`)}
                    </span>
                  )}
                </div>
              </div>
              <div className="forpass">
                <h4>
                  <Link
                    href="/forgot-password"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/forgot-password");
                    }}
                  >
                    {`${t("auth.forgotPassword")}`}
                  </Link>
                </h4>
              </div>
              <div
                className="loginbtn"
                onClick={() => {
                  handleSubmit();
                }}
              >
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  href="login"
                >
                  {`${t("auth.login")}`}
                  {/* <ButtonLoader show={isLoggingStatus === "loading"} /> */}
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default withCountry(InnerForm);
