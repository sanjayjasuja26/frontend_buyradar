import { Link } from "globalComponents/elements";
import { useHistory, useLocation } from "react-router-dom";
import TranslatedText from "components/translatedText";
interface AppNavigationsProps {
  responsiveDropDownIsOpen: boolean;
  setResponsiveDropDownIsOpen: (toggle: boolean) => void;
}

const AppNavigations = ({
  responsiveDropDownIsOpen,
  setResponsiveDropDownIsOpen,
}: AppNavigationsProps) => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <div
        className={
          responsiveDropDownIsOpen
            ? "collapse navbar-collapse navbar1 show"
            : "collapse navbar-collapse navbar1"
        }
        id="collapsibleNavbar"
      >
        <div className="custom-container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/home");
                  setResponsiveDropDownIsOpen(false);
                }}
                className={
                  pathname === "/home" || pathname === "/"
                    ? "nav-link active"
                    : "nav-link"
                }
                href="/home"
              >
                <TranslatedText text="header.home" />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/browse");
                  setResponsiveDropDownIsOpen(false);
                }}
                className={
                  pathname === "/browse" ? "nav-link active" : "nav-link"
                }
                href="/browse"
              >
                <TranslatedText text="header.browse" />
              </Link>
            </li>
            <li className="nav-item">
              <a className={ "nav-link"
                  // pathname === "/" ? "nav-link active" : "nav-link"
                } href="mailto:support@buyradar.com">
                  <TranslatedText text="header.contactUS" />
                </a>
              {/* <Link
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/browse");
                  setResponsiveDropDownIsOpen(false);
                }}
                className={
                  pathname === "/" ? "nav-link active" : "nav-link"
                }
                href="mailto:support@buyradar.com"
              >
                <TranslatedText text="header.contactUS" />
              </Link> */}
            </li>
            {/* <li className="nav-item">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/blog");
                  setResponsiveDropDownIsOpen(false);
                }}
                className={
                  pathname === "/blog" ? "nav-link active" : "nav-link"
                }
                href="blog"
              >
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/contact-us");
                  setResponsiveDropDownIsOpen(false);
                }}
                className={
                  pathname === "/contact-us" ? "nav-link active" : "nav-link"
                }
                href="contact-us"
              >
                Contact us
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};
export default AppNavigations;
