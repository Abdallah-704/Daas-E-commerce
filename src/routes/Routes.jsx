import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../components/loading/Loading";
import PageTransition from "../components/animations/PageTransition";
import SmoothScroll from "../components/common/SmoothScroll";

// Lazy load components
const Homepage = React.lazy(() => import("../pages/Website/Homepage"));
const Categories = React.lazy(() => import("../pages/Website/Categories/Categories"));
const ProductPage = React.lazy(() => import("../pages/Website/product/ProductPage"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Register = React.lazy(() => import("../pages/Auth/Register"));
const Logout = React.lazy(() => import("../pages/Auth/Logout"));
const GoogleCallback = React.lazy(() => import("../pages/Auth/Goolgecallback"));
const RequireAuth = React.lazy(() => import("../pages/Requires/Requireauth"));
const RequireBack = React.lazy(() => import("../pages/Requires/RequireBack"));
const Dashboard = React.lazy(() => import("../pages/dashboard/Dashboard"));
const Users = React.lazy(() => import("../pages/dashboard/Users/Users"));
const User = React.lazy(() => import("../pages/dashboard/Users/User"));
const AddUser = React.lazy(() => import("../pages/dashboard/Users/AddUser"));
const Writer = React.lazy(() => import("../pages/dashboard/Writer"));
const DashboardCategories = React.lazy(() => import("../pages/dashboard/Category/Categories"));
const EditCategory = React.lazy(() => import("../pages/dashboard/Category/EditCategory"));
const AddCategories = React.lazy(() => import("../pages/dashboard/Category/AddCategory."));
const Products = React.lazy(() => import("../pages/dashboard/Products/Products"));
const EditProduct = React.lazy(() => import("../pages/dashboard/Products/EditProducts"));
const AddProducts = React.lazy(() => import("../pages/dashboard/Products/AddProducts"));
const Error404 = React.lazy(() => import("../pages/Error/Err404"));
const Website = React.lazy(() => import("../pages/Website/Website"));

const Routes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <PageTransition>
                <SmoothScroll>
                    <RouterRoutes>
                        {/* Website Routes */}
                        <Route element={<Website />} path="/">
                            <Route index element={<Homepage />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="product/:id" element={<ProductPage />} />
                        </Route>

                        {/* Auth Routes */}
                        <Route element={<RequireBack />} path="/">
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                        </Route>

                        {/* Dashboard Routes */}
                        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />} path="/dashboard">
                            <Route element={<Dashboard />}>
                                <Route element={<RequireAuth allowedRole={["1995"]} />}>
                                    <Route path="users" element={<Users />} />
                                    <Route path="users/:id" element={<User />} />
                                    <Route path="user/add" element={<AddUser />} />
                                </Route>

                                <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
                                    <Route path="categories" element={<DashboardCategories />} />
                                    <Route path="categories/:id" element={<EditCategory />} />
                                    <Route path="categorie/add" element={<AddCategories />} />
                                    <Route path="products" element={<Products />} />
                                    <Route path="products/:id" element={<EditProduct />} />
                                    <Route path="product/add" element={<AddProducts />} />
                                </Route>

                                <Route element={<RequireAuth allowedRole={["1995", "1996"]} />}>
                                    <Route path="writer" element={<Writer />} />
                                </Route>
                            </Route>
                        </Route>

                        {/* Standalone Routes */}
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/auth/google/callback" element={<GoogleCallback />} />
                        <Route path="*" element={<Error404 />} />
                    </RouterRoutes>
                </SmoothScroll>
            </PageTransition>
        </Suspense>
    );
};

export default Routes;
