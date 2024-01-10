import ProductItem from "components/productListingItem";
import { HeadingH2 } from "globalComponents/elements";
import { useHistory } from "react-router-dom";

const TopRated = ({ product }) => {
  const history = useHistory();

  return (
    <section className="toprated-sec">
      <div className="custom-container">
        <HeadingH2 heading="Top Rated" />
        {product && (
          <div className="recommendedproducts">
            <ProductItem
              key={product.id}
              product={product}
              onClick={(e) => {
                history.push({
                  pathname: `/product/${product.id}`,
                  state: {
                    title: product.name
                      ? `BuyRadar - ${product.name}`
                      : "BuyRadar",
                  },
                });
              }}
              isWishlistRecommended={false}
              isProductDetailRecommended={false}
              isBrowse={false}
            />
            <ProductItem
              key={product.id}
              product={product}
              onClick={(e) => {
                history.push({
                  pathname: `/product/${product.id}`,
                  state: {
                    title: product.name
                      ? `BuyRadar - ${product.name}`
                      : "BuyRadar",
                  },
                });
              }}
              isWishlistRecommended={false}
              isProductDetailRecommended={false}
              isBrowse={false}
            />
            <ProductItem
              key={product.id}
              product={product}
              onClick={(e) => {
                history.push({
                  pathname: `/product/${product.id}`,
                  state: {
                    title: product.name
                      ? `BuyRadar - ${product.name}`
                      : "BuyRadar",
                  },
                });
              }}
              isWishlistRecommended={false}
              isProductDetailRecommended={false}
              isBrowse={false}
            />
            <ProductItem
              key={product.id}
              product={product}
              onClick={(e) => {
                history.push({
                  pathname: `/product/${product.id}`,
                  state: {
                    title: product.name
                      ? `BuyRadar - ${product.name}`
                      : "BuyRadar",
                  },
                });
              }}
              isWishlistRecommended={false}
              isProductDetailRecommended={false}
              isBrowse={false}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default TopRated;
