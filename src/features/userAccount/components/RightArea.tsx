import { ACCOUNT_SECTION } from "app/constants";
import { FC } from "react";
import loadable from "@loadable/component";

const Profile = loadable(
  () => import(/*webpackChunkName: "account-profile"*/ "./Sections/Profile")
);
const Address = loadable(
  () => import(/*webpackChunkName: "account-address"*/ "./Sections/Address")
);
const OrderHistory = loadable(
  () =>
    import(
      /*webpackChunkName: "account-order-history"*/ "./Sections/OrderHistory"
    )
);
const Card = loadable(
  () => import(/*webpackChunkName: "account-cards"*/ "./Sections/Card")
);
const OrderTrack = loadable(
  () =>
    import(/*webpackChunkName: "account-order-track"*/ "./Sections/OrderTrack")
);
const Voucher = loadable(
  () => import(/*webpackChunkName: "account-voucher"*/ "./Sections/Voucher")
);
const Wallet = loadable(
  () => import(/*webpackChunkName: "account-wallet"*/ "./Sections/Wallet")
);
const Savings = loadable(
  () => import(/*webpackChunkName: "account-saving"*/ "./Sections/Savings")
);
const ApproxSaved = loadable(
  () =>
    import(
      /*webpackChunkName: "account-approx-saved"*/ "./Sections/ApproxSaved"
    )
);
const Statistics = loadable(
  () =>
    import(/*webpackChunkName: "account-statistics"*/ "./Sections/Statistics")
);

const RightArea: FC<{ rightSection: string }> = ({ rightSection }) => {
  const SetContent = () => {
    switch (rightSection) {
      case ACCOUNT_SECTION.PROFILE:
        return <Profile />;
      case ACCOUNT_SECTION.ORDER_HISTORY:
        return <OrderHistory />;
      case ACCOUNT_SECTION.CARD:
        return <Card />;
      case ACCOUNT_SECTION.TRACK_ORDER:
        return <OrderTrack />;
      case ACCOUNT_SECTION.WALLET:
        return <Wallet />;
      case ACCOUNT_SECTION.VOUCHER:
        return <Voucher />;
      case ACCOUNT_SECTION.ADDRESS:
        return <Address />;
      case ACCOUNT_SECTION.SAVING:
        return <Savings />;
      case ACCOUNT_SECTION.APPROX_SAVED:
        return <ApproxSaved />;
      case ACCOUNT_SECTION.STATISTICS:
        return <Statistics />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="acoount-rghtside">
      <div className="tab-content">{SetContent()}</div>
    </div>
  );
};

export default RightArea;
