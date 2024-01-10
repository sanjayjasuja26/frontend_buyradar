import { Formik, Form } from "formik";
import { Link } from "globalComponents/elements";
import { useHistory } from "react-router-dom";
import { resetPasswordSchema } from "utils/validations";
import { useAppSelector } from "app/hooks";
import { selectResetPasswordState } from "features/auth/authSelectors";
import { ButtonLoader } from "globalComponents/loaders";
import { useTranslation } from "react-i18next";

interface ResetPasswordProps {
  resetPassword: (a: any) => void;
  email: string;
}

const ResetPasswordForm = ({ resetPassword, email }: ResetPasswordProps) => {
  const history = useHistory();
  const { t } = useTranslation();
  const {
    resetPasswordStatus,
    isResetPasswordError,
    resetPasswordErrorMsg,
    isResetPasswordSuccess,
  } = useAppSelector(selectResetPasswordState);
  return (
    <>
      <Formik
        initialValues={{
          email: email,
          password: "",
          password_confirmation: "",
        }}
        enableReinitialize={true}
        validationSchema={resetPasswordSchema}
        onSubmit={async (values, actions) => {
          resetPassword({ values, actions });
        }}
      >
        {({ touched, errors, values, handleChange, handleSubmit }) => (
          <Form>
            {resetPasswordStatus === "failed" ? (
              <div className="api-resposne-error-msg">
                {resetPasswordErrorMsg}
              </div>
            ) : null}
            {isResetPasswordSuccess && !isResetPasswordError ? (
              <div className="api-resposne-success-msg">
                {resetPasswordErrorMsg}
              </div>
            ) : null}
            <div className="login-form">
              <div className="loginput-otr">
                <div className="logininput loginemail">
                  <input
                    readOnly
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    onChange={handleChange}
                    value={values.email}
                    className={
                      errors.email && touched.email ? "input-error-border" : ""
                    }
                  />
                  {errors.email && touched.email && (
                    <span className="input-error-msg">{errors.email}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="loginput-otr">
              <div className="logininput loginpass">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  className={
                    errors.password && touched.password
                      ? "input-error-border"
                      : ""
                  }
                />
                {errors.password && touched.password && (
                  <span className="input-error-msg">
                    {t(`auth.validationMsgs.${[errors.password]}`)}
                  </span>
                )}
              </div>
            </div>
            <div className="loginput-otr">
              <div className="logininput loginpass">
                <input
                  type="password"
                  placeholder="Re-enter password"
                  name="password_confirmation"
                  onChange={handleChange}
                  value={values.password_confirmation}
                  className={
                    errors.password_confirmation &&
                    touched.password_confirmation
                      ? "input-error-border"
                      : ""
                  }
                />
                {errors.password_confirmation &&
                  touched.password_confirmation && (
                    <span className="input-error-msg">
                      {t(
                        `auth.validationMsgs.${[errors.password_confirmation]}`
                      )}
                    </span>
                  )}
              </div>
            </div>
            <div className="forpass">
              <h4>
                {t(`auth.alreadyHaveAccount`)}{" "}
                <Link
                  href="/submit"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/login");
                  }}
                >
                  {`${t("auth.login")}`}
                </Link>
              </h4>
            </div>
            <div
              className={`${
                resetPasswordStatus === "loading"
                  ? "loginbtn disable-btn"
                  : "loginbtn"
              }`}
              onClick={() => {
                if (resetPasswordStatus !== "loading") {
                  handleSubmit();
                }
              }}
            >
              <Link
                onClick={(e) => {
                  e.preventDefault();
                }}
                href="reset-password"
              >
                {`${t("global.submit")}`}
                <ButtonLoader show={resetPasswordStatus === "loading"} />
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
