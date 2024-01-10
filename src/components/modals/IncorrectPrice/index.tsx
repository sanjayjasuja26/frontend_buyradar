import { Modal } from "react-bootstrap";
import { Link } from "globalComponents/elements";
import { isNumberKey } from "utils/helpers";
import { Form, Formik } from "formik";
import { incorrectPriceSchema } from "utils/validations";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { inCorrectPriceThunk } from "features/productDetail/productThunks";
import { productDetailSelector } from "features/productDetail/productSelectors";
import { ButtonLoader } from "globalComponents/loaders";
import { loggedInUserSelector } from "features/auth/authSelectors";
import { toast } from "react-toastify";
import TranslatedText from "components/translatedText";
import { useState, useEffect } from "react";


const InCorrectPrice = ({
  show,
  onHide,
  product_id,
  merchants_product
}: {
  show: boolean;
  onHide: (a: any) => void;
  product_id: number;
  merchants_product: any
}) => {
  const dispatch = useAppDispatch();
  const { targetPriceErrorMsg, targetPriceStatus, inCorrectPriceStatus, inCorrectPriceErrorMsg } = useAppSelector(
    productDetailSelector
  );
  const loggedInUser = useAppSelector(loggedInUserSelector);

  const handleClose = () => {
    onHide(true)
    setErrorMsg("")
  };
  const [errorMsg, setErrorMsg] = useState<String>("");
  return (
    <Modal show={show} onHide={handleClose} id="pricemodal">
      <Modal.Header closeButton>
        <h4 className="modal-title">
          <TranslatedText text="product.reportIncorrectPrice" />
        </h4>
      </Modal.Header>
      <Modal.Body>
        <p>
          <TranslatedText text="product.incorrectPriceNotification" />
        </p>
        <Formik
          initialValues={{
            price: '',
            product_id: product_id,
            merchant_id: merchants_product.length > 0 ? merchants_product[0].merchant_id : merchants_product
          }}
          validationSchema={incorrectPriceSchema}
          onSubmit={async (values, { resetForm }) => {
            if (loggedInUser && loggedInUser.token) {
              const res = await dispatch(
                inCorrectPriceThunk({
                  body: {
                    reported_price: values.price ? Number(values.price) : 0,
                    merchant_id: Number(values.merchant_id),
                    product_id: values.product_id
                  },
                })
              );
              // console.log("res res res ####################",res);
              // console.log("inCorrectPriceStatus @@@@@@@@@@@@@@@", inCorrectPriceStatus);
              // console.log("inCorrectPriceErrorMsg ####################",inCorrectPriceErrorMsg);
              if(inCorrectPriceStatus == 'failed') {
                setErrorMsg(inCorrectPriceErrorMsg)
              }
              if (res.payload.status_code === 200) {
                toast.success(res.payload.message);
                resetForm();
                handleClose();
              }
              if(res.payload.status_code == 400) {
                setErrorMsg(res.payload.message)
              }
            }
          }}
        >
          {({ touched, errors, values, handleChange, handleSubmit }) => (
            <Form>
              <div className="pricerange">
                <div className="price-inputs">
                  <input
                    type="text"
                    placeholder="Insert Correct Price Here"
                    name="price"
                    onChange={handleChange}
                    onKeyDown={(e) => { isNumberKey(e); setErrorMsg("") }}
                    className={
                      errors.price && touched.price ? "input-error-border" : ""
                    }
                    style={{ width: "100%" }}
                  />
                </div>
                {errors && (
                  <span className="input-error-msg">
                    {errors.price || errors.price || errorMsg}
                  </span>
                )}
                <div className="addalert-button">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    href="add-alert"
                  >
                    {inCorrectPriceStatus === "loading" ? (
                      <ButtonLoader show={inCorrectPriceStatus === "loading"} />
                    ) : (
                      "Report"
                    )}
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default InCorrectPrice;
