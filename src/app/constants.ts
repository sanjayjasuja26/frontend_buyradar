export const FACEBOOK_APP_ID = process.env.REACT_APP_URL === "dev" ? process.env.REACT_APP_FACEBOOK_APP_ID_DEV : process.env.REACT_APP_FACEBOOK_APP_ID_PROD

export const GOOGLE_APP_CLIENT_ID = process.env.REACT_APP_URL === "dev" ? process.env.REACT_APP_GOOGLE_APP_CLIENT_ID_DEV : process.env.REACT_APP_GOOGLE_APP_CLIENT_ID_PROD

export const GEOCODE_API_KEY = process.env.REACT_APP_URL === "dev" ? process.env.REACT_APP_GEOCODE_API_KEY_DEV : process.env.REACT_APP_GEOCODE_API_KEY_PROD

export const loginType = {
  LOGIN_WITH_EMAIL: 1,
  LOGIN_WITH_FACEBOOK: 3,
  LOGIN_WITH_GOOGLE: 4
}

export const DEVICE_TYPE_WEB = 3
export const PLATFORM_WEBSITE = "website"


export const THEME_COLOR_PURPLE = "#6b4eaf"

export const NO_HEADER_FOOTER_ROUTES = ["/login", "/create-account", "/forgot-password", "/reset-password/:token"]

export const BROWSE_SHOP_BY_LIST = ["trending", "local"]

export const ACCOUNT_SECTION = {
  PROFILE: "PROFILE",
  ORDER_HISTORY: "ORDER_HISTORY",
  CARD: "CARD",
  TRACK_ORDER: "TRACK_ORDER",
  WALLET: "WALLET",
  VOUCHER: "VOUCHER",
  ADDRESS: "ADDRESS",
  SAVING: "SAVING",
  APPROX_SAVED: "APPROX_SAVED",
  STATISTICS: "STATISTICS"
}

export const GUEST_PATHNAMES = [
  "/",
  "/home",
  "/browse",
  "/blog",
  "/contact-us",
  "/privacy-policy",
  "/terms-and-conditions",
  "/product/:productId",
]
export const PRIVATE_PATHNAMES = ["/wishlist", "/cart", "/account"]

export const STATIC_NO_IMAGE = "https://dev-buyradar.iapplabz.co.in/no_image_yet.png"

export const MIN_PRICE = 0;
export const MAX_PRICE = 9999999999;
