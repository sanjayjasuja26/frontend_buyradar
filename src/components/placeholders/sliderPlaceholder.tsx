// import ContentLoader from "react-content-loader";

// const SliderPlaceholder = ({ type }: { type: string }) => (
//   <ContentLoader
//     viewBox="0 0 108 20"
//     backgroundColor="#ececec"
//     foregroundColor="#fafafa"
//     // backgroundColor="blue"
//     // foregroundColor="blue"
//     // style={{ width: "100%", height: "100%",  }}
//     // gradientRatio={2}
//   >
//     <rect x="0" y="0" rx="2" ry="2" width="20" height="20" />
//     <rect x="22" y="0" rx="2" ry="2" width="20" height="20" />
//     <rect x="44" y="0" rx="2" ry="2" width="20" height="20" />
//     <rect x="66" y="0" rx="2" ry="2" width="20" height="20" />
//     <rect x="88" y="0" rx="2" ry="2" width="20" height="20" />
//   </ContentLoader>
// );

// export default SliderPlaceholder;

import ContentLoader from "react-content-loader";

const CategorySliderListing = ({ type }: { type?: string }) => (
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

export default CategorySliderListing;

export const CategorySliderLoader = () => {
  const count =
    document.documentElement.clientWidth <= 400
    ? 1 
    :
    document.documentElement.clientWidth > 400 &&
    document.documentElement.clientWidth <= 600
    ? 2 
    : document.documentElement.clientWidth > 600 && 
      document.documentElement.clientWidth <= 700
      ? 3
      : document.documentElement.clientWidth > 700 &&
        document.documentElement.clientWidth <= 1000
      ? 4
      : 5;
  return (
    <div className="d-flex h-100 w-100 my-3">
      {Array.from(Array(count).keys()).map((i) => (
        <CategorySliderLoaderItem key={i} />
      ))}
    </div>
  );
};

const CategorySliderLoaderItem = () => (
    <div className="mx-3">
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



// 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