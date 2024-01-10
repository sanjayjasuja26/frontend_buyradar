import { Switch, Route, Redirect } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "features/home";
import {
  GuestRoute,
  PrivateRoute,
  NoLoggedInRoute,
  ScrollToTopWithRouter,
} from "./routeHelpers";
import Loader from "components/lazyLoader";
// const Home = lazy(
//   () => import(/*webpackChunkName: "login"*/ "../../features/home")
// );
const Login = lazy(
  () => import(/*webpackChunkName: "login"*/ "../../features/auth/login")
);
const Register = lazy(
  () => import(/*webpackChunkName: "register"*/ "../../features/auth/register")
);
const ForgotPassword = lazy(
  () =>
    import(
      /*webpackChunkName: "forgot-password"*/ "../../features/auth/forgotPassword"
    )
);
const ResetPassword = lazy(
  () =>
    import(
      /*webpackChunkName: "reset-password"*/ "../../features/auth/resetPassword"
    )
);
const Blog = lazy(
  () => import(/*webpackChunkName: "blog"*/ "../../features/blog")
);
const Browse = lazy(
  () => import(/*webpackChunkName: "browse"*/ "../../features/browse")
);
const Category = lazy(
  () => import(/*webpackChunkName: "category"*/ "../../features/category")
);
const ContactUs = lazy(
  () => import(/*webpackChunkName: "Contact-us"*/ "../../features/contactUs")
);
const ProductDetail = lazy(
  () =>
    import(
      /*webpackChunkName: "product-detail"*/ "../../features/productDetail"
    )
);
const SearchResults = lazy(
  () => import(/*webpackChunkName: "search"*/ "../../features/search")
);
const UserAccount = lazy(
  () =>
    import(/*webpackChunkName: "user-account"*/ "../../features/userAccount")
);
const Cart = lazy(
  () => import(/*webpackChunkName: "cart"*/ "../../features/userAccount/cart")
);
const WishList = lazy(
  () =>
    import(
      /*webpackChunkName: "wish-list"*/ "../../features/userAccount/wishList"
    )
);
const PrivacyPolicy = lazy(
  () =>
    import(
      /*webpackChunkName: "privacy-policy"*/ "../../components/privacyPolicy"
    )
);
const TermsAndConditions = lazy(
  () =>
    import(
      /*webpackChunkName: "terms-conditions"*/ "../../components/termsAndConditions"
    )
);

const Routes = () => {
  const CustomLoader = () => {
    return (
      <div className="page-loader">
        <Loader />
      </div>
    );
  };
  return (
    <>
      <ScrollToTopWithRouter />
      <Switch>
        <GuestRoute exact path="/" render={() => <Home />} />
        <GuestRoute exact path="/home" render={() => <Home />} />
        <GuestRoute
          exact
          path="/browse"
          render={() => (
            <Suspense fallback={<Loader />}>
              <Browse />
            </Suspense>
          )}
        />
        <GuestRoute
          exact
          path="/category"
          render={() => (
            <Suspense fallback={<Loader />}>
              <Category />
            </Suspense>
          )}
        />
        <GuestRoute
          exact
          path="/blog"
          render={() => (
            <Suspense fallback={<Loader />}>
              <Blog />
            </Suspense>
          )}
        />
        <GuestRoute
          exact
          path="/contact-us"
          render={() => (
            <Suspense fallback={<Loader />}>
              <ContactUs />
            </Suspense>
          )}
        />
        <GuestRoute
          exact
          path="/privacy-policy"
          render={() => (
            <Suspense fallback={<Loader />}>
              <PrivacyPolicy />
            </Suspense>
          )}
        />
        <GuestRoute
          exact
          path="/terms-and-conditions"
          render={() => (
            <Suspense fallback={<Loader />}>
              <TermsAndConditions />
            </Suspense>
          )}
        />
        <GuestRoute
          exact
          path="/product/:productId"
          render={() => (
            <Suspense fallback={<Loader />}>
              <ProductDetail />
            </Suspense>
          )}
        />
        <GuestRoute
          exact
          path="/search"
          render={() => (
            <Suspense fallback={<Loader />}>
              <SearchResults />
            </Suspense>
          )}
        />
        <PrivateRoute
          exact
          path="/wishlist"
          render={() => (
            <Suspense fallback={<Loader />}>
              <WishList />
            </Suspense>
          )}
        />
        <PrivateRoute
          exact
          path="/cart"
          render={() => (
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          )}
        />
        <PrivateRoute
          exact
          path="/account"
          render={() => (
            <Suspense fallback={<Loader />}>
              <UserAccount />
            </Suspense>
          )}
        />
        <NoLoggedInRoute
          exact
          path="/login"
          render={() => (
            <Suspense fallback={<CustomLoader />}>
              <Login />
            </Suspense>
          )}
        />
        <NoLoggedInRoute
          exact
          path="/create-account"
          render={() => (
            <Suspense fallback={<CustomLoader />}>
              <Register />
            </Suspense>
          )}
        />
        <NoLoggedInRoute
          exact
          path="/forgot-password"
          render={() => (
            <Suspense fallback={<CustomLoader />}>
              <ForgotPassword />
            </Suspense>
          )}
        />
        <Route
          exact
          path="/reset-password/:token"
          render={() => (
            <Suspense fallback={<CustomLoader />}>
              <ResetPassword />
            </Suspense>
          )}
        />
        <Redirect from="*" to="/login" />
      </Switch>
    </>
  );
};

export default Routes;
