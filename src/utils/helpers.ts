import fetchService from "services";

export const getBuyRadarUser = () => {
  const user = localStorage.getItem("buyRadarUser");
  if (user) return JSON.parse(user);
  else return null;
};

export const getUserMode = () => {
  const user = localStorage.getItem("guestMode");
  if (user) return JSON.parse(user);
  else return null;
};

export const getGeoData = () => {
  const data = localStorage.getItem("geolocation");
  if (data) return JSON.parse(data);
  else return { country_name: "", country_code: "" };
};

export const setBuyRadarUser = (user: any) => {
  localStorage.setItem("buyRadarUser", JSON.stringify(user));
};

export const updateBuyRadarUser = (user: any) => {
  localStorage.setItem("buyRadarUser", JSON.stringify(user));
};

export const removeBuyRadarUser = () => {
  localStorage.removeItem("buyRadarUser");
  // localStorage.removeItem("guestMode")
};

export const getQueryString = (query: string, value: string) => {
  const str = new URLSearchParams(query);
  const v = str.get(value);
  if (v) return v;
  else return null;
};

export const getQueryStringEmail = (query: string, value: string) => {
  const str = new URLSearchParams(query);
  const v = str.get(value);
  if (v) return v;
  else return "";
};

export const saveBuyRadarMemeberId = (memeberId: any) => {
  localStorage.setItem("buyRadarMemberId", memeberId);
};

export const getBuyRadarMemeberId = () => {
  const memeberId = localStorage.getItem("buyRadarMemberId");
  if (memeberId) return memeberId;
  else return null;
};

export const checkGuestMode = async () => {
  try {
    let res = await fetchService({ endpoint: "/guestmode", method: "GET" });

    let value = res.data[0].login_only_mode;
    value = value === 0 ? true : false;
    localStorage.setItem("guestMode", value);
  } catch (error) {
    console.log(error);
  }
};

export const isNumberKey = (e: any) => {
  if (
    e.keyCode > 31 &&
    (e.keyCode < 48 || e.keyCode > 57) &&
    (e.keyCode < 96 || e.keyCode > 105)
  ) {
    e.preventDefault();
    return false;
  }
  return true;
};

export const isElementXPercentInViewport = function (el, percentVisible) {
  let rect = el.getBoundingClientRect(),
    windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return !(
    Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100) <
      percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) <
      percentVisible
  );
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
};

export const getMaxDate = () => {
  let dtToday = new Date();

  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();
  let Month = "";
  let Day = "";
  if (month < 10) {
    Month = "0" + month.toString();
  } else {
    Month = month.toString();
  }
  if (day < 10) {
    Day = "0" + day.toString();
  } else {
    Day = day.toString();
  }

  var maxDate = year + "-" + Month + "-" + Day;
  return maxDate;
};
