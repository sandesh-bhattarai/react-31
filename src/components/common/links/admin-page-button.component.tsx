import { NavLink } from "react-router-dom"
import { FaPlus } from "react-icons/fa"

const AdminPageButton = ({url, label}: {url: string, label: string}) => {
    return (<>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <NavLink to={url} className="flex items-center justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800">
                <FaPlus />&nbsp;{label}
            </NavLink>
        </div>
    </>)
}

export default AdminPageButton