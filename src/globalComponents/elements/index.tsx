import {
  ImagePropsInterface,
  LinkPropsInterface,
  NavListInterface,
  NavListItemInterface,
  SectionInterface,
} from "./elementsPropsTypes";
import { BuyRadarLogoWithTextSVG } from "assets/svgComponents/buyRadarLogoSvgs";
import TranslatedText from "components/translatedText";

export const Image = ({
  src,
  alt,
  className,
  onLoad,
  onError,
}: ImagePropsInterface) => {
  return (
    <img
      src={src}
      onLoad={onLoad}
      onError={onError}
      alt={alt}
      className={className}
    />
  );
};

export const Link = ({
  children,
  onClick,
  href,
  rel,
  className,
  type,
  onMouseEnter,
  onMouseLeave,
}: LinkPropsInterface) => {
  return (
    <a
      type={type}
      className={className}
      rel={rel}
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};

export const BuyRadarLogo = () => {
  return <BuyRadarLogoWithTextSVG />;
};

export const HeadingH2 = ({ heading }: { heading: string }) => {
  return (
    <div className="heading">
      <h2>
        <TranslatedText text={heading} />
      </h2>
    </div>
  );
};

export const NavList = ({ className, children }: NavListInterface) => {
  return <ul className={className}>{children}</ul>;
};

export const NavListItem = ({ className, children }: NavListItemInterface) => {
  return <li className={className}>{children}</li>;
};

export const Section = ({ className, children }: SectionInterface) => {
  return <section className={className}>{children}</section>;
};
