import Loading from "../../../lazyLoader";
const CurrencyDropDown = ({
  allCurrencies,
  selectedCurrency,
  currencyStatus,
  selectCurrency,
  loggedInUser,
}: {
  allCurrencies: any;
  selectedCurrency: any;
  currencyStatus: string;
  loggedInUser: any;
  selectCurrency: ({ currency }) => void;
}) => {
  return (
    <>
      {currencyStatus === "loading" ? (
        <Loading style={{ background: "none" }} />
      ) : null}
      {currencyStatus === "idle" && Object.keys(allCurrencies).length
        ? Object.keys(allCurrencies).map((i, j) => (
            <li key={j}>
              <h3>{i}</h3>
              <ul className={i}>
                {allCurrencies[i].map((p, q) => (
                  <li
                    className={
                      loggedInUser?.selected_currency?.id === p.id
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      selectCurrency({ currency: p });
                    }}
                    key={p.id}
                  >
                    <span>{p.sign}</span>
                    {p.name}
                  </li>
                ))}
              </ul>
            </li>
          ))
        : null}
    </>
  );
};

export default CurrencyDropDown;
