import FilterSidebar from "components/filterSidebar";
import ProductItem from "components/productListingItem";
import { homeFeedSelector } from "../../homeSelectors";
import { useAppSelector } from "app/hooks";
import { useAppDispatch } from "app/hooks";
import { homeFeedThunk } from "../../homeThunks";
import { viewMoreProducts } from "../../homeSlice";
import { PLATFORM_WEBSITE } from "app/constants";
import { getVisiterId } from "app/fingerprint";
import { ViewMoreBtn } from "globalComponents/themeComponents";
import { useHistory } from "react-router-dom";
import withCountry from "hoc/countryName";
import { ProductLoader } from "components/placeholders/productsListing";
import { WarningIconSVG } from "assets/svgComponents/icons";
import TranslatedText from "components/translatedText";

const Products = ({
  countryName,
  filters,
}: {
  countryName?: string;
  filters?: boolean;
}) => {
  const {
    isMoreProducts,
    products,
    currentProductPage,
    homeFeedStatus,
    isHomeFeedError,
    productPageTotal,
  } = useAppSelector(homeFeedSelector);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const viewMoreProductsHandler = () => {
    dispatch(viewMoreProducts());
    const body = {
      page: currentProductPage + 1,
      country_name: countryName,
      platform: PLATFORM_WEBSITE,
      visitor_id: getVisiterId(),
    };
    dispatch(homeFeedThunk({ body }));
  };

  const onClickHandler = (product: any, merchantId: any) => {
    history.push({
      pathname: `/product/${product.id}`,
      state: {
        title: product.name ? `BuyRadar - ${product.name}` : "BuyRadar",
        merchant: merchantId,
      },
    });
  };

  return (
    <section className="homeproducts-filter">
      <div className="custom-containerfluid">
        <div className="homeproducts-otter">
          {filters && <FilterSidebar isBrowse={false} />}
          <div className="homeproducts position-relative">
            {homeFeedStatus === "loading" && !isHomeFeedError ? (
              <>
                <ProductLoader />
                <div style={{ paddingTop: "40px", width: "100%" }} />
                <ProductLoader />
              </>
            ) : null}
            {homeFeedStatus === "idle" && !isHomeFeedError
              ? products.map((product) => (
                  <ProductItem
                    key={product.unique_id}
                    product={product}
                    onClick={onClickHandler}
                    isWishlistRecommended={false}
                    isProductDetailRecommended={false}
                    isBrowse={false}
                  />
                ))
              : null}
            {isHomeFeedError ? (
              <div className="warning">
                <WarningIconSVG />
                <p>
                  <TranslatedText text="global.somethingWentWrong" /> <br />
                  <TranslatedText text="global.failedToFetch." />
                </p>
              </div>
            ) : null}

            {isMoreProducts ? (
              <>
                <ProductLoader />
                <div style={{ paddingTop: "40px", width: "100%" }} />
                <ProductLoader />
              </>
            ) : null}
            {currentProductPage < productPageTotal ? (
              <ViewMoreBtn
                onClick={(e) => {
                  e.preventDefault();
                  viewMoreProductsHandler();
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
const ProductsWithCountry = withCountry(Products);
export default ProductsWithCountry;
