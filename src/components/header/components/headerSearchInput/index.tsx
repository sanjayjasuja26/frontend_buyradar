// import { Image } from "globalComponents/elements";
import { SearchIconSVG } from "assets/svgComponents/icons";
import {
  useHistory,
  useLocation,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { headerSearchApi } from "services/browse";
import { useEffect, useRef, useState } from "react";
import { getQueryString } from "utils/helpers";
import loadable from "@loadable/component";
import { useTranslation } from "react-i18next";

const SearchDropDown = loadable(
  () =>
    import(/*webpackChunkName: "header-search-dropdown"*/ "./searchDropDown")
);
interface HeaderSearchProps extends RouteComponentProps {
  mode?: string;
  offset?: number;
}

const HeaderSearchInput = ({ mode, offset }: HeaderSearchProps) => {
  const [value, setValue] = useState("");
  const history = useHistory();
  const location = useLocation();
  const [apiStatus, setApiStatus] = useState("idle");
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const ref = useRef<any>();
  const searchQueryString = getQueryString(location.search, "k");
  const { t } = useTranslation();
  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/home" ||
      location.pathname === "/wishlist" ||
      location.pathname === "/account" ||
      location.pathname === "/browse"
    ) {
      setValue("");
    }
    if (location.pathname === "/search") {
      if (searchQueryString && value === "") {
        console.log("setstate here");
        setValue(searchQueryString);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (offset && offset > 0) {
      setShowSuggestionBox(false);
    }
  }, [offset]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSuggestionBox(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setValue(value);

    setShowSuggestionBox(true);
    let body = {
      search_keyword: value,
    };

    if (value !== "") {
      setApiStatus("loading");
      // setSearchHistory([]);
    } else {
      setApiStatus("idle");
      setSearchResults([]);
    }

    if (value && value.trim()) {
      fetchData(body, false);
    }
  };

  const fetchData = (body, history = false) => {
    setApiStatus("loading");
    setShowSuggestionBox(true);
    headerSearchApi({ body })
      .then((res) => {
        if (history) {
          setSearchHistory(res.data.searchHistory);
        } else {
          setSearchResults(res.data.searchedData);
        }
        setApiStatus("idle");
      })
      .catch((err) => {
        console.log("@headerSearchApi err", err);
        setSearchResults([]);
        setSearchHistory([]);
        setApiStatus("failed");
      });
  };

  const onSelectChange = ({ item }: { item: any }) => {
    if (item.name && item.id) {
      setShowSuggestionBox(false);
      setValue(item.name);
      history.push({
        pathname: `/product/${item.id}`,
        state: { title: item.name ? `BuyRadar - ${item.name}` : "BuyRadar" },
      });
    } else {
      setSearchResults([]);
      setSearchHistory([]);
      setValue(item.text);
      fetchData({ search_keyword: item.text }, false);
    }
  };

  const submitSearchHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => submitSearchHandler(e)} ref={ref}>
      <input
        type="text"
        placeholder={t("header.searchProducts")}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          onChangeHandler(e)
        }
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setShowSuggestionBox(false);
            // setValue("");
            history.push({
              pathname: `/search`,
              ...(value.trim() !== "" && {
                search: `?k=${value.trim()}`,
              }),
              state: { search_keyword: value },
            });
          }
        }}
        onFocus={() => {
          setSearchHistory([]);
          fetchData({ search_keyword: "" }, true);
        }}
      />
      <button onClick={(e) => submitSearchHandler(e)}>
        <SearchIconSVG />
      </button>
      {showSuggestionBox ? (
        <SearchDropDown
          value={value}
          show={showSuggestionBox}
          searchResults={searchResults}
          searchHistory={searchHistory}
          onSelectChange={onSelectChange}
          apiStatus={apiStatus}
        />
      ) : null}
    </form>
  );
};

export default withRouter(HeaderSearchInput);

// export const SearchDropDown = ({
//   value,
//   show,
//   searchResults,
//   searchHistory,
//   onSelectChange,
//   apiStatus,
// }: {
//   value: string;
//   show: boolean;
//   searchResults: any;
//   searchHistory: any;
//   apiStatus: string;
//   onSelectChange: (a: any) => void;
// }) => {
//   const [results, setResults] = useState(searchResults);

//   useEffect(() => {
//     setResults(searchResults.slice(0, 5));
//   }, [searchResults]);

//   return (
//     <div className="searchdrop-down">
//       <ul>
//         {apiStatus === "loading" && (
//           <li className="no-hover-effect">
//             <ButtonLoader color={THEME_COLOR_PURPLE} show={true} />
//           </li>
//         )}
//         {apiStatus === "idle" && results.length > 0 && value.trim() !== ""
//           ? results.map((item: any) => (
//               <SearchItem item={item} key={item.id} onClick={onSelectChange} />
//             ))
//           : null}
//         {apiStatus === "idle" && searchHistory.length > 0 && value.trim() === ""
//           ? searchHistory.map((item: any) => (
//               <SearchItem
//                 item={item}
//                 key={item.text}
//                 onClick={onSelectChange}
//               />
//             ))
//           : null}
//         {apiStatus !== "loading" &&
//         value.trim() !== "" &&
//         results.length === 0 ? (
//           <div className="text-center">
//             <span>
//               <TranslatedText text="header.noResultFoundTryDifferentSearch" />
//             </span>
//           </div>
//         ) : null}
//       </ul>
//     </div>
//   );
// };

// export const SearchItem = ({
//   item,
//   onClick,
// }: {
//   item: any;
//   onClick: (a: any) => void;
// }) => {
//   const isValid = isValidUrl(item?.image_url);

//   return (
//     <li onClick={() => onClick({ item })}>
//       {item.image_url && (
//         <span className="seachimages">
//           <Image
//             src={
//               isValid
//                 ? item.image_url
//                 : "https://dev-buyradar.iapplabz.co.in/no_image_yet.png"
//             }
//             alt="buy-radar-search-item"
//             className="searchimg"
//           />
//         </span>
//       )}
//       <h4>
//         {item.name ? item.name : item.text}
//         {/* <span>Perfum</span>e fragrance */}
//       </h4>
//     </li>
//   );
// };
