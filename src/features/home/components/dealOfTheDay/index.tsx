import { Link } from "globalComponents/elements";
import TranslatedText from "components/translatedText";

const dealOfTheDay = () => {
  return (
    <section className="florence-sec">
      <div className="custom-container">
        <div className="florance-date">
          <h3>
            <TranslatedText text="home.deals.dealOfTheDay" />
          </h3>
          <ul>
            <li>
              <TranslatedText text="home.deals.01" />
            </li>
            <li>:</li>
            <li>
              <TranslatedText text="home.deals.12" />
            </li>
            <li>:</li>
            <li>
              <TranslatedText text="home.deals.37" />
            </li>
            <li>:</li>
            <li>
              <TranslatedText text="home.deals.44" />
            </li>
          </ul>
          <Link
            onClick={(e) => e.preventDefault()}
            href="shop-now"
            className="shopnow-btn"
          >
            <TranslatedText text="home.deals.shopNow" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default dealOfTheDay;
