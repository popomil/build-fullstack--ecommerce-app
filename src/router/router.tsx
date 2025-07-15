import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "../pages";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/Dashboard";
import DashboardPage from "../pages/Dashboard";
import Product from "../pages/ProductDetails";
import ContactPage from "../pages/Contact";
import ErrorHandler from "../components/errors/ErrorHandler";
import LoginPage from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";
import NotFoundPage from "../pages/NotFoundPage";
import ProductsPage from "../pages/Products";
import CookieService from "../services/CookieService";
import DashboardProducts from "../pages/Dashboard/DashboardProducts";
import Cart from "../pages/Cart";
import AboutPage from "../pages/About";
import CheckoutPage from "../pages/checkout";

const isAllowed = CookieService.get("jwt");
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ROOT LAYOUT */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="product/:id"
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <Product />
            </ProtectedRoutes>
          }
        />
             <Route
          path="cart"
          element={<Cart/>}
        />
             <Route
          path="checkout"
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <CheckoutPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <ProductsPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="about"
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <AboutPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="contact"
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <ContactPage />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route
        path="login"
        element={
          <ProtectedRoutes isAllowed={!isAllowed} redirectPath="/">
            <LoginPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="register"
        element={
          <ProtectedRoutes isAllowed={!isAllowed} redirectPath="/">
            <Register />
          </ProtectedRoutes>
        }
      />
      {/* Dashboard Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route
          index
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <DashboardPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <DashboardProducts />
            </ProtectedRoutes>
          }
        />
        <Route
          path="contact"
          element={
            <ProtectedRoutes redirectPath="/login" isAllowed={isAllowed}>
              <ContactPage />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default router;
