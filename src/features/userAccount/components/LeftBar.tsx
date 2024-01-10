import { ACCOUNT_SECTION } from "app/constants";
import {
  OrderHistoryIconSVG,
  CardsIconSVG,
  TrackOrdersIconSVG,
  WalletIconSVG,
  VouchersIconSVG,
  AddressIconSVG,
  SavingsIconSVG,
  CO2SavingsIconSVG,
  StatisticsIconSVG,
  ProfileIconSVG,
} from "assets/svgComponents/icons";
import { Link } from "globalComponents/elements";
import TranslatedText from "components/translatedText";
interface LeftBarProps {
  setRightSection: React.Dispatch<React.SetStateAction<string>>;
  rightSection: string;
}

const LeftBar: React.FC<LeftBarProps> = ({ setRightSection, rightSection }) => {
  return (
    <div className="acoount-lftbar">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <Link
            href="/account"
            className={
              rightSection === ACCOUNT_SECTION.PROFILE
                ? "nav-link active"
                : "nav-link"
            }
            onClick={(e) => {
              e.preventDefault();
              setRightSection(ACCOUNT_SECTION.PROFILE);
            }}
          >
            <span className="accounttab-img">
              <ProfileIconSVG />{" "}
            </span>
            <TranslatedText text="account.profile.myProfile" />
          </Link>
        </li>
        {/* <li className="nav-item">
                    <Link 
                        href='/account'
                        className={rightSection === ACCOUNT_SECTION.ORDER_HISTORY ? 'nav-link active' : 'nav-link'}
                        onClick={e => {
                            e.preventDefault();
                            setRightSection(ACCOUNT_SECTION.ORDER_HISTORY)
                        }}
                    >
                        <span className="accounttab-img">
                        <OrderHistoryIconSVG /></span> Order History
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        href='/account'
                        className={rightSection === ACCOUNT_SECTION.CARD ? 'nav-link active' : 'nav-link'}
                        onClick={e => {
                            e.preventDefault();
                            setRightSection(ACCOUNT_SECTION.CARD)
                        }}
                    >
                        <span className="accounttab-img">
                        <CardsIconSVG /></span> My cards
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        href='/account'
                        className={rightSection === ACCOUNT_SECTION.TRACK_ORDER ? 'nav-link active' : 'nav-link'}
                        onClick={e => {
                            e.preventDefault();
                            setRightSection(ACCOUNT_SECTION.TRACK_ORDER)
                        }}
                    >
                        <span className="accounttab-img">
                        <TrackOrdersIconSVG /></span> Track Orders
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        href='/account'
                        className={rightSection === ACCOUNT_SECTION.WALLET ? 'nav-link active' : 'nav-link'}
                        onClick={e => {     
                            e.preventDefault();
                            setRightSection(ACCOUNT_SECTION.WALLET)
                        }}
                    >
                        <span className="accounttab-img"><WalletIconSVG /></span> Wallet
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        href='/account'
                        className={rightSection === ACCOUNT_SECTION.VOUCHER ? 'nav-link active' : 'nav-link'}
                        onClick={e => {
                            e.preventDefault();
                            setRightSection(ACCOUNT_SECTION.VOUCHER)
                        }}
                    >
                        <span className="accounttab-img"><VouchersIconSVG /></span> Vouchers
                    </Link>
                </li> */}
        <li className="nav-item">
          <Link
            href="/account"
            className={
              rightSection === ACCOUNT_SECTION.ADDRESS
                ? "nav-link active"
                : "nav-link"
            }
            onClick={(e) => {
              e.preventDefault();
              setRightSection(ACCOUNT_SECTION.ADDRESS);
            }}
          >
            <span className="accounttab-img">
              <AddressIconSVG />
            </span>{" "}
            <TranslatedText text="account.addressBook.addressBook" />
          </Link>
        </li>
        {/* <li className="nav-item">
                    <Link 
                        href='/account'
                        className={rightSection === ACCOUNT_SECTION.SAVING ? 'nav-link active' : 'nav-link'}
                        onClick={e => {
                            e.preventDefault();
                            setRightSection(ACCOUNT_SECTION.SAVING)
                        }}
                    >
                        <span className="accounttab-img">
                        <SavingsIconSVG /></span> My Savings
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        href='/account'
                        className={rightSection === ACCOUNT_SECTION.APPROX_SAVED ? 'nav-link active' : 'nav-link'}
                        onClick={e => {
                            e.preventDefault();
                            setRightSection(ACCOUNT_SECTION.APPROX_SAVED)
                        }}
                    >
                        <span className="accounttab-img">
                        <CO2SavingsIconSVG /></span> Approximate CO2 Saved
                    </Link>
                </li> */}
        <li className="nav-item">
          <Link
            href="/account"
            className={
              rightSection === ACCOUNT_SECTION.STATISTICS
                ? "nav-link active"
                : "nav-link"
            }
            onClick={(e) => {
              e.preventDefault();
              setRightSection(ACCOUNT_SECTION.STATISTICS);
            }}
          >
            <span className="accounttab-img">
              <StatisticsIconSVG />
            </span>{" "}
            <TranslatedText text="account.statistics.statistics" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftBar;
