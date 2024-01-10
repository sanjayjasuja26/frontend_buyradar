// import CutomerReviews from "../reviews";
import SimilarProducts from "../similarProducts";
import { useAppSelector } from "app/hooks";
import { productDetailSelector } from "../../productSelectors";
import { useRef } from "react";
import TranslatedText from "components/translatedText";
import loadable from "@loadable/component";

const CutomerReviews = loadable(
  () => import(/*webpackChunkName: "product-review"*/ "../reviews")
);

const Description = ({ countryName }: { countryName?: string }) => {
  const productDetailRef = useRef<HTMLDivElement>(null);
  const { productDetail } = useAppSelector(productDetailSelector);
  const { description } = productDetail;

  return (
    <section className="productdetail-sec">
      <div className="custom-container">
        <div className="productdetail-otr">
          <div className="productdetaildetail" ref={productDetailRef}>
            <div className="productdetail">
              <h3>
                <TranslatedText text="product.productDetails" />
              </h3>
              {description ? (
                <p>{description}</p>
              ) : (
                <TranslatedText text="global.notAvailable" />
              )}
            </div>
            <CutomerReviews />
          </div>
          <SimilarProducts
            productDetailRef={productDetailRef}
            countryName={countryName}
          />
        </div>
      </div>
    </section>
  );
};

export default Description;
