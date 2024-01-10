import { useTranslation } from "react-i18next";

const SubscribeNow = () => {
  const { t } = useTranslation();
  return (
    <section className="subscribe-sec" id="subscribtionSection">
      <div className="custom-container">
        <div className="heading">
          <h2>{t("subscribeNow.subscribeNow")}</h2>
          <p>{t("subscribeNow.joinUsForNews")}</p>
        </div>
        <div className="subscrib-feilds">
          <input
            type="text"
            placeholder={`${t("subscribeNow.enterYourEmail")}`}
          />
          <button>{t("subscribeNow.subscribe")}</button>
        </div>
      </div>
    </section>
  );
};

export default SubscribeNow;
