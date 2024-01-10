import ContentLoader from "react-content-loader";

export const ProductListingImageLoader = () => (
  <div className="image-loader-wrapper">
    <ContentLoader
      speed={1}
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      backgroundColor="#ececec"
      foregroundColor="#fafafa"
    >
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" />
    </ContentLoader>
  </div>
);

export const CategoryImageLoader = ({ showClass = true }) => (
  // <div className={showClass ? "image-loader-wrapper" : ''}>
    <ContentLoader
      speed={1}
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      backgroundColor="#ececec"
      foregroundColor="#fafafa"
    >
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" />
    </ContentLoader>
  // </div>
);
