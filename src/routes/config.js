import { PATHS } from './paths';
import Website from "../pages/Website/Website";
import Homepage from "../pages/Website/Homepage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Users from "../pages/dashboard/Users/Users";
import GoogleCallback from "../pages/Auth/Goolgecallback";
import Dashboard from "../pages/dashboard/Dashboard";
import Requireauth from "../pages/Requires/Requireauth";
import RequireBack from "../pages/Requires/RequireBack";
import Logout from "../pages/Auth/Logout";
import User from "../pages/dashboard/Users/User";
import AddUser from "../pages/dashboard/Users/AddUser";
import Writer from "../pages/dashboard/Writer";
import Error404 from "../pages/Error/Err404";
import Categories from "../pages/dashboard/Category/Categories";
import EditCategory from "../pages/dashboard/Category/EditCategory";
import AddCategories from "../pages/dashboard/Category/AddCategory.";
import Addproducts from "../pages/dashboard/Products/AddProducts";
import EditPropduct from "../pages/dashboard/Products/EditProducts";
import Products from "../pages/dashboard/Products/Products";
import Categorie from "../pages/Website/Categories/Categories";

// Route configurations with metadata
export const publicRoutes = {
  layout: Website,
  routes: [
    {
      path: PATHS.HOME,
      element: Homepage,
      title: 'Home'
    },
    {
      path: PATHS.CATEGORIES,
      element: Categorie,
      title: 'Categories'
    }
  ]
};

export const authRoutes = {
  layout: RequireBack,
  routes: [
    {
      path: PATHS.LOGIN,
      element: Login,
      title: 'Login'
    },
    {
      path: PATHS.REGISTER,
      element: Register,
      title: 'Register'
    }
  ]
};

export const dashboardRoutes = {
  layout: Dashboard,
  guard: Requireauth,
  guardProps: { allowedRole: ["1995", "1996", "1999"] },
  routes: [
    {
      path: PATHS.USERS,
      element: Users,
      title: 'Users',
      guard: Requireauth,
      guardProps: { allowedRole: ["1995"] }
    },
    {
      path: PATHS.USER_DETAIL,
      element: User,
      title: 'User Details',
      guard: Requireauth,
      guardProps: { allowedRole: ["1995"] }
    },
    {
      path: PATHS.USER_ADD,
      element: AddUser,
      title: 'Add User',
      guard: Requireauth,
      guardProps: { allowedRole: ["1995"] }
    },
    {
      path: PATHS.CATEGORIES_DASHBOARD,
      element: Categories,
      title: 'Categories',
      guard: Requireauth,
      guardProps: { allowedRole: ["1995", "1996"] }
    },
    {
      path: PATHS.CATEGORY_EDIT,
      element: EditCategory,
      title: 'Edit Category',
      guard: Requireauth,
      guardProps: { allowedRole: ["1995", "1996"] }
    },
    {
      path: PATHS.CATEGORY_ADD,
      element: AddCategories,
      title: 'Add Category',
      guard: Requireauth,
      guardProps: { allowedRole: ["1995", "1996"] }
    },
    {
      path: PATHS.PRODUCTS,
      element: Products,
      title: 'Products',
      guard: Requireauth,
      guardProps: { allowedRole: ["1995", "1996"] }
    },
    {
      path: PATHS.PRODUCT_EDIT,
      element: EditPropduct,
      title: 'Edit Product',
      guard: Requireauth,
      guardProps: { allowedRole: ["1995", "1996"] }
    },
    {
      path: PATHS.PRODUCT_ADD,
      element: Addproducts,
      title: 'Add Product',
      guard: Requireauth,
      guardProps: { allowedRole: ["1995", "1996"] }
    },
    {
      path: PATHS.WRITER,
      element: Writer,
      title: 'Writer',
      guard: Requireauth,
      guardProps: { allowedRole: ["1995", "1996", "1999"] }
    }
  ]
};

export const standaloneRoutes = [
  {
    path: PATHS.LOGOUT,
    element: Logout
  },
  {
    path: PATHS.GOOGLE_CALLBACK,
    element: GoogleCallback
  },
  {
    path: PATHS.NOT_FOUND,
    element: Error404
  }
];