import ContentLoader from "react-content-loader";

export const MerchantPlaceholder = () => (
  <ContentLoader
  height={160}
  speed={1}
  backgroundColor={'#ececec'}
  foregroundColor={'#fafafa'}
  viewBox="0 0 400 80"
>
    <rect x="0" y="0" width="1000" height="100" />
</ContentLoader>
);