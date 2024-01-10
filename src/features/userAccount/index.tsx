import { ACCOUNT_SECTION } from "app/constants";
import { Section } from "globalComponents/elements";
import { useState } from "react";
import LeftBar from "./components/LeftBar";
import RightArea from "./components/RightArea";

const UserAccount = () => {

  const [rightSection, setRightSection] = useState<string>(ACCOUNT_SECTION.PROFILE)

  return (
    <Section className="accpuntsec"> 
      <div className="custom-container">
				<div className="account-oter">
					<LeftBar setRightSection={setRightSection} rightSection={rightSection} />
					<RightArea rightSection={rightSection} />
				</div>
			</div>
    </Section>
  );
};

export default UserAccount;