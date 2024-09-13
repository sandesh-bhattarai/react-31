import { FaPen, FaTrash } from "react-icons/fa"
import { toast } from "react-toastify"
import Swal from 'sweetalert2'
import { NavLink } from "react-router-dom"

const TableActionButtons = ({id, deleteAction, editUrl}: {id: string, deleteAction: Function, editUrl: string}) => {
    const handleDelete =async (e: any) => {
        e.preventDefault()
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
            if(result.isConfirmed) {
                deleteAction(id);
            }
        } catch(exception) {
            toast.error("Error deleting Data")
        }
    }
    return (<>
        <NavLink to={editUrl} className="bg-teal-800 rounded-full w-8 h-8 py-2 px-2 me-3 hover:bg-teal-950 hover:cursor-pointer">
            <FaPen className="text-white text-sm" />
        </NavLink>
        <a onClick={handleDelete} href="" className="bg-red-800 rounded-full w-8 h-8 py-2 px-2 hover:bg-red-950 hover:cursor-pointer">
            <FaTrash className="text-white text-sm" />
        </a>
    </>)
}

export default TableActionButtons