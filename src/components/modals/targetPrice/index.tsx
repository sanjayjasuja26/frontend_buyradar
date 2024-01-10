import { Modal } from "react-bootstrap";
import { Link } from "globalComponents/elements";
import { isNumberKey } from "utils/helpers";
import { Form, Formik } from "formik";
import { targetPriceSchema } from "utils/validations";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { targetPriceThunk } from "features/productDetail/productThunks";
import { productDetailSelector } from "features/productDetail/productSelectors";
import { ButtonLoader } from "globalComponents/loaders";
import { loggedInUserSelector } from "features/auth/authSelectors";
import { toast } from "react-toastify";
import TranslatedText from "components/translatedText";

const TargetPrice = ({
  show,
  onHide,
  productId,
}: {
  show: boolean;
  onHide: (a: any) => void;
  productId: number;
}) => {
  const dispatch = useAppDispatch();
  const { targetPriceErrorMsg, targetPriceStatus } = useAppSelector(
    productDetailSelector
  );
  const loggedInUser = useAppSelector(loggedInUserSelector);

  const handleClose = () => onHide(true);

  return (
    <Modal show={show} onHide={handleClose} id="pricemodal">
      <Modal.Header closeButton>
        <h4 className="modal-title">
          <TranslatedText text="product.addTargetPrice" />
        </h4>
      </Modal.Header>
      <Modal.Body>
        <p>
          <TranslatedText text="product.addYourTargetPriceForNotification" />
        </p>
        <Formik
          initialValues={{
            min: "0",
            max: "",
          }}
          validationSchema={targetPriceSchema}
          onSubmit={async (values, { resetForm }) => {
            if (loggedInUser && loggedInUser.token) {
              const res = await dispatch(
                targetPriceThunk({
                  body: {
                    target_price_min: values.min ? Number(values.min) : 0,
                    target_price_max: Number(values.max),
                    product_id: productId,
                  },
                })
              );

              if (res.payload.status_code === 200) {
                toast.success(res.payload.message);
                resetForm();
                handleClose();
              }
            }
          }}
        >
          {({ touched, errors, values, handleChange, handleSubmit }) => (
            <Form>
              <div className="pricerange">
                <h3>
                  <TranslatedText text="product.priceRange" />
                </h3>
                <div className="price-inputs">
                  <input
                    type="text"
                    placeholder="Min"
                    name="min"
                    value=""
                    onChange={handleChange}
                    onKeyDown={(e) => isNumberKey(e)}
                    className={
                      errors.min && touched.min ? "input-error-border" : ""
                    }
                  />
                  <span>-</span>
                  <input
                    type="text"
                    placeholder="Max"
                    name="max"
                    value={values.max}
                    onChange={handleChange}
                    onKeyDown={(e) => isNumberKey(e)}
                    className={
                      errors.max && touched.max ? "input-error-border" : ""
                    }
                  />
                </div>
                {errors && (
                  <span className="input-error-msg">
                    {errors.min || errors.max || targetPriceErrorMsg}
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
                    {targetPriceStatus === "loading" ? (
                      <ButtonLoader show={targetPriceStatus === "loading"} />
                    ) : (
                      "Add Alert"
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

export default TargetPrice;
