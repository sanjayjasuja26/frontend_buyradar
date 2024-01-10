import ShopLocalItem from "components/shopLocalItem";
import { HeadingH2 } from "globalComponents/elements";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { browseProductsSelector } from "features/browse/browseSelectors";
import { ViewMoreBtn } from "globalComponents/themeComponents";
import ProductsListingPlaceholder from "components/placeholders/productsListing";
import { PLATFORM_WEBSITE } from "app/constants";
import { browseProductsThunk } from "features/browse/browseThunks";
import { viewMoreBrowseProducts } from "features/browse/browseSlice";

const ShopLocal = ({ countryName }: { countryName: string | undefined }) => {
  const {
    products,
    isMoreBrowseProducts,
    totalBrowseProductPages,
    currentProductPage,
  } = useAppSelector(browseProductsSelector);
  const dispatch = useAppDispatch();

  const viewMoreProductsHandler = () => {
    dispatch(viewMoreBrowseProducts());
    const body = {
      page: currentProductPage + 1,
      platform: PLATFORM_WEBSITE,
      country_name: countryName,
      shop_local: countryName,
    };
    dispatch(browseProductsThunk({ body }));
  };

  return (
    <section className="shoplocal-sec">
      <div className="custom-container">
        <HeadingH2 heading="home.shopLocal" />
        <div className="shoplocal-otter">
          {products.map((localItem, index) => (
            <ShopLocalItem item={localItem} key={localItem.id} />
          ))}
          {isMoreBrowseProducts ? (
            <>
              <div style={{ padding: "12px" }} />
              <ProductsListingPlaceholder />
            </>
          ) : null}
          {currentProductPage < totalBrowseProductPages ? (
            <ViewMoreBtn
              onClick={(e) => {
                e.preventDefault();
                viewMoreProductsHandler();
              }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ShopLocal;
