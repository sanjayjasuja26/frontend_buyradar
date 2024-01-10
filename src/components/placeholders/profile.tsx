import ContentLoader from "react-content-loader";

export const ProfilePlaceholder = () => (
    <>
    <ContentLoader
    height={160}
    speed={1}
    backgroundColor={'#ececec'}
    foregroundColor={'#fafafa'}
    viewBox="0 0 400 80"
  >
    <rect x="0" y="0" rx="4" ry="4" width="100" height="20" />
    <rect x="120" y="0" rx="4" ry="4" width="100" height="20" />
    <rect x="240" y="0" rx="4" ry="4" width="100" height="20" />
    <rect x="0" y="50" rx="4" ry="4" width="100" height="20" />
    <rect x="120" y="50" rx="4" ry="4" width="100" height="20" />
  </ContentLoader>
</>
);