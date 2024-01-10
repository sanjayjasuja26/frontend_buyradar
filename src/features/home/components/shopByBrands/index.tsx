import { HeadingH2, Image } from "globalComponents/elements";
import Slider from "react-slick";
import { shopBrandsList } from "../../mockdata";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 823,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
};
const ShopByBrands = () => {
  return (
    <section className="shopbrands-sec">
      <div className="custom-container">
        <HeadingH2 heading="home.shopByBrands" />
        <div className="shopbrand-slider slider">
          <Slider {...settings}>
            {shopBrandsList.map((item, index) => (
              <BrandItem key={index} item={item} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ShopByBrands;

const BrandItem = ({ item }: { item: any }) => {
  return (
    <div className="topcollection-oter">
      <div className="topcollection-image">
        <Image src={item.imgUrl} alt="buyradar_img" />
      </div>
    </div>
  );
};
