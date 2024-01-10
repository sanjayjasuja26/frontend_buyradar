import { Image, HeadingH2 } from "globalComponents/elements";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { categoriesThunk } from "features/category/categoryThunk";
import { categoriesSelector } from "features/category/categorySelectors";
import { CategoriesInterface } from "types";
import { reArrangeCategories } from "features/category/categorySlice";
import { CategorySliderLoader } from "components/placeholders/sliderPlaceholder";
import SomethingWentWrong from "components/somethingWentWrong";
import { CategoryImageLoader } from "components/placeholders/image";
import { useLocation, useHistory } from "react-router-dom";
import ViewMoreImg from "assets/images/home/viewmore.png";
import { DefaultProductImage } from "assets/svgComponents/icons";

const CategoriesSlider = ({
  isHeading,
  slides,
  loaderClassName,
  onClickSlideItem,
  selectedCategory,
}: {
  isHeading: boolean;
  slides: number;
  loaderClassName: string;
  onClickSlideItem: (id: any) => void;
  selectedCategory?: any;
}) => {
  const {
    categories,
    categoriesStatus,
    isCategoriesError,
    currentCategoriesLimit,
    currentCategoriesPage,
    categoriesPageTotal,
    categoriesClone,
    categorySearch
  } = useAppSelector(categoriesSelector);
  const dispatch = useAppDispatch();
  const location = useLocation<any>();
  const history = useHistory();
  useEffect(() => {
    if (!categoriesClone.length) {
      dispatch(
        categoriesThunk({
          body: {
            search_keyword: "",
            page: 1,
            per_page: currentCategoriesLimit,
          },
        })
      );
    }
  }, []);

  useEffect(() => {
    if (location && location.state && location.state.categoryId) {
      console.log("selected category----");
      dispatch(reArrangeCategories({ categoryId: location.state.categoryId }));
    }
  }, [categoriesClone.length]);

  const settings = {
    dots: false,
    infinite: !(location.pathname === "/browse"),
    speed: 500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1367,
        settings: {
          slidesToShow: slides ? slides : 4,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: slides ? 4 : 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: slides ? 3 : 2,
        },
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: slides ? 2 : 1,
        },
      },
      {
        breakpoint: 399,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const viewMoreCategoryHandler = () => {
    history.push("/category");
  };

  return (
    <section className="shopcategories-sec">
      {isHeading ? <HeadingH2 heading="home.shobByCategories" /> : null}
      <div className="custom-container">
        {categoriesStatus === "loading" ? (
          <div
            className="categories-slider slider"
          >
            <CategorySliderLoader />
          </div>
        ) : (
          !isCategoriesError &&
          categoriesClone.length && (
            <div className="categories-slider slider" id="browse_cat">
              <Slider {...settings} useTransform={false} slidesToShow={slides}>
                {categoriesClone?.map((item: CategoriesInterface) => (
                  <CategoryItem
                    key={item.id}
                    item={item}
                    onClick={onClickSlideItem}
                    active={selectedCategory === item.id}
                    showImgLoader={true}
                  />
                ))}
                {location.pathname === "/browse" &&
                currentCategoriesPage < categoriesPageTotal ? (
                  <div
                    className="topcollection-oter"
                    onClick={() => viewMoreCategoryHandler()}
                  >
                    <div className="topcollection-image position-relative">
                      <Image src={ViewMoreImg} alt="view-more-categories" />
                    </div>
                  </div>
                ) : null}
              </Slider>
            </div>
          )
        )}
        {categoriesStatus === "failed" && isCategoriesError && (
          <SomethingWentWrong />
        )}
      </div>
    </section>
  );
};

export default CategoriesSlider;

export const CategoryItem = ({
  item,
  onClick,
  active,
  showImgLoader,
  isImgLoading,
}: {
  item: CategoriesInterface;
  onClick: (id: number) => void;
  active?: boolean;
  showImgLoader?: boolean
  isImgLoading?: (loading: boolean) => void
}) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  useEffect(() => {
    isImgLoading && isImgLoading(isImageLoading);
  }, [isImageLoading, isImgLoading])
    
  return (
    <div className="topcollection-oter" onClick={() => onClick(item.id)}>
      <div className={`topcollection-image position-relative`}>
        {
          (isImageLoading) &&
          <CategoryImageLoader showClass={true} /> 
        }
        <Image
          className={active ? "category-active" : ""}
          src={item.category_image_name}
          alt="buyradar_img"
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />
      </div>
      <div className="topcollection-text">
        <h3>{item.category_name}</h3>
      </div>
    </div>
  );
};
