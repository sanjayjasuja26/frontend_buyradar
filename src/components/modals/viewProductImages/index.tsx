import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

var imgHeight = 0;
var imgWidth = 0;
var wrapperHeight = 0;
var wrapperWidth = 0;
var wrapperBoundingRect = {
  left: 0,
  top: 0,
};
interface PropTypes {
  prodctImages: any;
  show: boolean;
  onHide: (a?: any) => void;
  active: number;
  name: string;
}

const ViewProductImages = ({
  show,
  onHide,
  prodctImages,
  active,
  name,
}: PropTypes) => {
  const [activeImage, setActiveImage] = useState(0);
  const [zoomIn, setZoomIn] = useState(false);
  useEffect(() => {
    let zoomWrapper = document.getElementById("zoom-wrapper");
    if (zoomWrapper) {
      wrapperHeight = zoomWrapper?.clientHeight;
      wrapperWidth = zoomWrapper?.clientWidth;
      const rect = zoomWrapper.getBoundingClientRect();
      wrapperBoundingRect = {
        left: rect.left,
        top: rect.top,
      };
    }
  }, []);

  const handleImageProcess = (e, url) => {
    if (zoomIn === false) {
      let image = new Image();
      image.src = url;
      image.onload = function () {
        const { height, width } = image;
        imgWidth = width;
        imgHeight = height;
        console.log(
          "wrapperHeight",
          wrapperHeight,
          "wrapperWidth",
          wrapperWidth
        );
        console.log("imgHeight", imgHeight, "imgWidth", imgWidth);
        const zoomedImage = document.getElementById("zoomedImage");
        if (imgHeight < wrapperHeight) {
          setZoomIn(false);
        } else {
          setZoomIn(true);
          if (zoomedImage) {
            zoomedImage.style.position = "relative";
            zoomedImage.style.width = "unset";
            zoomedImage.style.height = "unset";
            // set image from its center
            zoomedImage.style.left = `${
              Math.abs(imgWidth - wrapperWidth) / 2
            }px`;
            zoomedImage.style.top = `${-(
              Math.abs(imgHeight - wrapperHeight) / 2
            )}px`;
          }
        }
      };
      image.src = url;
    } else {
      setZoomIn(false);
      resetImage();
    }
  };
  const resetImage = () => {
    const zoomedImage = document.getElementById("zoomedImage");
    if (zoomedImage) {
      zoomedImage.style.position = "unset";
      zoomedImage.style.width = "100%";
      zoomedImage.style.height = "100%";
      imgHeight = 0;
      imgWidth = 0;
    }
  };

  const mouseMoveHandler = (e) => {
    // console.log("in mouse move=====", e);
    const zoomedImage = document.getElementById("zoomedImage");
    if (zoomedImage) {
      var x = e.clientX - wrapperBoundingRect.left;
      var y = e.clientY - wrapperBoundingRect.top;
      var ratioY = (imgHeight - wrapperHeight) / wrapperHeight;
      var ratioX = (imgWidth - wrapperWidth) / wrapperWidth;
      var imgLeft = ratioX * -x;
      var imgTop = ratioY * -y;
      zoomedImage.style.position = "relative";
      zoomedImage.style.left = `${imgLeft}px`;
      zoomedImage.style.top = `${imgTop}px`;
    }
  };

  const onHideHandler = () => {
    resetImage();
    onHide();
  };

  return (
    <Modal
      show={show}
      // fullscreen={true}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={() => onHideHandler()}
      id="bigimage"
      className="single_product_modal"
    >
      <div className="modal-header">
        <h4 className="modal-title">{name}</h4>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          onClick={() => onHideHandler()}
        >
          &times;
        </button>
      </div>
      {prodctImages && (
        <div className="modal-body">
          <div className="bigimg-outter">
            <div
              // style={{ backgroundColor: "burlywood", border: "2px solid blue" }}
              className="bigimg-left overflow-hidden"
              id="zoom-wrapper"
              onMouseMove={(e) => {
                if (zoomIn) {
                  mouseMoveHandler(e);
                }
              }}
            >
              <img
                id="zoomedImage"
                className={zoomIn ? "zoom-out" : "zoom-in"}
                height="100%"
                width="100%"
                src={prodctImages[activeImage].image_url}
                onClick={(e) => {
                  handleImageProcess(e, prodctImages[activeImage].image_url);
                }}
                // src={
                //   "https://cdn.memes.com/meme_images/16460433543750368UntitledMeme.png"
                // }
                // onClick={(e) => {
                //   handleImageProcess(e, "https://cdn.memes.com/meme_images/16460433543750368UntitledMeme.png");
                // }}
                alt=""
              />
            </div>
            <div className="bigimg-rght">
              <ul className="single-imagesyabs">
                {prodctImages.map((img: any, index: number) => (
                  <li
                    key={img.id}
                    className={`${index === activeImage ? `active-image` : ``}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      resetImage();
                      setZoomIn(false);
                      setActiveImage(index);
                    }}
                  >
                    <img src={img.image_url} alt="" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewProductImages;
