import { Outlet } from "react-router-dom"
import AdminHeaderComponent from "../../components/header/admin-header.component"
import AdminSidebar from "../../components/sidebar/admin-sidebar.component"

const AdminLayout = () => {
    return (<>
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <AdminHeaderComponent />



            <AdminSidebar />

            <main className="p-4 md:ml-64 h-auto pt-20">
                <Outlet />
            </main>
        </div>
    </>)
}

export default AdminLayout