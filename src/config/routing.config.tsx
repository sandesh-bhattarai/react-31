import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/home.pages";
import BestSellerPage from "../pages/best-seller/best-seller.pages";
import NotFoundPage from "../pages/errors/not-found.pages";
import CategoryDetail from "../pages/category/category-detail.page";

import { HomePageLayout, AdminLayout } from "../pages/layouts";
import AdminDashboardPage from "../pages/dashboard/admin-dashboard.page";

import "react-toastify/ReactToastify.css"
import { ToastContainer } from "react-toastify";

import {
    ActivateUser,
    LoginPage,
    RegisterPage
} from "../pages/auth";
import { AuthProvider } from "../context/auth.context";
import PermissionChecker from "./permission.config";

import { BannerCreatePage, BannerEditPage, BannerListPage } from "../pages/banners";

// login, register, product-list 
// 
const RoutingConfig = () => {
    
    return (<>
    <AuthProvider>
        <BrowserRouter>
            <ToastContainer></ToastContainer>
                <Routes>

                    <Route path="/" element={<HomePageLayout />}>
                        <Route index element={<HomePage />}></Route>
                        <Route path="best-seller" element={<BestSellerPage />} />

                        <Route path="category-detail/:slug" element={<CategoryDetail />}></Route>

                        <Route path='login' element={<LoginPage />}></Route>
                        <Route path="register" element={<RegisterPage />}></Route>
                        <Route path="activate/:token" element={<ActivateUser />}></Route>

                        <Route path="*" element={<NotFoundPage />} />
                    </Route>

                    <Route path="/admin" element={<PermissionChecker allowedBy="admin">
                            <AdminLayout />
                        </PermissionChecker>}>
                        <Route index element={<AdminDashboardPage />} />

                        <Route path="banner" element={<BannerListPage />} />
                        <Route path="banner/create" element={<BannerCreatePage />} />
                        <Route path="banner/:id/edit" element={<BannerEditPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>

                    <Route path="/seller" element={<PermissionChecker allowedBy="seller">
                            <AdminLayout />
                        </PermissionChecker>}>
                        <Route index element={<AdminDashboardPage />} />

                        <Route path="*" element={<NotFoundPage />} />
                    </Route>


                </Routes>
            </BrowserRouter>
        </AuthProvider>

    </>)
}

export default RoutingConfig;