import { Image, HeadingH2 } from "globalComponents/elements";
import Slider from "react-slick";
import { topCollectionList } from "../../mockdata";
import TranslatedText from "components/translatedText";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1201,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },

    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const TopCollections = () => {
  return (
    <section className="topcollection-sec">
      <div className="custom-container">
        <HeadingH2 heading="home.topCollections.topCollections" />
        <div className="collection-slider slider">
          <Slider {...settings}>
            {topCollectionList.map((item, index) => (
              <CollectionItem key={index} item={item} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TopCollections;

export const CollectionItem = ({ item }: { item: any }) => {
  return (
    <div className="topcollection-oter">
      <div className="topcollection-image">
        <Image src={item.imgUrl} alt="buyradar_product" />
      </div>
      <div className="topcollection-text">
        <h3>
          <TranslatedText
            text={`home.topCollections.${item.translatedTextvalue}`}
          />
        </h3>
      </div>
    </div>
  );
};
