import { Link, NavListItem, NavList } from "globalComponents/elements";
import { useHistory } from "react-router-dom";
import TranslatedText from "components/translatedText";

const ShopByTabs = ({
  shopBy,
  onTabChange,
}: {
  shopBy: string | null;
  onTabChange: (tab: string) => void;
}) => {
  const history = useHistory();
  return (
    <NavList className="nav nav-tabs">
      <NavListItem className="nav-item">
        <Link
          className={`nav-link ${shopBy === "trending" ? `active` : ``}`}
          href="shop-by-trending"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/browse?shop-by=trending`);
            onTabChange("trending");
          }}
        >
          <TranslatedText text="browse.trending" />
        </Link>
      </NavListItem>
      {/* <NavListItem className="nav-item">
        <Link
          className="nav-link"
          href="shop-by-brands"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/browse?shop-by=brands`)
          }}
        >
          <TranslatedText text="browse.byBrands" /> 
        </Link>
      </NavListItem> */}
      <NavListItem className="nav-item">
        <Link
          className={`nav-link ${shopBy === "local" ? `active` : ``}`}
          href="shop-local"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/browse?shop-by=local`);
            onTabChange("local");
          }}
        >
          <TranslatedText text="browse.shopLocal" />
        </Link>
      </NavListItem>
      {/* <NavListItem className="nav-item">
        <Link
          className="nav-link"
          href="shop-eco-friendly"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/browse?shop-by=eco-friendly`)
          }}
        >
        <TranslatedText text="browse.shopEcoFriendly" /> 
        </Link>
      </NavListItem> */}
    </NavList>
  );
};

export default ShopByTabs;
