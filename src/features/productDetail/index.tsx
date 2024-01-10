import BreadCrumbs from "./components/breadCrumbs";
import DetailSection from "./components/detailSection";
import AvailableOnOtherShops from "./components/availableOnOtherShops";
import PriceHistory from "./components/priceHistory";
// import Description from "./components/description";
import { useEffect, useState, ComponentType } from "react";
import {
  productDetailAfterSetProrityThunk,
  productDetailThunk,
  setPriorityThunk,
} from "./productThunks";
import { useLocation, useParams } from "react-router-dom";
import { getVisiterId } from "app/fingerprint";
import { PLATFORM_WEBSITE } from "app/constants";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { productDetailSelector } from "./productSelectors";
import SubscribeNow from "components/subscribeNow";
import NoProductFound from "components/noProductFound";
import { ImageWithSectionPlaceholder } from "components/placeholders/productDetail";
import withCountry from "hoc/countryName";
interface ProductDetailProps {
  countryName?: any;
  countryCode?: any;
}

interface RecommendedProps {
  countryName: string;
  countryCode?: string;
  className: string;
  isProductDetailRecommended: boolean;
  isWishlistRecommended: boolean;
}

let loadedProductIdPage = 0;

const ProductDetail = ({ countryName }: ProductDetailProps) => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation<any>();

  const dispatch = useAppDispatch();
  const { productDetailStatus, isProductDetailError, productDetail } =
    useAppSelector(productDetailSelector);
  const [Description, setDescription] = useState<ComponentType<{
    countryName: string;
  }> | null>(null);
  const [RecommendedProducts, setRecommendedProducts] =
    useState<ComponentType<RecommendedProps> | null>(null);

  useEffect(() => {
    if (location.search) {
      const title: any = new URLSearchParams(location.search).get("title");
      window.document.title = title;
    }
  }, [location]);

  useEffect(() => {
    // if (location.state) {
    getProductDetail();
  }, [productId, countryName, location.search]);

  const getProductDetail = async () => {
    const merchantId: any = new URLSearchParams(location.search).get(
      "merchant"
    );
    dispatch(
      productDetailThunk({
        body: {
          product_id: +productId,
          country_name: countryName,
          platform: PLATFORM_WEBSITE,
          merchant_id:
            typeof location.search != "undefined" ? merchantId : null,
          visitor_id: getVisiterId(),
        },
      })
    ).then((action) => {
      if (action.type === "product/productDetail/fulfilled") {
        // Description component
        import(
          /*webpackChunkName: "product-description"*/ "./components/description"
        ).then((_) => {
          setDescription(() => _.default);
        });

        // recommended-products component
        import(
          /*webpackChunkName: "recommneded-products"*/ "../../components/recommendedSlider"
        ).then((_) => {
          setRecommendedProducts(() => _.default);
        });
      }
    });
  };

  if (
    productDetailStatus === "idle" &&
    productDetail &&
    Object.keys(productDetail).length
  ) {
    if (productDetail.id > 0 && loadedProductIdPage != productDetail.id) {
      loadedProductIdPage = productDetail.id;
      const unixNow = Math.floor(Date.now() / 1000);
      //console.log("Page loaded 3? " + JSON.stringify(productDetail));
      if (productDetail?.priceLastUpdated < unixNow - 12 * 60 * 60) {
        //console.log("Needs update price!");
        if (productDetail?.original_id > 0) {
          //console.log("Updating price queue");
          dispatch(
            setPriorityThunk({
              body: {
                product_id: +productDetail?.original_id,
              },
            })
          ).then((action) => {
            console.log("Did update price priority, starting reload time 5/15");
            setTimeout(() => {
              console.log("now get detail");
              const merchantId: any = new URLSearchParams(location.search).get(
                "merchant"
              );
              dispatch(
                productDetailAfterSetProrityThunk({
                  body: {
                    product_id: +productId,
                    country_name: countryName,
                    platform: PLATFORM_WEBSITE,
                    merchant_id:
                      typeof location.search != "undefined" ? merchantId : null,
                    visitor_id: getVisiterId(),
                  },
                })
              );

              // getProductDetail();
            }, 15000);
            //START RELOAD PRICE TIMER HERE BELOW
          });
        } else {
          console.log(
            "original id invalid, cancelling price update. oid: " +
              productDetail?.original_id
          );
        }
      }
    }
  }

  return +productId ? (
    <>
      {productDetailStatus === "loading" ? (
        <ImageWithSectionPlaceholder />
      ) : productDetailStatus === "failed" ? (
        <NoProductFound />
      ) : (
        <>
          <BreadCrumbs productDetail={productDetail} />
          <DetailSection />
          {productDetail?.single_product_mode === 0 ? (
            <AvailableOnOtherShops productId={productId} />
          ) : null}
          <PriceHistory />
          {productDetailStatus === "idle" &&
            productDetail &&
            Object.keys(productDetail).length && (
              <>
                {Description && <Description countryName={countryName} />}
                {RecommendedProducts && (
                  <RecommendedProducts
                    className="detailitem-sec"
                    countryName={countryName}
                    isWishlistRecommended={false}
                    isProductDetailRecommended={true}
                  />
                )}
              </>
            )}
          <SubscribeNow />
        </>
      )}
    </>
  ) : (
    <NoProductFound />
  );
};

const ProductDetailWithCountry = withCountry(ProductDetail);
export default ProductDetailWithCountry;
