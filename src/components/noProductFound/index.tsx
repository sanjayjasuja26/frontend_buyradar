import TranslatedText from "components/translatedText";

const NoProductFound = () => {
  return (
    <div className="not-found-product">
      <TranslatedText text="global.pageDoesNotExists" /> <br />
      <TranslatedText text="global.tryDifferentSearch" />
    </div>
  );
};

export default NoProductFound;
