import { useState, useRef, ComponentType } from "react";
import useOutsideClick from "hoc/closePopup";
import { Link } from "globalComponents/elements";
import { currencyStateSelector } from "features/auth/authSelectors";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { updateUserCurrencyThunk } from "features/auth/authThunks";
import { getAllCurrenciesThunk } from "features/auth/authThunks";

const CurrencySelector = ({ loggedInUser }: { loggedInUser: any }) => {
  const currencyDropDownRef = useRef<any>();
  const [currencyToggle, setCurrencyToggle] = useState(false);
  const dispatch = useAppDispatch();

  const [CurrencyDropDown, setCurrencyDropDown] =
    useState<ComponentType<any> | null>(null);

  useOutsideClick(currencyDropDownRef, () => {
    setCurrencyToggle(false);
  });

  const { allCurrencies, selectedCurrency, currencyStatus } = useAppSelector(
    currencyStateSelector
  );

  const selectCurrencyHandler = ({ currency }) => {
    dispatch(
      updateUserCurrencyThunk({
        body: {
          selected_currency: currency.id,
        },
        selected_currency: currency,
      })
    );
    setCurrencyToggle(false);
  };

  return (
    <li
      className="dropdown currency-selector-dropdown"
      ref={currencyDropDownRef}
    >
      <Link
        href="/currency"
        onClick={(e) => {
          e.preventDefault();
          if (loggedInUser && loggedInUser.token) {
            import(
              /*webpackChunkName: "currency-selector-dropdown"*/ "./currencyDropDown"
            ).then((_) => setCurrencyDropDown(() => _.default));
            setCurrencyToggle && setCurrencyToggle(!currencyToggle);
            if (!Object.keys(allCurrencies).length) {
              dispatch(getAllCurrenciesThunk({ body: {} }));
            }
          } else {
            // do nothing
          }
        }}
        className="selected-currency-symbol"
      >
        <span>
          {loggedInUser &&
          loggedInUser.token &&
          loggedInUser.selected_currency?.sign
            ? loggedInUser.selected_currency.sign
            : "$"}
        </span>
      </Link>
      {currencyToggle && (
        <ul className="currency-dropdown">
          {CurrencyDropDown && (
            <CurrencyDropDown
              allCurrencies={allCurrencies}
              selectedCurrency={selectedCurrency}
              currencyStatus={currencyStatus}
              selectCurrency={selectCurrencyHandler}
              loggedInUser={loggedInUser}
            />
          )}
        </ul>
      )}
    </li>
  );
};

export default CurrencySelector;
