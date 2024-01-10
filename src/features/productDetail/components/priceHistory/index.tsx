import { useAppSelector } from "app/hooks";
import { productDetailSelector } from "../../productSelectors";
import LineChart from "./lineChart";
import TranslatedText from "components/translatedText";

const PriceHistory = () => {                    
  const { productDetail } = useAppSelector(productDetailSelector);
  const { price_history, currency_symbol } = productDetail;
  return price_history ? (
    <section className="price-history">
      <div className="custom-container">
        <div className="pricehistory-inr">
          <h2>
            <TranslatedText text="product.priceHistory.priceHistory" />
          </h2>
          <div className="pricehistory-price">
            <ul>
              <li>
                <span>
                  {currency_symbol} {(price_history.lowest_price)}
                </span>
                <TranslatedText text="product.priceHistory.lowestPrice" />
              </li>
              <li>
                <span>
                  {currency_symbol} {(price_history.highest_price)}
                </span>
                <TranslatedText text="product.priceHistory.highestPrice" />
              </li>
              <li>
                <span>
                  {currency_symbol} {(price_history.current_price)}
                </span>
                <TranslatedText text="product.priceHistory.currentPrice" />
              </li>
            </ul>
          </div>
          <div className="pricehistory-graph">
            <LineChart
              priceHistory={price_history}
              currency_symbol={currency_symbol}
            />
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default PriceHistory;
