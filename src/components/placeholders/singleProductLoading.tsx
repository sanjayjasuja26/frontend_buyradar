import ContentLoader, { Code } from "react-content-loader";

const SingleProductPlaceholder = ({ type }: { type?: string }) => (
  <ContentLoader
    width="100%"
    height="100%"
    speed={1}
    viewBox="0 0 20 20"
    backgroundColor="#ececec"
    foregroundColor="#fafafa"
  >
    <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" />
  </ContentLoader>
);

export default SingleProductPlaceholder;
