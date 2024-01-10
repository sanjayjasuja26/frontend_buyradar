import { useEffect, useState } from "react";
import StarRatingComponent from "react-star-rating-component";

interface StarRatingProps {
  rate: number,
  editing?: boolean,
  setPropsRating?: (r: number) => void
}

const StarRating = ({ rate, editing, setPropsRating  }: StarRatingProps) => {
  const [rating, setRating] = useState(0) // initial rating value

  useEffect(() => {
    setRating(rate)
  }, [rate])

  const onStarClickHalfStar = (value: any) => {
    setRating(value)
    if(value && setPropsRating) {
      setPropsRating(value)
    }
  };
  return (
    <>
      <StarRatingComponent
        name="app6"
        starColor="#ffb400"
        emptyStarColor="#ffb400"
        value={rating}
        editing={editing}
        onStarClick={onStarClickHalfStar}
        renderStarIcon={(index, value) => {
          return (
            <span style={{ padding: "0 3px" }}>
              <i className={index <= value ? "fas fa-star" : "far fa-star"} />
            </span>
          );
        }}
        renderStarIconHalf={() => {
          return (
            <span style={{ padding: "0 3px" }}>
              <span style={{ position: "absolute" }}>
                <i className="far fa-star" />
              </span>
              <span>
                <i className="fas fa-star-half" />
              </span>
            </span>
          );
        }}
      />
    </>
  );
};

export default StarRating;
