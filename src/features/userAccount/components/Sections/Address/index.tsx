import React from "react";
import { HeadingH2, Section } from "globalComponents/elements";
import AddAddressForm from "./AddAddressForm"

const Address: React.FC = () => {
  return (
    <div className="tab-pane active accounttab">
      <Section className="loginsec createaccount-sec">
        <div className="custom-container">
          <HeadingH2 heading="account.addressBook.addHomeAddress" />
          <div className="loginoter address-form">
            <AddAddressForm />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Address;
