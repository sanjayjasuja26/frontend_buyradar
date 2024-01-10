import { Image, Link } from "../elements";
import { ReactComponent as PlantIconGreenSvg } from "assets/svgComponents/planticon.svg";
import { ReactComponent as FlagIconSvg } from "assets/svgComponents/flag.svg";
import StarImg from "assets/images/home/star.png";
import { FaAngleDown } from "react-icons/fa";
import TranslatedText from "components/translatedText";

export const PlantGreenIcon = () => (
  <Image src={PlantIconGreenSvg} alt="eco_friendly" />
);

export const USFlagIcon = () => <Image src={FlagIconSvg} alt="product_img" />;

export const StarIcon = () => <Image src={StarImg} alt="product_img" />;

export const AddToCartLink = ({
  onClick,
  className,
}: {
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}) => (
  <Link onClick={onClick} href="/cart" className={className}>
    <TranslatedText text="product.addToCart" />
  </Link>
);

export const BuyNowLink = ({
  onClick,
  className,
}: {
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}) => (
  <Link onClick={onClick} href="/view-deal" className={className}>
    <TranslatedText text="product.viewDeal" />
  </Link>
);

export const ViewMoreBtn = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  return (
    <div className="viewmore-btn">
      <Link onClick={onClick} href="view-more-products">
        <TranslatedText text="global.viewMore" /> <FaAngleDown />
      </Link>
    </div>
  );
};
