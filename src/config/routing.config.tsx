import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/home.pages";
import BestSellerPage from "../pages/best-seller/best-seller.pages";
import NotFoundPage from "../pages/errors/not-found.pages";


// login, register, product-list 
// 
const RoutingConfig = () => {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/best-seller" element={<BestSellerPage />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    </>)
}

export default RoutingConfig;