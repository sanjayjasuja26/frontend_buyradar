import ContentLoader from "react-content-loader";

const CategoryListing = ({ type }: { type?: string }) => (
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

export default CategoryListing;

export const CategoryLoader = () => {
  const count =
    document.documentElement.clientWidth <= 540
    ? 2 
    : document.documentElement.clientWidth > 540 && 
      document.documentElement.clientWidth <= 823
      ? 3
      : document.documentElement.clientWidth > 823 &&
        document.documentElement.clientWidth <= 1024
      ? 4
      : 5;
  return (
    <>
      {Array.from(Array(count).keys()).map((i) => (
        <CategoryLoaderItem key={i} />
      ))}
    </>
  );
};

const CategoryLoaderItem = () => (
  <div className="topcollection-oter">
    <div className="topcollection-image position-relative">
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
  </div>
);
