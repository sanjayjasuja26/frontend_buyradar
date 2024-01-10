import ContentLoader from "react-content-loader";

export const CartAndWishListPlaceholder = () => (
  <ContentLoader
    // height={160}
    speed={1}
    height="100%"
    width="100%"
    backgroundColor={"#ececec"}
    foregroundColor={"#fafafa"}
    // viewBox="0 0 20 20"
    viewBox="0 0 400 80"
  >
    {/* image */}
    <rect x="0" y="0" rx="5" ry="5" width="120" height="80" />
    {/* product title */}
    <rect x="130" y="0" rx="3" ry="3" width="250" height="7" />
    <rect x="130" y="13" rx="3" ry="3" width="150" height="7" />
    {/* price + deal */}
    <rect x="130" y="34" rx="3" ry="3" width="120" height="7" />

    {/* pickup + receive by */}
    <rect x="130" y="54" rx="3" ry="3" width="100" height="7" />
    {/* <rect x="130" y="70" rx="2" ry="2" width="100" height="7" /> */}
  </ContentLoader>
);
