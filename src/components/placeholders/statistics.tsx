import ContentLoader from "react-content-loader";

export const StatisticsPlaceholder = () => (
  <ContentLoader
  height={160}
  speed={1}
  backgroundColor={'#ececec'}
  foregroundColor={'#fafafa'}
  viewBox="0 0 400 80"
>
  <rect x="0" y="10" rx="5" ry="5" width="120" height="100" />
  <rect x="130" y="10" rx="5" ry="5" width="120" height="100" />
  <rect x="260" y="10" rx="5" ry="5" width="120" height="100" />
</ContentLoader>
);