import ProductItem from "components/productListingItem";
import { Section } from "globalComponents/elements";
import { useHistory } from "react-router-dom";
// import SliderPlaceholder from "components/placeholders/sliderPlaceholder";
// import ProductsListingPlaceholder from "components/placeholders/productsListing";
import { recommendedProductsThunk } from "features/productDetail/productThunks";
import { recommendedProductsSelector } from "features/productDetail/productSelectors";
import { updateViewMoreRecommendedPrducts } from "features/productDetail/productSlice";
import { isElementXPercentInViewport } from "utils/helpers";
import useScrollPagination from "hooks/scollPagination";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useRef } from "react";
// import withCountry from "hoc/countryName";
import { PLATFORM_WEBSITE } from "app/constants";
import { ProductLoader } from "components/placeholders/productsListing";
import SomethingWentWrong from "components/somethingWentWrong";
import TranslatedText from "components/translatedText";
interface RecommendedProps {
  countryName: string;
  countryCode?: string;
  className: string;
  isProductDetailRecommended: boolean;
  isWishlistRecommended: boolean;
}

const RecommendedProducts = ({
  countryName,
  className,
  isProductDetailRecommended,
  isWishlistRecommended,
}: RecommendedProps) => {
  const recommendedRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const dispatch = useAppDispatch();
  const {
    recommendedProducts,
    isRecommendedProductsError,
    recommendedProductsStatus,
    currentRecommendedProductsPage,
    recommendedProductsPageTotal,
    viewMoreRecommendedProducts,
  } = useAppSelector(recommendedProductsSelector);

  useEffect(() => {
    dispatch(
      recommendedProductsThunk({
        body: {
          platform: PLATFORM_WEBSITE,
          page: currentRecommendedProductsPage,
          country_name: countryName,
        },
      })
    );
  }, []);

  // scroll hook for pagination

  useScrollPagination({
    products: recommendedProducts,
    status: recommendedProductsStatus,
    ref: recommendedRef,
    currentPage: currentRecommendedProductsPage,
    totalPages: recommendedProductsPageTotal,
    isElementXPercentInViewport,
    viewMore: updateViewMoreRecommendedPrducts,
    Thunk: recommendedProductsThunk,
    ThunkBody: null,
    countryName: countryName,
    isViewMoreDispatch: true,
  });

  return (
    <Section className={`toprated-sec ${className}`}>
      <div className="custom-container">
        <div className="heading">
          <h2>
            <TranslatedText text="product.recommended" />
          </h2>
        </div>
        <div className="recommendedproducts">
          {recommendedProductsStatus === "loading" &&
          !isRecommendedProductsError ? (
            <>
              <ProductLoader />
              <div style={{ paddingTop: "40px", width: "100%" }} />
              <ProductLoader />
            </>
          ) : null}
          {recommendedProductsStatus === "failed" &&
          isRecommendedProductsError ? (
            <SomethingWentWrong />
          ) : null}
          {!isRecommendedProductsError && recommendedProducts?.length > 0
            ? recommendedProducts.map((product: any, index: number) => {
                return (
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
                    isWishlistRecommended={isWishlistRecommended}
                    isProductDetailRecommended={isProductDetailRecommended}
                    isBrowse={false}
                  />
                );
              })
            : null}
          {viewMoreRecommendedProducts ? (
            <>
              <ProductLoader />
              <div style={{ paddingTop: "40px", width: "100%" }} />
              <ProductLoader />
            </>
          ) : null}
        </div>
      </div>
      {
        viewMoreRecommendedProducts ? '' :
        <div ref={recommendedRef} />
      }
    </Section>
  );
};

// export default withCountry(RecommendedProducts);
export default RecommendedProducts;
