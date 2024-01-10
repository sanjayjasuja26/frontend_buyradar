import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getBuyRadarUser, getUserMode } from "utils/helpers";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";

export const GuestRoute: React.FC<{
  render: any;
  path: string;
  exact: boolean;
}> = (props) => {
  let mode = getUserMode();
  let user = getBuyRadarUser();
  
  const condition = (mode || user) ? true : false;
    
  return condition ? <Route {...props} /> : <Redirect to="/login" />;
};

export const PrivateRoute: React.FC<{
  render: any;
  path: string;
  exact: boolean;
}> = (props) => {
  let user = getBuyRadarUser();
  const condition = user && user.token ? true : false;
  
  return condition 
  ? 
  <Route {...props} /> 
  : 
  <Redirect to="/" />    
  // <Redirect to={{
  //   pathname: "/login",   
  //   state: { props }
  // }} />;
};

export const NoLoggedInRoute: React.FC<{
  render: any;
  path: string;
  exact: boolean;
}> = (props: any) => {
  let user = getBuyRadarUser();
  const condition = user && user.token ? true : false;

  let redirection = props?.location?.state?.path;
  
  return !condition ? <Route {...props} /> : <Redirect to={redirection ? redirection : "/"} />;
};

const ScrollToTop = ({ history }: { history: any }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
};

export const ScrollToTopWithRouter = withRouter(ScrollToTop);
