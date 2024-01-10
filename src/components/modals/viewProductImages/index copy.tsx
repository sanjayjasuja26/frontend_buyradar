import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import ReactImageZoom from "react-image-zoom";
import "./zoom.css";
var imgHeight = 0;
var imgWidth = 0;
var wrapperHeight = 0;
var wrapperWidth = 0;
var divPos = {
  left: 0,
  top: 0,
};
var lastX = 0;
var lastY = 0;
var offset = { left: 0, top: 0 };
var zoomedImage;
const getOffset = (element) => {
  if (!element.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  let rect = element.getBoundingClientRect();
  let win = element.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset,
  };
};
interface PropTypes {
  prodctImages: any;
  show: boolean;
  onHide: (a?: any) => void;
  active: number;
  name: string;
}

let img: any;

const ViewProductImages = ({
  show,
  onHide,
  prodctImages,
  active,
  name,
}: PropTypes) => {
  const [activeImage, setActiveImage] = useState(0);
  const [zoomIn, setZoomIn] = useState(false);

  const props = {
    width: 600,
    // height: 500,
    zoomPosition: "original",
    // zoomLensStyle: "width: 50px; background-color: white; opacity: 0.5",
    img: prodctImages[activeImage].image_url,
  };

  // useEffect(() => {
  //   img = document.querySelector('.bigimg-left img');
  // }, [])

  // const handleMove = (e, img) => {
  //   let { offsetX, offsetY, x, y  } = e.nativeEvent;

  //   console.log(e.target.style);

  //   if(zoomIn){
  //     e.target.style.position = 'relative';
  //     e.target.style.left = e.nativeEvent.offsetX + "px";
  //     e.target.style.top = e.nativeEvent.offsetY + "px";
  //     e.target.style.transformOrigin = "center center"
  //   }
  // }

  // const handleClick = (e) => {
  //   if(!zoomIn){
  //     e.target.style.position = 'relative';
  //     e.target.style.left = 0;
  //     e.target.style.top = 0;
  //   }
  // }

  const handleImageProcess = (e, url) => {
    console.log("@handleImageProcess === url", url);
    const zoomedImage = document.getElementById("zoomedImage");
    if (zoomIn === false) {
      let image = new Image();
      image.src = url;
      // image.id = "zoomedImage"
      image.onload = function () {
        // let { height, width} = img
        console.log("onload image ==", image.width, "height", image.height);
        // console.log("height, width", {height, width})
        let zoomWrapper = document.getElementById("zoom-wrapper");
        imgWidth = image.width;
        imgHeight = image.height;
        if (zoomWrapper) {
          wrapperHeight = zoomWrapper?.clientHeight;
          wrapperWidth = zoomWrapper?.clientWidth;
          console.log(
            "wrapperHeight",
            wrapperHeight,
            "wrapperWidth",
            wrapperWidth
          );
          let { left, top } = getOffset(zoomWrapper);
          divPos = {
            left,
            top,
          };
        }
        lastX = e.nativeEvent.pageX;
        lastY = e.nativeEvent.pageY;
        setZoomIn(!zoomIn);

        console.log(
          "zoomWrapper---",
          zoomWrapper?.clientHeight,
          "width",
          zoomWrapper?.clientWidth
        );
        // offset = getOffset(document.getElementById("zoom"));
        // zoomedImage = image
        if (zoomedImage) {
          // zoomedImage.style.transform = `scale(3,3)`;
          zoomedImage.style.position = "relative";
          zoomedImage.style.left = `-${imgWidth/2}px`;
          zoomedImage.style.top = `-${imgHeight/2}px`;
          zoomedImage.style.width = "unset";
          zoomedImage.style.height = "unset";
        }
        console.log("offset =====", offset);
      };
      image.src = url;
    } else {
      setZoomIn(false);
      if (zoomedImage) {
        // zoomedImage.style.transform = `none`;
        zoomedImage.style.width = "100%";
        zoomedImage.style.height = "100%";
      }
    }
  };

  const mouseMoveHandler = (e) => {
    console.log("in mouse move=====", e);
    const zoomedImage = document.getElementById("zoomedImage");
    if (zoomedImage) {
      const { offsetX, offsetY, pageX, pageY, clientX, clientY } =
        e.nativeEvent;
      console.log("divPos", divPos);
      var ratioY = (imgHeight - wrapperHeight) / wrapperHeight;
      var ratioX = (imgWidth - wrapperWidth) / wrapperWidth;
      let ratio = Math.min(ratioX, ratioY);
      let hratio = wrapperHeight / imgHeight;
      var imgLeft = ratioX * -(pageX - lastX);
      var imgTop = ratioY * -(pageY);
      console.log("hratio", hratio);
      console.log("ratioX", ratioX, "ratioY", ratioY);
      console.log(
        "wrapperHeight",
        wrapperHeight,
        "pageY",
        -pageY,
        "imgTop",
        imgTop
      );
      // console.log(
      //   "imgWidth",
      //   imgWidth,
      //   "imgHeight",
      //   imgHeight,
      //   "wrapperWidth",
      //   wrapperWidth,
      //   "wrapperHeight",
      //   wrapperHeight,
      //   "imgLeft",
      //   imgLeft,
      //   "imgTop",
      //   imgTop,
      //   "pageX",
      //   pageX,
      //   "pageY",
      //   pageY
      // );
      zoomedImage.style.position = "relative";
      // // zoomedImage.style.transform = `translate(50%,50%) scale(3,3)`;
      // zoomedImage.style.left = `${imgLeft}px`;
      zoomedImage.style.top = `${imgTop}px`;
      // lastY = pageY;
      // console.log("imgLeft", imgLeft, "imgTop", imgTop);
      // var newX = clientX;
      // var newY = clientY;
      // console.log("newX", newX, "newY", newY);
      // // zoomedImage.style.left = newX/2 + "px";
      // zoomedImage.style.top = -newY + "px";
      // var relX = pageX - divPos.left;
      // var relY = pageY - divPos.top;
      // // zoomedImage.style.left = `${-relX}px`;
      // zoomedImage.style.top = `${-relY}px`;
    }
  };

  return (
    <Modal
      show={show}
      // fullscreen={true}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={onHide}
      id="bigimage"
      className="single_product_modal"
    >
      <div className="modal-header">
        <h4 className="modal-title">{name}</h4>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          onClick={onHide}
        >
          &times;
        </button>
      </div>
      {prodctImages && (
        <div className="modal-body">
          <div className="bigimg-outter">
            <div
              style={{ position: "relative", backgroundColor: "burlywood" }}
              className={`bigimg-left overflow-hidden`}
              id="zoom-wrapper"
            >
              <img
                id="zoomedImage"
                // className="zoomed-image"
                height="100%"
                width="100%"
                src={prodctImages[activeImage].image_url}
                onClick={(e) => {
                  // setZoomIn(!zoomIn);
                  handleImageProcess(e, prodctImages[activeImage].image_url);
                }}
                alt=""
                onMouseMove={(e) => {
                  if (zoomIn) {
                    mouseMoveHandler(e);
                  }
                }}
              />
            </div>
            <div className="bigimg-rght">
              <ul className="single-imagesyabs">
                {prodctImages.map((img: any, index: number) => (
                  <li
                    key={img.id}
                    className={`${index === activeImage ? `active-image` : ``}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveImage(index)}
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
