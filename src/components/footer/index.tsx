import { Image, Link, BuyRadarLogo } from "globalComponents/elements";
import FacbookIconImg from "assets/images/home/fb@2x.png";
import InstagramIconImg from "assets/images/home/insta@2x.png";
import TwitterIconImg from "assets/images/home/twitter@2x.png";
import YoutubeIconImg from "assets/images/home/youtube@2x.png";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { loggedInUserSelector } from "features/auth/authSelectors";
import TranslatedText from "components/translatedText";

const Footer = () => {
  const history = useHistory();

  const loggedInUser = useAppSelector(loggedInUserSelector);

  return (
    <footer id="footerSection">
      <div className="custom-container">
        <div className="footer-outer">
          <div className="footer-inner footer-inner1">
            <div className="footer-logo">
              <BuyRadarLogo />
            </div>
            <ul>
              <li>
                <Link
                  href="facebook"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Image src={FacbookIconImg} alt="buyradar-facebook" />
                </Link>
              </li>
              <li>
                <Link
                  href="instagram"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Image src={InstagramIconImg} alt="buyradar-instagram" />
                </Link>
              </li>
              <li>
                <Link
                  href="twitter"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Image src={TwitterIconImg} alt="buyradar-twitter" />
                </Link>
              </li>
              <li>
                <Link
                  href="youtube"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Image src={YoutubeIconImg} alt="buyradar-youtube" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-inner">
            <h2>
              <TranslatedText text="footer.aboutUs" />
            </h2>
            <ul>
              <li>
                <Link
                  href="about"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.aboutCompany" />
                </Link>
              </li>
              <li>
                <Link
                  href="careers"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.careers" />
                </Link>
              </li>
              <li>
                <Link
                  href="store-locator"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.storeLocator" />
                </Link>
              </li>
              <li>
                <Link
                  href="payments"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.payments" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-inner">
            <h2>
              <TranslatedText text="footer.myAccount" />
            </h2>
            <ul>
              <li>
                <Link
                  href="/account"
                  onClick={(e) => {
                    e.preventDefault();
                    if (loggedInUser && loggedInUser.token) {
                      history.push("/account");
                    }
                  }}
                >
                  <TranslatedText text="footer.profile" />
                </Link>
              </li>
              <li>
                <Link
                  href="order-history"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.orderHistory" />
                </Link>
              </li>
              <li>
                <Link
                  href="order-status"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.orderStatus" />
                </Link>
              </li>
              <li>
                <Link
                  href="payments"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.payments" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-inner">
            <h2>
              <TranslatedText text="footer.customerCare" />
            </h2>
            <ul>
              <li>
                <Link
                  href="contact-us"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.contactUs" />
                </Link>
              </li>
              <li>
                <Link
                  href="inquiry"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.complaintInquiryForm" />
                </Link>
              </li>
              <li>
                <Link
                  href="feedback"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.customerFeedback" />
                </Link>
              </li>
              <li>
                <Link
                  href="faq"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.faq" />
                </Link>
              </li>
              <li>
                <Link
                  href="shipping-policy"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.shippingPolicy" />
                </Link>
              </li>
              <li>
                <Link
                  href="return-exchange-policy"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TranslatedText text="footer.returnExchangePolicy" />
                </Link>
              </li>
              <li>
                <Link
                  href={"/privacy-policy"}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/privacy-policy");
                  }}
                >
                  <TranslatedText text="footer.privacyPolicy" />
                </Link>
              </li>
              <li>
                <Link
                  href={"/terms-and-conditions"}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/terms-and-conditions");
                  }}
                >
                  <TranslatedText text="footer.termsConditions" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
