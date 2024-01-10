import ContentLoader from "react-content-loader";

const ProductsListing = ({ type }: { type?: string }) => (
  <ContentLoader
    height={220}
    speed={1}
    viewBox="0 0 108 24"
    backgroundColor="#ececec"
    foregroundColor="#fafafa"
  >        
    <rect x="4" y="0" rx="2" ry="2" width="24" height="24" />
    <rect x="30" y="0" rx="2" ry="2" width="24" height="24" />
    <rect x="56" y="0" rx="2" ry="2" width="24" height="24" />
    <rect x="82" y="0" rx="2" ry="2" width="24" height="24" />
  </ContentLoader>
);

export default ProductsListing;

export const ProductLoader = () => {
  const count =
    document.documentElement.clientWidth <= 767
      ? 2
      : document.documentElement.clientWidth > 767 &&
        document.documentElement.clientWidth <= 1024
      ? 3
      : 4;
  return (
    <>
      {Array.from(Array(count).keys()).map((i) => (
        <ProductLoaderItem key={i} />
      ))}
    </>
  );
};

const ProductLoaderItem = () => (
  <div className="homeproduct-inner homeprduct2 mt-4">
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
