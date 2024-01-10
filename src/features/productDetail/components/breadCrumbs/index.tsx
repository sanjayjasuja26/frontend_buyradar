import { Link } from "globalComponents/elements";
import { useHistory } from "react-router-dom";
import TranslatedText from "components/translatedText";

const BreadCrumbs = ({ productDetail }: { productDetail: any }) => {
  const history: any = useHistory();

  const { category, search } = productDetail;
  return (
    <div className={`breadcrums ${category ? "detailbreadcrum" : ""}`}>
      <div className="custom-container">
        <ul>
          <li>
            <Link
              href="/home"
              onClick={(e) => {
                e.preventDefault();
                history.push("/");
              }}
            >
              <TranslatedText text="header.home" />
            </Link>
          </li>
          {category && category.category_name ? (
            <li>
              <Link
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
                {category.category_name ? (
                  category.category_name
                ) : (
                  <TranslatedText text="home.categories" />
                )}
              </Link>
            </li>
          ) : null}
          {search && (
            <li>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <TranslatedText text="global.searchResults" />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumbs;
