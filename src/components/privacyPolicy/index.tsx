import React, { useEffect } from "react";
import { HeadingH2 } from "globalComponents/elements";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cmsSelector } from "features/cms/cmsSelectors";
import { cmsThunk } from "features/cms/cmsThunks";

const PrivacyPolicy = () => {
  const dispatch = useAppDispatch();
  const { cmsData } = useAppSelector(cmsSelector);

  useEffect(() => {
    dispatch(cmsThunk());
  }, []);

  return (
    <>
      <div className="privacy-outer">
        <div className="custom-container">
          <HeadingH2 heading="footer.privacyPolicy" />
          <div className="privacy-cotent">
            <p>{cmsData[0]?.privacy_policy}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
