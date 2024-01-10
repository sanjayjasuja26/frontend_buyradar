import { useAppDispatch, useAppSelector } from "app/hooks";
import { userSelector } from "features/userAccount/userSelectors";
import { Formik, Form } from "formik";
import { Link } from "globalComponents/elements";
import { ButtonLoader } from "globalComponents/loaders";
import { editProfileSchema } from "utils/validations";
import React, { useState } from "react";
import {
  editProfileThunk,
  getProfileThunk,
} from "features/userAccount/userThunks";
import { isNumberKey, getMaxDate } from "utils/helpers";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";

interface EditProfileFormProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  isEdit,
  setIsEdit,
}) => {
  const { t } = useTranslation();
  const { editProfileStatus, editProfileErrorMsg, user } =
    useAppSelector(userSelector);

  const dispatch = useAppDispatch();
  const [phoneErr, setPhoneErr] = useState("");

  return (
    <>
      <Formik
        initialValues={{
          username: user.username ? user.username : "",
          email: user.email ? user.email : "",
          phone: user.phone ? user.phone : "",
          country_code: user.country_code ? user.country_code : "",
          date_of_birth: user.date_of_birth ? user.date_of_birth : "",
          gender: user.gender ? user.gender : "",
        }}
        validationSchema={editProfileSchema}
        onSubmit={async (values, actions) => {
          if (values.phone === "") {
            setPhoneErr("Please provide phone");
            return;
          }
          if (isEdit) {
            let res = await dispatch(
              editProfileThunk({
                body: { ...values, type: 1 },
              })
            );

            if (res.payload.status_code === 200) {
              dispatch(getProfileThunk());
              setIsEdit(false);
            }
          }
        }}
      >
        {({
          touched,
          errors,
          values,
          status,
          setStatus,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          // console.log(
          //   "value---- in form render phone.length===",
          //   values
          // );
          // console.log("errorrrr", errors)
          return (
            <Form>
              <div className="account-inputfeilds">
                <div className="accuntinput-oter">
                  {values.username === "" && !isEdit ? (
                    ""
                  ) : (
                    <label>{t("account.profile.userName")}</label>
                  )}
                  {isEdit ? (
                    <input
                      type="text"
                      name="username"
                      value={
                        values.username.length >= 0
                          ? values.username
                          : user.username
                      }
                      onChange={handleChange}
                      className={
                        errors.username && touched.username
                          ? "input-error-border"
                          : ""
                      }
                      disabled={true}
                    />
                  ) : (
                    <h3 className="capitalize">{user?.username}</h3>
                  )}
                  {errors.username && touched.username && isEdit && (
                    <span className="input-error-msg">{errors.username}</span>
                  )}
                </div>
                <div className="accuntinput-oter">
                  {values.email === "" && !isEdit ? (
                    ""
                  ) : (
                    <label>{t("account.profile.emailAddress")}</label>
                  )}
                  {isEdit ? (
                    <input
                      type="email"
                      name="email"
                      value={values.email ? values.email : user?.email}
                      onChange={handleChange}
                      className={
                        errors.email && touched.email
                          ? "input-error-border"
                          : ""
                      }
                      disabled={true}
                    />
                  ) : (
                    <h3>{user?.email}</h3>
                  )}
                  {errors.email && touched.email && isEdit && (
                    <span className="input-error-msg">{errors.email}</span>
                  )}
                </div>
                <div className="accuntinput-oter">
                  {values.phone === "" &&
                  values.country_code === "" &&
                  !isEdit ? (
                    ""
                  ) : (
                    <label>{t("account.profile.mobile")}</label>
                  )}
                  {isEdit ? (
                    <PhoneInput
                      country={"us"}
                      enableLongNumbers={true}
                      value={
                        // (values.country_code && values.phone)
                        // ?
                        values.country_code + values.phone
                        // : user?.country_code + user?.phone
                      }
                      onChange={(value, country: any) => {
                        // const validNumberCount = (
                        //   country.format.match(/\./g) || []
                        // ).length;
                        // console.log("value===", value);
                        // // console.log("")
                        // console.log("country.dialCode", country.dialCode);
                        const phone = value.slice(country.dialCode.length);
                        // console.log(
                        //   "phone length ===== after slice",
                        //   phone
                        // );
                        setFieldValue("country_code", country.dialCode);
                        setFieldValue("phone", phone);
                        // console.log("value @onChange---", value);
                        // if (value.length < 6) {
                        //   errors.phone =
                        //     "Mobile should be atleast 6 characters long";
                        // } else if (value.length > 25) {
                        //   errors.phone =
                        //     "Mobile should not be larger than 25 characters long";
                        // }
                        // else if (validNumberCount !== value.length) {
                        //   errors.phone = "Invalid Mobile";
                        // }
                        // else {
                        //   setPhoneErr("");
                        //   errors.phone = "";
                        //   delete errors.phone;
                        // }
                        // setStatus(errors);
                      }}
                      buttonClass={
                        (errors.phone && touched.phone) ||
                        status?.phone ||
                        phoneErr
                          ? "input-error-border"
                          : ""
                      }
                      inputClass={
                        (errors.phone && touched.phone) ||
                        status?.phone ||
                        phoneErr
                          ? "input-error-border"
                          : ""
                      }
                      onKeyDown={(e) => isNumberKey(e)}
                    />
                  ) : (
                    <h3>
                      {user?.country_code ? `+${user.country_code}` : null}{" "}
                      {user?.phone}
                    </h3>
                  )}
                  {((errors.phone && touched.phone) ||
                    status?.phone ||
                    phoneErr) && (
                    <span className="input-error-msg">
                      {errors.phone || status?.phone || phoneErr}
                    </span>
                  )}
                </div>
                <div className="accuntinput-oter">
                  {values.date_of_birth === "" && !isEdit ? (
                    ""
                  ) : (
                    <label>{t("account.profile.birthday")}</label>
                  )}
                  {isEdit ? (
                    <input
                      type="date"
                      name="date_of_birth"
                      value={
                        values.date_of_birth
                          ? values.date_of_birth
                          : user?.date_of_birth
                      }
                      onChange={handleChange}
                      className={
                        errors.date_of_birth && touched.date_of_birth
                          ? "input-error-border"
                          : ""
                      }
                      // min="2014-05-11"
                      max={getMaxDate()}
                    />
                  ) : (
                    <h3>
                      {values.date_of_birth !== "" &&
                        new Date(user?.date_of_birth).toLocaleDateString()}
                    </h3>
                  )}
                  {errors.date_of_birth && touched.date_of_birth && isEdit && (
                    <span className="input-error-msg">
                      {errors.date_of_birth}
                    </span>
                  )}
                </div>
                <div className="accuntinput-oter">
                  {values.gender === "" && !isEdit ? (
                    ""
                  ) : (
                    <label>{t("account.profile.gender")}</label>
                  )}
                  {isEdit ? (
                    <select
                      name="gender"
                      value={values.gender ? values.gender : user?.gender}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFieldValue("gender", e.target.value);
                        }
                      }}
                      className={
                        errors.gender && touched.gender
                          ? "input-error-border"
                          : ""
                      }
                    >
                      <option value="" defaultValue="select-gender">
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  ) : (
                    <h3 className="capitalize">{user?.gender}</h3>
                  )}
                  {errors.gender && touched.gender && isEdit && (
                    <span className="input-error-msg">{errors.gender}</span>
                  )}
                </div>
              </div>
              {isEdit && editProfileStatus === "failed" ? (
                <div className="api-resposne-error-msg">
                  {editProfileErrorMsg}
                </div>
              ) : null}
              <div className="availableshop-btn">
                {/* <Link href="/account" className="addcart-btn" onClick={e => e.preventDefault()}>Change Password</Link> */}
                <Link
                  href="/account"
                  className="buy-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (isEdit) {
                      handleSubmit();
                    } else {
                      setIsEdit(true);
                    }
                  }}
                >
                  {isEdit ? (
                    editProfileStatus === "loading" ? (
                      <ButtonLoader show={editProfileStatus === "loading"} />
                    ) : (
                      "Save Profile"
                    )
                  ) : (
                    "Edit Profile"
                  )}
                </Link>
                {isEdit && (
                  <Link
                    href="/account"
                    className={`${
                      editProfileStatus === "loading"
                        ? "addcart-btn disable-btn"
                        : "addcart-btn"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (editProfileStatus !== "loading") {
                        setIsEdit(false);
                        // dispatch(getProfileThunk());
                      }
                    }}
                  >
                    {`${t("account.profile.cancel")}`}
                  </Link>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default EditProfileForm;
