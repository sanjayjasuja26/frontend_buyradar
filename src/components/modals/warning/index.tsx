import { useAppDispatch } from "app/hooks";
import TranslatedText from "components/translatedText";
import { removeFromCartThunk } from "features/userAccount/userThunks";
import { Modal } from "react-bootstrap";

const Warning = ({
  show,
  onHide,
  productId,
  merchantId,
}: {
  show: boolean;
  onHide: (a: any) => void;
  productId: number;
  merchantId: number;
}) => {
  const dispatch = useAppDispatch();
  const handleClose = () => onHide(true);

  return (
    <Modal show={show} id="pricemodal" className="target_modal" centered>
      <Modal.Body>
        <p>
          <TranslatedText text="cart.removeFromCartConfirmation" />
        </p>
        <div className="target_btns">
          <button
            onClick={() => {
              dispatch(
                removeFromCartThunk({
                  body: {
                    product_id: productId,
                    merchant_id: merchantId,
                  },
                })
              );
            }}
          >
            <TranslatedText text="cart.yes" />
          </button>
          <button onClick={handleClose}>
            <TranslatedText text="cart.no" />
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Warning;
