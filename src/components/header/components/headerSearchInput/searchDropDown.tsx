import { ButtonLoader } from "globalComponents/loaders";
import { THEME_COLOR_PURPLE } from "app/constants";
import { isValidUrl } from "utils/helpers";
import TranslatedText from "components/translatedText";
import { Image } from "globalComponents/elements";
import { useEffect, useState } from "react";
import { ProductListingImageLoader } from "components/placeholders/image";
const SearchDropDown = ({
  value,
  show,
  searchResults,
  searchHistory,
  onSelectChange,
  apiStatus,
}: {
  value: string;
  show: boolean;
  searchResults: any;
  searchHistory: any;
  apiStatus: string;
  onSelectChange: (a: any) => void;
}) => {
  const [results, setResults] = useState(searchResults);

  useEffect(() => {
    setResults(searchResults.slice(0, 5));
  }, [searchResults]);

  return (
    <div className="searchdrop-down">
      <ul>
        {apiStatus === "loading" && (
          <li className="no-hover-effect">
            <ButtonLoader color={THEME_COLOR_PURPLE} show={true} />
          </li>
        )}
        {apiStatus === "idle" && results.length > 0 && value.trim() !== ""
          ? results.map((item: any) => (
              <SearchItem item={item} key={item.id} onClick={onSelectChange} />
            ))
          : null}
        {apiStatus === "idle" && searchHistory.length > 0 && value.trim() === ""
          ? searchHistory.map((item: any) => (
              <SearchItem
                item={item}
                key={item.text}
                onClick={onSelectChange}
              />
            ))
          : null}
        {apiStatus !== "loading" &&
        value.trim() !== "" &&
        results.length === 0 ? (
          <div className="text-center">
            <span>
              <TranslatedText text="header.noResultFoundTryDifferentSearch" />
            </span>
          </div>
        ) : null}
      </ul>
    </div>
  );
};
export default SearchDropDown;

export const SearchItem = ({
  item,
  onClick,
}: {
  item: any;
  onClick: (a: any) => void;
}) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const isValid = isValidUrl(item?.image_url);

  return (
    <li onClick={() => onClick({ item })}>
      {item.image_url && (
        <span className="seachimages position-relative">
          {isImageLoading ? <ProductListingImageLoader /> : null}
          <Image
            src={
              isValid
                ? item.image_url
                : "https://dev-buyradar.iapplabz.co.in/no_image_yet.png"
            }
            alt="buy-radar-search-item"
            className="searchimg"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
        </span>
      )}
      <h4>
        {item.name ? item.name : item.text}
        {/* <span>Perfum</span>e fragrance */}
      </h4>
    </li>
  );
};
