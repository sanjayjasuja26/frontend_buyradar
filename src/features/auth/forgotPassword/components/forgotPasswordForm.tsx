import { Formik, Form } from "formik";
import { Link } from "globalComponents/elements";
import { useHistory } from "react-router-dom";
import { forgotPasswordValidationSchema } from "utils/validations";
import { useAppSelector } from "app/hooks";
import { selectForgotPasswordState } from "features/auth/authSelectors";
import { ButtonLoader } from "globalComponents/loaders";

interface ForgotPasswordProps {
  forgotPassword: (a: any) => void;
}

const ForgorPasswordForm = ({ forgotPassword }: ForgotPasswordProps) => {
  const history = useHistory();
  const {
    forgotPasswordStatus,
    isForgotPasswordError,
    forgotPasswordErrorMsg,
    isForgotPasswordSuccess,
  } = useAppSelector(selectForgotPasswordState);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: "",
        }}
        validationSchema={forgotPasswordValidationSchema}
        onSubmit={async (values, actions) => {
          forgotPassword({ values, callback: actions });
        }}
      >
        {({ touched, errors, values, handleChange, handleSubmit }) => {
          return (
            <Form>
              {forgotPasswordStatus === "failed" ? (
                <div className="api-resposne-error-msg">
                  {forgotPasswordErrorMsg}
                </div>
              ) : null}
              {isForgotPasswordSuccess && !isForgotPasswordError ? (
                <div className="api-resposne-success-msg">
                  {forgotPasswordErrorMsg}
                </div>
              ) : null}
              <div className="loginput-otr">
                <div className="login-form">
                  <div className="logininput loginemail">
                    <input
                      name="email"
                      type="text"
                      placeholder="Enter email"
                      onChange={handleChange}
                      value={values.email}
                      className={
                        errors.email && touched.email
                          ? "input-error-border"
                          : ""
                      }
                    />
                  </div>
                  {errors.email && touched.email && (
                    <span className="input-error-msg">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="forpass">
                <h4>
                  Already have account?{" "}
                  <Link
                    href="/submit"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/login");
                    }}
                  >
                    Login
                  </Link>
                </h4>
              </div>
              <div
                className={`${
                  forgotPasswordStatus === "loading"
                    ? "loginbtn disable-btn"
                    : "loginbtn disable-btn"
                }`}
                onClick={() => {
                  if (forgotPasswordStatus !== "loading") {
                    handleSubmit();
                  }
                }}
              >
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  href="forgot-password"
                >
                  Submit
                  <ButtonLoader show={forgotPasswordStatus === "loading"} />
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ForgorPasswordForm;
