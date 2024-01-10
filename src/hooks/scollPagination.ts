import { PLATFORM_WEBSITE } from "app/constants";
import { useAppDispatch } from "app/hooks";
import { useEffect, useState } from "react";

var lastScroll = 0;
var footerSection;
const scrollDetect = () => {
  let currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0 && lastScroll <= currentScroll) {
    lastScroll = currentScroll;
    return true;
  } else {
    lastScroll = currentScroll;
    return false;
  }
};

const useScrollPagination = (
  {
    products,
    status,
    ref,
    currentPage,
    totalPages,
    isElementXPercentInViewport,
    viewMore,
    Thunk,
    ThunkBody,
    countryName,
    isViewMoreDispatch
  }
) => {

  const dispatch = useAppDispatch();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll); lastScroll = 0
    };
  }, [scrolling]);

  const handleScroll = () => {
    setScrolling(!scrolling);
    if (
      products.length &&
      status === "idle" &&
      ref &&
      ref.current &&
      currentPage < totalPages &&
      scrollDetect() &&
      isElementXPercentInViewport(ref.current, 10)
    ) {
      if (isViewMoreDispatch) {
        
        dispatch(viewMore());
        let body = ThunkBody ? ThunkBody : {
          platform: PLATFORM_WEBSITE,
          page: currentPage + 1,
          country_name: countryName,
        };
        dispatch(
          Thunk({ body })
        );
      } else {
        Thunk()
      }
    }
  };
}

export default useScrollPagination;