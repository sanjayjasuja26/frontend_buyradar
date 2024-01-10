import { Formik, Form } from "formik";
import { Link } from "globalComponents/elements";
import { registerValidationSchema } from "utils/validations";
import { useEffect } from "react";
import { selectRegisterState } from "../../authSelectors";
import { useAppSelector } from "app/hooks";
import withCountry from "hoc/countryName";
import { useTranslation } from "react-i18next";

interface RegisterFormProps {
  registerHandler: (a: any) => void;
  countryName: string;
  countryCode: string;
}
const RegisterForm = ({
  registerHandler,
  countryName,
  countryCode,
}: RegisterFormProps) => {
  const { t } = useTranslation();
  const {
    isRegisterSuccess,
    isRegisterStatus,
    isRegisterError,
    registerErrorMsg,
  } = useAppSelector(selectRegisterState);
  useEffect(() => {}, [isRegisterSuccess]);

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      }}
      enableReinitialize={true}
      validationSchema={registerValidationSchema}
      onSubmit={async (values, actions) => {
        registerHandler({
          values: {
            ...values,
            country_code: countryCode,
            country_name: countryName,
          },
          actions,
        });
      }}
    >
      {({ touched, errors, values, handleChange, handleSubmit }) => {
        // console.log("----errors", errors);
        return (
          <Form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          >
            {isRegisterStatus === "failed" ? (
              <div className="api-resposne-error-msg">{registerErrorMsg}</div>
            ) : null}
            {isRegisterSuccess && !isRegisterError ? (
              <div className="api-resposne-success-msg">{registerErrorMsg}</div>
            ) : null}
            <div className="login-form">
              <div className="loginput-otr">
                <div className="logininput username">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    className={
                      errors.username && touched.username
                        ? "input-error-border"
                        : ""
                    }
                  />
                </div>
                {errors.username && touched.username && (
                  <span className="input-error-msg">
                    {t(`auth.validationMsgs.${[errors.username]}`)}
                  </span>
                )}
              </div>
              <div className="loginput-otr">
                <div className="logininput loginemail">
                  <input
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={
                      errors.email && touched.email ? "input-error-border" : ""
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
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
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
              <div className="loginput-otr">
                <div className="logininput loginpass">
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    name="confirm_password"
                    onChange={handleChange}
                    value={values.confirm_password}
                    className={
                      errors.confirm_password && touched.confirm_password
                        ? "input-error-border"
                        : ""
                    }
                  />
                </div>
                {errors.confirm_password && touched.confirm_password && (
                  <span className="input-error-msg">
                    {t(`auth.validationMsgs.${[errors.confirm_password]}`)}
                  </span>
                )}
              </div>
            </div>
            <div
              className="loginbtn"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Link onClick={(e) => e.preventDefault()} href="create-account">
                Create Account
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default withCountry(RegisterForm);
