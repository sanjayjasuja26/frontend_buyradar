import { useAppSelector } from "app/hooks";
import { productDetailSelector } from "../../productSelectors";
import StarRating from "components/starRating";
import { StarIconYellowIconSVG } from "assets/svgComponents/icons";
import TranslatedText from "components/translatedText";

const Reviews = () => {
  const { productDetail } = useAppSelector(productDetailSelector);
  const { reviews, ratingAvg, reviews_count } = productDetail;

  return (
    <>
      <div className="customerreviews-heading">
        <h3>
          <TranslatedText text="product.customerReviews" />
        </h3>
        {reviews_count > 0 && (
          <ul>
            <li>
              <StarIconYellowIconSVG />
              <h4>
                {ratingAvg} <span>({reviews_count})</span>
              </h4>
            </li>
          </ul>
        )}
      </div>
      {reviews && reviews.length ? (
        reviews.map((review: any, index: number) => (
          <ReviewItem review={review} key={review.id} />
        ))
      ) : (
        <TranslatedText text="product.noReviews" />
      )}
    </>
  );
};
export default Reviews;

const ReviewItem = ({ review }: { review: any }) => {
  const { review_title, review_text, starRate, date, rating } = review;
  // console.log("rating", rating, "starRate", starRate)
  return (
    <div className="customer-reviews">
      <div className="customer-reviewstxt">
        <div className="customername">
          <h3>{review_title}</h3>
          <ul>
            <StarRating rate={starRate} />
          </ul>
        </div>
        <div className="reviewtime">
          <h4>
            {new Date(date).getMinutes()}{" "}
            <TranslatedText text="product.minAgo" />
          </h4>
        </div>
      </div>
      <p>{review_text}</p>
    </div>
  );
};
