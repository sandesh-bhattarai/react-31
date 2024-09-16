import {  FaCog, FaDollarSign, FaHome, FaImages, FaShoppingBag, FaShoppingCart, FaSitemap, FaSmile, FaUser, FaUsers } from "react-icons/fa"
import { NavLink } from "react-router-dom"

type MenuItemProps ={
    url: string,
    icon: any, 
    label: string
}
const MenuItem = ({url, icon, label}: MenuItemProps) => {
    return (<>
        <li>
            <NavLink
                to={url}
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
                {icon}
                <span className="ml-3">{label}</span>
            </NavLink>
        </li>
    </>)
}
const AdminSidebar = () => {
    const menuItems = [
        {
            url: '/',
            icon: <FaHome />,
            label: "Home"
        },
        {
            url: '/admin',
            icon: <FaCog />,
            label: "Dashboard"
        },
        {
            url: '/admin/banner',
            icon: <FaImages />,
            label: "Banner"
        },
        {
            url: '/admin/brand',
            icon: <FaSmile />,
            label: "Brands"
        },
        {
            url: '/admin/categories',
            icon: <FaSitemap />,
            label: "Categories"
        },
        {
            url: '/admin/users',
            icon: <FaUser />,
            label: "Users"
        },
        {
            url: '/admin/products',
            icon: <FaShoppingBag />,
            label: "Products"
        },
        {
            url: '/admin/orders',
            icon: <FaShoppingCart />,
            label: "Orders"
        },
        {
            url: '/admin/transactions',
            icon: <FaDollarSign />,
            label: "Transactions"
        },
    ]

    
    return (<>
    
        <aside
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidenav"
            id="drawer-navigation"
        >
            <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                
                <ul className="space-y-2">
                    {
                        menuItems && menuItems.map((item: any, index: number) => (
                            <MenuItem url={item.url} icon={item.icon} label={item.label} key={index} />
                        ))
                    }                    
                </ul>
                
                
            </div>
            <div
                className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20"
            >
                <a
                    href="#"
                    className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                        ></path>
                    </svg>
                </a>
                <a
                    href="#"
                    data-tooltip-target="tooltip-settings"
                    className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </a>
                <div
                    id="tooltip-settings"
                    role="tooltip"
                    className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
                >
                    Settings page
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>


            </div>
        </aside>
    </>)
}

export default AdminSidebar