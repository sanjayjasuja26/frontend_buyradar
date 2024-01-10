import TranslatedText from "components/translatedText";
import { WarningIconSVG } from "assets/svgComponents/icons";

const SomethingWentWrong = () => {
  return (
    <div className="warning">
      <WarningIconSVG />
      <p>
        <TranslatedText text="global.somethingWentWrong" /> <br />
        <TranslatedText text="global.failedToFetch" />
      </p>
    </div>
  );
};

export default SomethingWentWrong;

export const NoProductFound = ({ className }: { className?: string }) => {
  return (
    <div className="no-product-found-wrapper">
      <div className="warning" style={{ width: "unset" }}>
        <WarningIconSVG />
        <p>
          <TranslatedText text="global.noProductsFound" />
        </p>
      </div>
    </div>
  );
};
