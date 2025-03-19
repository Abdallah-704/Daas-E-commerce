import { Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "../components/loading/Loading";
import { Homepage, Categories, ProductPage } from "../pages/Website";
import { Login, Register, Logout, GoogleCallback } from "../pages/Auth";
import { RequireAuth, RequireBack } from "../pages/Requires";
import {
  Dashboard,
  Users,
  User,
  AddUser,
  Writer,
  Categories as DashboardCategories,
  EditCategory,
  AddCategories,
  Products,
  EditProduct,
  AddProducts
} from "../pages/dashboard";
import { Error404 } from "../pages/Error";
import { Website } from "../pages/Website";

// Lazy load components
const HomepageLazy = React.lazy(() => import("../pages/Website/Homepage"));
const CategoriesLazy = React.lazy(() => import("../pages/Website/Categories/Categories"));
const ProductPageLazy = React.lazy(() => import("../pages/Website/product/ProductPage"));
const LoginLazy = React.lazy(() => import("../pages/Auth/Login"));
const RegisterLazy = React.lazy(() => import("../pages/Auth/Register"));
const LogoutLazy = React.lazy(() => import("../pages/Auth/Logout"));
const GoogleCallbackLazy = React.lazy(() => import("../pages/Auth/Goolgecallback"));
const RequireAuthLazy = React.lazy(() => import("../pages/Requires/Requireauth"));
const RequireBackLazy = React.lazy(() => import("../pages/Requires/RequireBack"));
const DashboardLazy = React.lazy(() => import("../pages/dashboard/Dashboard"));
const UsersLazy = React.lazy(() => import("../pages/dashboard/Users/Users"));
const UserLazy = React.lazy(() => import("../pages/dashboard/Users/User"));
const AddUserLazy = React.lazy(() => import("../pages/dashboard/Users/AddUser"));
const WriterLazy = React.lazy(() => import("../pages/dashboard/Writer"));
const DashboardCategoriesLazy = React.lazy(() => import("../pages/dashboard/Category/Categories"));
const EditCategoryLazy = React.lazy(() => import("../pages/dashboard/Category/EditCategory"));
const AddCategoriesLazy = React.lazy(() => import("../pages/dashboard/Category/AddCategory."));
const ProductsLazy = React.lazy(() => import("../pages/dashboard/Products/Products"));
const EditProductLazy = React.lazy(() => import("../pages/dashboard/Products/EditProducts"));
const AddProductsLazy = React.lazy(() => import("../pages/dashboard/Products/AddProducts"));
const Error404Lazy = React.lazy(() => import("../pages/Error/Err404"));
const WebsiteLazy = React.lazy(() => import("../pages/Website/Website"));

// Wrap components with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const routes = [
  // Website Routes
  <Route element={withSuspense(<WebsiteLazy />)} key="website">
    <Route path="/" element={withSuspense(<HomepageLazy />)} />
    <Route path="/categories" element={withSuspense(<CategoriesLazy />)} />
    <Route path="/product/:id" element={withSuspense(<ProductPageLazy />)} />
  </Route>,

  // Auth Routes
  <Route element={withSuspense(<RequireBackLazy />)} key="auth">
    <Route path="/login" element={withSuspense(<LoginLazy />)} />
    <Route path="/register" element={withSuspense(<RegisterLazy />)} />
  </Route>,

  // Dashboard Routes
  <Route element={withSuspense(<RequireAuthLazy allowedRole={["1995", "1996", "1999"]} />)} key="dashboard">
    <Route path="/dashboard" element={withSuspense(<DashboardLazy />)}>
      <Route element={withSuspense(<RequireAuthLazy allowedRole={["1995"]} />)}>
        <Route path="users" element={withSuspense(<UsersLazy />)} />
        <Route path="users/:id" element={withSuspense(<UserLazy />)} />
        <Route path="user/add" element={withSuspense(<AddUserLazy />)} />
      </Route>

      <Route element={withSuspense(<RequireAuthLazy allowedRole={["1995", "1999"]} />)}>
        {/* Categories */}
        <Route path="categories" element={withSuspense(<DashboardCategoriesLazy />)} />
        <Route path="categories/:id" element={withSuspense(<EditCategoryLazy />)} />
        <Route path="categorie/add" element={withSuspense(<AddCategoriesLazy />)} />

        {/* Products */}
        <Route path="products" element={withSuspense(<ProductsLazy />)} />
        <Route path="products/:id" element={withSuspense(<EditProductLazy />)} />
        <Route path="product/add" element={withSuspense(<AddProductsLazy />)} />
      </Route>

      <Route element={withSuspense(<RequireAuthLazy allowedRole={["1995", "1996"]} />)}>
        <Route path="writer" element={withSuspense(<WriterLazy />)} />
      </Route>
    </Route>
  </Route>,

  // Standalone Routes
  <Route path="/logout" element={withSuspense(<LogoutLazy />)} key="logout" />,
  <Route path="/auth/google/callback" element={withSuspense(<GoogleCallbackLazy />)} key="google" />,
  <Route path="/*" element={withSuspense(<Error404Lazy />)} key="error" />
];

export default routes;