export const BACKEND_API_BASE_URL = process.env.REACT_APP_URL === "dev"
  ? `${process.env.REACT_APP_BACKEND_API_BASE_URL_DEV}/api`
  : `${process.env.REACT_APP_BACKEND_API_BASE_URL_PRODUCTION}/api`;

