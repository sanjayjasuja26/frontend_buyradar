import ContentLoader from "react-content-loader";

export const ImageWithSectionPlaceholder = () => (
  <ContentLoader
    viewBox="0 0 300 200"
    backgroundColor="#ececec"
    foregroundColor="#fafafa"
  >
    {/* left section */}
    <rect x="4" y="8" rx="4" ry="4" width="150" height="80" />
    <rect x="4" y="90" rx="4" ry="4" width="20" height="20" />
    <rect x="26" y="90" rx="4" ry="4" width="20" height="20" />
    <rect x="48" y="90" rx="4" ry="4" width="20" height="20" />
    <rect x="70" y="90" rx="4" ry="4" width="20" height="20" />

    {/* right section */}
    <rect x="160" y="8" rx="2" ry="2" width="120" height="3" />
    <rect x="160" y="13" rx="1" ry="1" width="24" height="2.5" />
    <rect x="160" y="23" rx="1" ry="1" width="64" height="2.5" />
    <rect x="160" y="28" rx="1" ry="1" width="64" height="2.5" />
    <rect x="160" y="28" rx="1" ry="1" width="64" height="2.5" />
    <rect x="160" y="40" rx="1" ry="1" width="80" height="2.5" />
    <rect x="160" y="48" rx="1" ry="1" width="80" height="2.5" />

    {/* merchants section */}
    {/* <rect x="40" y="150" rx="2" ry="2" width="200" height="30" /> */}
  </ContentLoader>
);
