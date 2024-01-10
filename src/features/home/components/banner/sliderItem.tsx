import { Image, Link } from "globalComponents/elements";
import BannerImage from "assets/images/home/banner-circleimage.png";
import TranslatedText from "components/translatedText";

const SliderItem = () => {
  return (
    <div className="bannerslider-image">
      <div className="custom-container">
        <div className="slide-otr">
          <div className="slidr-img-txt">
            <div className="slide-txt">
              <h5>
                <TranslatedText text="home.deals.dealTextOne" />
              </h5>
              <h6>
                <TranslatedText text="home.deals.dealTextTwo" />
              </h6>
              <p>
                <TranslatedText text="home.deals.dealTextThree" />
                <br /> <TranslatedText text="home.deals.dealTextFour" />
              </p>
              <Link
                href="/create-account"
                className="sldr-btn"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <TranslatedText text="home.deals.getTheApp" />
              </Link>
            </div>
            <div className="slidr-img">
              <Image src={BannerImage} alt="banner-buyradar-banner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
