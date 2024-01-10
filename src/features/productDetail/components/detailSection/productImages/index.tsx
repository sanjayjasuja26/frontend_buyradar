import { Image, Link } from "globalComponents/elements";
import { useState } from "react";
import loadable from "@loadable/component";
import ReactImageZoom from "react-image-zoom";
import Slider from "react-slick";

const ViewProductImagesModal = loadable(
  () =>
    import(
      /*  webpackChunkName: "product-image-modal" */
      "../../../../../components/modals/viewProductImages"
    )
);

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1367,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 599,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const ProductImages = ({ images, name }: { images: any; name: string }) => {
  const [active, setActive] = useState(0);
  const [isViewImages, setIsViewImages] = useState(false);
  const onClickTabHandler = (tab: number) => {
    setActive(tab);
  };
  return (
    <div className="singleitem-image">
      <div className="tab-content single-images">
        {images && images.length
          ? images.map((tabPane: any, index: number) => {
              const props = {
                width: 600,
                height: 500,
                zoomWidth: 600,
                zoomLensStyle:
                  "width: 50px; background-color: white; opacity: 0.5",
                img: tabPane.image_url,
              };
              return (
                <div
                  key={tabPane.id}
                  id={`imageView${tabPane.id}`}
                  className={
                    active === index
                      ? `test-cover-fit tab-pane single-imgtab active`
                      : `tab-pane single-imgtab`
                  }
                  onClick={() => {
                    !tabPane.isNoImage && setIsViewImages(true);
                  }}
                >
                  {tabPane.isNoImage ? (
                    <Image src={tabPane.image_url} alt="product_cover_image" />
                  ) : (
                    <ReactImageZoom {...props} />
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div className="single-imagesyabs" role="tablist">
        {images && images.length ? (
          <div className="product-image-slider slider">
            <Slider {...settings} useTransform={false} slidesToShow={4}>
              {images.map((img, index) => (
                <SliderItem
                  key={index}
                  img={img}
                  index={index}
                  onClickTabHandler={onClickTabHandler}
                  active={active}
                />
              ))}
            </Slider>
          </div>
        ) : null}
      </div>
      {images && images.length && isViewImages && (
        <ViewProductImagesModal
          show={isViewImages}
          onHide={() => setIsViewImages(false)}
          prodctImages={images}
          active={active}
          name={name}
        />
      )}
    </div>
  );
};

const SliderItem = ({ index, img, active, onClickTabHandler }) => {
  return (
    <>
      <li
        className={`test-cover-fit nav-item ${
          index === active ? `active` : ``
        }`}
        key={img.id}
      >
        <Link
          onClick={(e) => {
            e.preventDefault();
            onClickTabHandler(index);
          }}
          className="nav-link"
          data-toggle="tab"
          href="product-images"
        >
          <Image src={img.image_url} alt="product_img" />
        </Link>
      </li>
    </>
  );
};

export default ProductImages;
