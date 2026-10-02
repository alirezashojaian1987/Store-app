import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ShopPage from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/Cart";
import CategoryPage from "../pages/Category";
import Error from "../pages/Error";

export const router=createBrowserRouter([
    {
        element:<RootLayout/>,
        errorElement:<Error/>,
        children:[
            {
                index:true,
                element:<ShopPage/>,
            },

            {
                path:'/product/:id',
                element:<ProductDetail/>,
            },

            {
                path:'/cart',
                element:<CartPage/>,
            },

            {
                path:'/category/:category',
                element:<CategoryPage/>,
            },
        ]
    },
])