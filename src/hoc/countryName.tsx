import { ComponentType } from "react";
import { getGeoData } from "utils/helpers";

function withCountry<T>(Component: ComponentType<T>) {

  const { country_name, country_code } = getGeoData();
  
  return (hocProps: Omit<T, "countryName" | "countryCode">) => {
    return (
      <Component
        {...(hocProps as T)}
        countryName={country_name}
        countryCode={country_code}
      />
    );
  };
}

export default withCountry;
