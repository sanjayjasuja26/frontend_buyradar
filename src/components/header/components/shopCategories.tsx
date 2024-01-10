import { useAppDispatch, useAppSelector } from "app/hooks";
import { headerCategorySelector } from "features/home/homeSelectors";
import { headerCategoriesThunk } from "features/home/homeThunks";
import { Link } from "globalComponents/elements";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

interface ShopCategoriesProps {
  responsiveDropDownIsOpen: boolean;
}
const ShopCategories = ({ responsiveDropDownIsOpen }: ShopCategoriesProps) => {

  const history = useHistory();       
  const dispatch = useAppDispatch();
  let { headerCategories, currentHeaderCategoriesLimit, currentHeaderCategoriesPage } = useAppSelector(headerCategorySelector);

  useEffect(() => {            
    if (headerCategories.length === 0) {     
      dispatch(          
        headerCategoriesThunk({     
          body: {
            search_keyword: "",     
            page: currentHeaderCategoriesPage,
            per_page: currentHeaderCategoriesLimit,
          },
        })
      );
    }
  }, [headerCategories.length]);

  return (
    <>
      <div
        className={
          responsiveDropDownIsOpen
            ? "collapse navbar-collapse  navbar2 show shop-navbar"
            : "collapse navbar-collapse  navbar2 shop-navbar"
        }
        id="collapsibleNavbar"
      >
          <div className="custom-container">
            <ul className="navbar-nav">
              {headerCategories.length > 0 &&
                headerCategories.map((category) => (
                  <li className="nav-item" key={`top-header-${category.id}`}>
                    <Link
                      className="nav-link"
                      href="/browse"
                      onClick={(e) => {   
                        e.preventDefault();
                        history.push({
                          pathname: "/browse",
                          search: "?shop-by=trending",
                          state: { categoryId: category.id },
                        });
                      }}
                    >
                      {category.category_name}
                    </Link>
                  </li>
                ))}
                {
                headerCategories.length > 0 &&
                <li className="nav-item">
                  <Link   
                    className="nav-link"
                    href="/category"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/category");
                    }}
                  >
                    All Categories
                  </Link>
                </li>
              }
            </ul>
          </div>
      </div>
    </>
  );
};

export default ShopCategories;
