import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "./Components/layout/Layout";
import PrivateRoute from "./pages/PrivateRoute";
import { useAppContext } from "./store/store";
import Loading from "./Components/Loading";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";

// Lazy Imports
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Categories = lazy(() => import("./pages/Categories"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Cart = lazy(() => import("./pages/Cart"));
const Error = lazy(() => import("./Components/Error"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Checkout = lazy(() => import("./pages/Checkout"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentFail = lazy(() => import("./pages/PaymentFail"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Contact = lazy(() => import("./pages/Contact"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const CODSuccess = lazy(() => import("./pages/CODSuccess"));
const WishList = lazy(() => import("./pages/WishList"));


const App = () => {
  const { haveToken } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Public Routes */}
        <Route index element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        } />

        <Route path="products" element={
          <Suspense fallback={<Loading />}>
            <Products />
          </Suspense>
        } />

        <Route path="categories" element={
          <Suspense fallback={<Loading />}>
            <Categories />
          </Suspense>
        } />

        <Route path="login" element={
          <Suspense fallback={<Loading />}>
            {!haveToken ? <Login /> : <Home />}
          </Suspense>
        } />

        <Route path="forgotPassword" element={
          <Suspense fallback={<Loading />}>
            {!haveToken ? <ForgotPassword /> : <Home />}
          </Suspense>
        } />

      <Route path="otp" element={
          <Suspense fallback={<Loading />}>
            {!haveToken ? <OTP /> : <Home />}
          </Suspense>
        } />

        <Route path="register" element={
          <Suspense fallback={<Loading />}>
            {!haveToken ? <Register /> : <Home />}
          </Suspense>
        } />

        <Route path="product/:id" element={
          <Suspense fallback={<Loading />}>
            <ProductDetails />
          </Suspense>
        } />

        <Route path="contact" element={
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        } />

        <Route path="search" element={
          <Suspense fallback={<Loading />}>
            <SearchPage />
          </Suspense>
        } />

        <Route path="wishlist" element={
          <Suspense fallback={<Loading />}>
            <WishList />
          </Suspense>
        } />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="cart" element={
            <Suspense fallback={<Loading />}>
              <Cart />
            </Suspense>
          } />

          <Route path="orderHistory" element={
            <Suspense fallback={<Loading />}>
              <OrderHistory />
            </Suspense>
          } />

          <Route path="checkout" element={
            <Suspense fallback={<Loading />}>
              <Checkout />
            </Suspense>
          } />

          <Route path="success" element={
            <Suspense fallback={<Loading />}>
              <CODSuccess />
            </Suspense>
          } />

          <Route path="paymentSuccess" element={
            <Suspense fallback={<Loading />}>
              <PaymentSuccess />
            </Suspense>
          } />

          <Route path="paymentFail" element={
            <Suspense fallback={<Loading />}>
              <PaymentFail />
            </Suspense>
          } />

          <Route path="paymentCancel" element={
            <Suspense fallback={<Loading />}>
              <PaymentCancel />
            </Suspense>
          } />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <Suspense fallback={<Loading />}>
            <Error />
          </Suspense>
        } />

      </Route>
    </Routes>
  );
};

export default App;
