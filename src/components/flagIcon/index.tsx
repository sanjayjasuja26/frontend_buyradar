import ReactCountryFlag from "react-country-flag";

const FlagIcon = ({
  countryCode,
  countryName,
}: {
  countryCode: any;
  countryName: any;
}) => {
  
  return (
    <ReactCountryFlag
      className="emojiFlag"
      countryCode={countryCode}
      aria-label={countryName}
    />
  );
};

export default FlagIcon;
