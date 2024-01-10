import { Link } from "globalComponents/elements";
import { Formik, Form } from "formik";
import React from "react";
import { addAddressSchema } from "utils/validations";
import { isNumberKey } from "utils/helpers";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { userSelector } from "features/userAccount/userSelectors";
import { ButtonLoader } from "globalComponents/loaders";
import { addAddressThunk } from "features/userAccount/userThunks";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";

const AddAddressForm: React.FC = () => {
  const { addressErrorMsg, addressStatus } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <div className="login-lft">
      <h3 className="login-hdng">
        {t("account.addressBook.fillDetailsForYourHomeAddress")}
      </h3>
      <Formik
        initialValues={{
          address: "",
          address_city: "",
          address_province: "",
          address_zip_code: "",
          // default_billing: 0,
          // default_shipping: 1,
          full_name: "",
          phone: "",
          country_code: "",
        }}
        validateOnChange={true}
        validationSchema={addAddressSchema}
        onSubmit={async (values, { resetForm }) => {
          const res = await dispatch(
            addAddressThunk({
              body: values,
            })
          );

          if (res.payload.status_code === 200) {
            resetForm();
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
        }) => (
          <Form>
            <div className="login-form address-form">
              <div className="logininput username">
                <input
                  type="text"
                  name="full_name"
                  value={values.full_name}
                  onChange={handleChange}
                  placeholder={t("account.addressBook.enterYourName")}
                  className={
                    errors.full_name && touched.full_name
                      ? "input-error-border"
                      : ""
                  }
                />
                {errors.full_name && touched.full_name && (
                  <span className="input-error-msg">{errors.full_name}</span>
                )}
              </div>
              <div className="logininput loginphone">
                <PhoneInput
                  country={"us"}
                  enableLongNumbers={true}
                  placeholder={t("account.addressBook.enterPhone")}
                  value={values.country_code + values.phone}
                  onChange={(value, country: any) => {
                    // const validNumberCount = (country.format.match(/\./g) || [])
                    //   .length;
                    const phone = value.slice(country.dialCode.length);
                    setFieldValue("country_code", country.dialCode);
                    setFieldValue("phone", phone);
                    // if (validNumberCount !== value.length) {
                    //   errors.phone = "Invalid Phone";
                    //   setStatus(errors);
                    // // } else {
                    //   errors.phone = "";
                    //   delete errors.phone;
                    // setStatus(errors);
                    // }
                  }}
                  buttonClass={
                    errors.phone && touched.phone ? "input-error-border" : ""
                  }
                  inputClass={
                    errors.phone && touched.phone ? "input-error-border" : ""
                  }
                  onKeyDown={(e) => isNumberKey(e)}
                />
                {((errors.phone && touched.phone) || status?.phone) && (
                  <span className="input-error-msg">
                    {errors.phone || status?.phone}
                  </span>
                )}
              </div>
              <div className="logininput loginarea">
                <input
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  placeholder={t("account.addressBook.enterAddress")}
                  className={
                    errors.address && touched.address
                      ? "input-error-border"
                      : ""
                  }
                />
                {errors.address && touched.address && (
                  <span className="input-error-msg">{errors.address}</span>
                )}
              </div>

              <div className="logininput logincity">
                <input
                  type="text"
                  name="address_city"
                  value={values.address_city}
                  onChange={handleChange}
                  placeholder={t("account.addressBook.enterCity")}
                  className={
                    errors.address_city && touched.address_city
                      ? "input-error-border"
                      : ""
                  }
                />
                {errors.address_city && touched.address_city && (
                  <span className="input-error-msg">{errors.address_city}</span>
                )}
              </div>
              <div className="logininput loginzip">
                <input
                  type="text"
                  name="address_zip_code"
                  value={values.address_zip_code}
                  onChange={handleChange}
                  minLength={5}
                  onKeyDown={(e) => isNumberKey(e)}
                  placeholder={t("account.addressBook.enterZipCode")}
                  className={
                    errors.address_zip_code && touched.address_zip_code
                      ? "input-error-border"
                      : ""
                  }
                />
                {errors.address_zip_code && touched.address_zip_code && (
                  <span className="input-error-msg">
                    {errors.address_zip_code}
                  </span>
                )}
              </div>
              <div className="logininput loginprovince">
                <input
                  type="text"
                  name="address_province"
                  value={values.address_province}
                  onChange={handleChange}
                  placeholder={t("account.addressBook.enterStateProvince")}
                  className={
                    errors.address_province && touched.address_province
                      ? "input-error-border"
                      : ""
                  }
                />
                {errors.address_province && touched.address_province && (
                  <span className="input-error-msg">
                    {errors.address_province}
                  </span>
                )}
              </div>
            </div>
            {/* <div className="homeadress-toggle">
                                <div className="homeadressiner">
                                    <h4>Make default shipping address</h4>
                                    <label className="switch">
                                        <input 
                                            name='default_shipping'
                                            value={values.default_shipping}
                                            onChange={e => {
                                                let val: number;
                                                if(e.target.checked === true){
                                                    val = 1;
                                                } else {
                                                    val = 0;
                                                }
                                                setFieldValue('default_shipping', val)
                                            }}
                                            type="checkbox"
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <div className="homeadressiner">
                                    <h4>Make default billing address</h4>
                                    <label className="switch">
                                        <input
                                            name='default_billing'
                                            value={values.default_billing}
                                            onChange={e => {
                                                let val: number;
                                                if(e.target.checked === true){
                                                    val = 1;
                                                } else {
                                                    val = 0;
                                                }
                                                setFieldValue('default_billing', val)
                                            }}
                                            type="checkbox" 
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div> */}
            {addressStatus === "failed" ? (
              <div className="api-resposne-error-msg">{addressErrorMsg}</div>
            ) : null}
            <div className="loginbtn">
              <Link
                href="/account"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {addressStatus === "loading" ? (
                  <ButtonLoader show={addressStatus === "loading"} />
                ) : (
                  `${t("account.addressBook.save")}`
                )}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAddressForm;
