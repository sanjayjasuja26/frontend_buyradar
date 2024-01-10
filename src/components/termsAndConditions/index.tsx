import React, { useEffect } from "react";
import { HeadingH2 } from "globalComponents/elements";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cmsSelector } from "features/cms/cmsSelectors";
import { cmsThunk } from "features/cms/cmsThunks";

const TermsAndConditions = () => {
  const dispatch = useAppDispatch();
  const { cmsData } = useAppSelector(cmsSelector);

  useEffect(() => {
    dispatch(cmsThunk());
  }, []);

  return (
    <>
      <div className="privacy-outer">
        <div className="custom-container">
          <HeadingH2 heading="footer.termsConditions" />
          <div className="privacy-cotent">
            <p>{cmsData[0]?.terms_conditions}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
