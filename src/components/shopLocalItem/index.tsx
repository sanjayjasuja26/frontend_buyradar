import { Image } from "globalComponents/elements";
import {
  GreenPlantIconSVG,
  WhitePlantIconSVG,
} from "assets/svgComponents/icons";
import FlagIcon from "components/flagIcon";
import withCountry from "hoc/countryName";
import { useHistory } from "react-router-dom";

interface ShopLocalItemProps {
  item: any;
}

interface FlagIconProps {
  countryName?: any;
  countryCode?: any;
}

const ShopLocalItem = ({
  item,
  countryName,
  countryCode,
}: ShopLocalItemProps & FlagIconProps) => {
  const history = useHistory();

  const productDetail = () => {
    history.push({
      pathname: `/product/${item.id}`,
      state: { title: item.name ? `BuyRadar - ${item.name}` : "BuyRadar" },
    });
  };

  return (
    <a
      className="shoplocal-inner"
      // onClick={() => productDetail()}
      href={`/product/${item.id}?title=${
        item.name ? `BuyRadar - ${item.name}` : "BuyRadar"
      }`}
    >
      <div className="shoplocal-bg">
        <div className="shopimageouter">
          <div className="shopimage">
            <Image src={item.product_main_image} alt="buyradar_product" />
          </div>
          <div className="topflag-icon">
            <ul>
              {item.countryOforigin && (
                <li>
                  <FlagIcon
                    countryName={countryName}
                    countryCode={countryCode}
                  />
                </li>
              )}
            </ul>
          </div>
          {/* <div className="top-icons">
            <ul>
              <li>
                <Image src={HeartLikeIconImg} alt="buyradar_product" />
              </li>
            </ul>
          </div> */}
        </div>
        <div className="shoplocal-txt">
          <div className="homeproduct-hdng">
            <h3>{item.name}</h3>
            {item.is_eco === 1 ? (
              <>
                <GreenPlantIconSVG className="wihtouhoverimage" />
                <WhitePlantIconSVG className="hover-img" />
              </>
            ) : (
              ""
            )}
          </div>
          <div className="shoplocal-price">
            <h3>
              {item.minPrice === item.maxPrice
                ? `${item.currency_symbol} ${item.minPrice ? item.minPrice : 0}`
                : `${item.currency_symbol} ${
                    item.minPrice ? item.minPrice : 0
                  } - ${item.currency_symbol} ${
                    item.maxPrice ? item.maxPrice : 0
                  }`}
            </h3>
            <h4>
              {item.currency_symbol}136.00 <span>-20%</span>
            </h4>
          </div>
        </div>
      </div>
    </a>
  );
};

const ShopLocalItemWithCountry = withCountry(ShopLocalItem);
export default ShopLocalItemWithCountry;
