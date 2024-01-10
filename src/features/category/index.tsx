import { useAppDispatch, useAppSelector } from "app/hooks";
import { SearchIconSVG, WarningIconSVG } from "assets/svgComponents/icons";
import { CategoryItem } from "components/categoriesSlider";
import { categoriesSelector } from "features/category/categorySelectors";
import { categoriesThunk } from "features/category/categoryThunk";
import { Section, HeadingH2 } from "globalComponents/elements";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { CategoriesInterface } from "types";
import { isElementXPercentInViewport } from "utils/helpers";
import useScrollPagination from "hooks/scollPagination";
import { initialCategoryPage, updateViewMoreCategories } from "./categorySlice";
import withCountry from "hoc/countryName";
import { useTranslation } from "react-i18next";
import { CategoryLoader } from "components/placeholders/categoryList";
interface CategoryInterface {
  countryName: string;
  countryCode?: string;
}

const Category = ({ countryName, countryCode }: CategoryInterface) => {
  const categoryRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const { t } = useTranslation();
  const {
    categories,
    categoriesStatus,
    moreCategoriesStatus,
    categoriesErrorMsg,
    categorySearch,
    isCategoriesError,
    currentCategoriesPage,
    viewMoreCategories,
    categoriesPageTotal,
    currentCategoriesLimit,
  } = useAppSelector(categoriesSelector);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const fetchCategories = useCallback(
    (page: number, search: string = "") => {
      console.log("currentCategoriesLimit=", currentCategoriesLimit);
      dispatch(
        categoriesThunk({
          body: {
            search_keyword: search,
            page,
            per_page: currentCategoriesLimit,
          },
        })
      );
    },
    [dispatch, currentCategoriesLimit]
  );

  useEffect(() => {
    dispatch(initialCategoryPage());
    fetchCategories(1);
    // if (search !== "") {
    //   fetchCategories(1);
    // } else {
    //   fetchCategories(currentCategoriesPage);
    // }
  }, [dispatch, fetchCategories]);

  useScrollPagination({
    products: categories,
    status: categoriesStatus,
    ref: categoryRef,
    currentPage: currentCategoriesPage,
    totalPages: categoriesPageTotal,
    isElementXPercentInViewport,
    viewMore: updateViewMoreCategories,
    Thunk: categoriesThunk,
    ThunkBody: {
      search_keyword: search,
      page: currentCategoriesPage + 1,
      per_page: 10,
    },
    countryName: countryName,
    isViewMoreDispatch: true,
  });

  const onSearchHandler = (value) => {
    // e.preventDefault();
    const checkSpace = new RegExp(/^\s.*\s$/); // Not allow spaces in start and end of string
    if (!checkSpace.test(value)) {
      fetchCategories(1, value.trim());
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => onSearchHandler(search), 575);
    return () => clearTimeout(timeOutId);
  }, [search]);

  return (
    <Section className="category-sec">
      <div className="custom-containerfluid">
        <HeadingH2 heading="home.categories" />
        <div className="text-center">
          <div className="searchbar desktop">
            {/* <HeaderSearchInput mode="desktop" /> */}
            {/* <form onSubmit={(e) => {}}> */}
            <input
              type="text"
              name="search"
              value={search}
              className="form-control"
              placeholder={t("category.searchCategory")}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button type="submit">
              <SearchIconSVG />
            </button>
            {/* </form> */}
          </div>
        </div>
        <div
          id="categories"
          className="tab-pane browse-tabbinginner active my-4"
        >
          <div className="categories-outer">
            {categoriesStatus === "loading" ? (
              <>
                <CategoryLoader />
                <CategoryLoader />
              </>
            ) : categoriesStatus === "idle" && categories.length > 0 ? (
              <>
                {categories.map((item: CategoriesInterface) => (
                  <CategoryItem
                    key={item.id}
                    item={item}
                    onClick={() => {
                      history.push({
                        pathname: "/browse",
                        search: "?shop-by=trending",
                        state: { categoryId: item.id },
                      });
                    }}
                    showImgLoader={true}
                    isImgLoading={setIsImageLoading}
                  />
                ))}
              </>
            ) : (
              ""
            )}
            {(categoriesStatus === "failed" && isCategoriesError) ||
            (categoriesStatus === "idle" && !categories.length) ? (
              <div className="warning">
                <WarningIconSVG />
                <p>
                  {t("global.somethingWentWrong")}
                  <br />
                  {t("category.failedFetchCategoriesReloadPage")}
                </p>
              </div>
            ) : (
              ""
            )}
            {moreCategoriesStatus === "loading" && !isImageLoading ? (
              <>
                <CategoryLoader />
                <CategoryLoader />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {viewMoreCategories && moreCategoriesStatus === "loading" ? (
        ""
      ) : (
        <div ref={categoryRef} />
      )}
    </Section>
  );
};

const CategoryWithCountry = withCountry(Category);
export default CategoryWithCountry;
