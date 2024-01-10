import { useAppDispatch } from "app/hooks";
import { userSelector } from "features/userAccount/userSelectors";
import { statisticsThunk } from "features/userAccount/userThunks";
import { HeadingH2, Section } from "globalComponents/elements";
import { StatisticsPlaceholder } from "components/placeholders/statistics";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { WarningIconSVG } from "assets/svgComponents/icons";
import TranslatedText from "components/translatedText";

const Statistics: React.FC = () => {
  const dispatch = useAppDispatch();
  const { statistics, statisticsStatus, statisticsErrorMsg } =
    useSelector(userSelector);

  useEffect(() => {
    dispatch(statisticsThunk());
  }, []);

  return (
    <Section className="staticsec">
      <div className="custom-container">
        <HeadingH2 heading="account.statistics.myStatistics" />
        {statisticsStatus === "loading" ? (
          <div className="ststics-otr">
            <StatisticsPlaceholder />
            <StatisticsPlaceholder />
          </div>
        ) : statisticsStatus === "failed" && statisticsErrorMsg !== "" ? (
          <div className="warning">
            <WarningIconSVG />
            <p>{statisticsErrorMsg}</p>
          </div>
        ) : (
          <div className="ststics-otr">
            <div className="staticsinr">
              <div className="staticstxt greenstats">
                <h3>
                  {statistics.currency_symbol} {statistics.my_saving}
                </h3>
                <h4>
                  <TranslatedText text="account.statistics.mySavings" />
                </h4>
              </div>
            </div>
            <div className="staticsinr">
              <div className="staticstxt yellowstats">
                <h3>{statistics.co2_saved}</h3>
                <h4>
                  <TranslatedText text="account.statistics.approxCO2Saved" />
                </h4>
              </div>
            </div>
            <div className="staticsinr">
              <div className="staticstxt blueststats">
                <h3>{statistics.trees_saved}</h3>
                <h4>
                  <TranslatedText text="account.statistics.numberTreesHelpedSave" />
                </h4>
              </div>
            </div>
            <div className="staticsinr">
              <div className="staticstxt purplestats">
                <h3>{statistics.kilograms_of_ocean_waste_saved}</h3>
                <h4>
                  <TranslatedText text="account.statistics.kgmsOceanWastePrevented" />
                </h4>
              </div>
            </div>
            <div className="staticsinr">
              <div className="staticstxt redstats">
                <h3>
                  {statistics.currency_symbol}{" "}
                  {statistics.amount_raised_to_local_economy}
                </h3>
                <h4>{statistics.amount_raised_text}</h4>
              </div>
            </div>
            <div className="staticsinr">
              <div className="staticstxt skystats">
                <h3>{statistics.kilograms_of_plastic_waste_saved}</h3>
                <h4>
                  <TranslatedText text="account.statistics.kgmsPlasticAvoided" />
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Statistics;
