import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useEffect, useState } from "react";
import { userSelector } from "../../../userSelectors";
import { getProfileThunk } from "../../../userThunks";
import EditProfileForm from "./EditProfileForm";
import { ProfilePlaceholder } from "components/placeholders/profile";
import SomethingWentWrong from "components/somethingWentWrong";
import TranslatedText from "components/translatedText";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { getProfileStatus } = useAppSelector(userSelector);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(getProfileThunk());
  }, []);

  return (
    <div className="tab-pane active accounttab">
      <div className="acounttab-hdng">
        <h2>
          {isEdit ? (
            <TranslatedText text="account.profile.editProfile" />
          ) : (
            <TranslatedText text="account.profile.myProfile" />
          )}
        </h2>
      </div>
      {getProfileStatus === "loading" ? (
        <ProfilePlaceholder />
      ) : getProfileStatus === "idle" ? (
        <EditProfileForm isEdit={isEdit} setIsEdit={setIsEdit} />
      ) : (
        <SomethingWentWrong />
      )}
    </div>
  );
};

export default Profile;
