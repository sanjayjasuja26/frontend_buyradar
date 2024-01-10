import SliderItem from "./sliderItem";
import Slider from "react-slick";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Banner = () => {
  return (
    <section className="banner-sec">
      <div className="bannerslider slider">
        <Slider {...settings}>
          <SliderItem />
          <SliderItem />
          <SliderItem />
          <SliderItem />
        </Slider>
      </div>
    </section>
  );
};

export default Banner;
