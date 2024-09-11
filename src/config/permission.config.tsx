import { useContext, useEffect, useState } from "react";
import LoadingComponent from "../components/common/loading/loading.component";
import AuthContext from "../context/auth.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PermissionChecker = ({children, allowedBy}: {children: any, allowedBy: string}) => {
    const [loading, setLoading] = useState<boolean>(true);
    
    const auth: any = useContext(AuthContext)
    const navigate = useNavigate();

    const checkRolePermission = () => {
        
        if(auth.loggedInUser.role === allowedBy) {
            setLoading(false);
        } else {
            setLoading(false);
            toast.warn("You do not have permission to access this module.")
            navigate('/'+auth.loggedInUser.role)
        }
    
    }

    useEffect(() => {
        const token = localStorage.getItem("token") || null;
        if(token) {
            if(auth.loggedInUser) {
                checkRolePermission()
            }
        } else {
            toast.error("You have not logged In. Pelase login first")
            navigate('/login')
        }
    },[auth] )

    if(loading) {
        return (<>
            <LoadingComponent />
        </>)
    } else  {
        return <>{children}</>
    }
    
}

export default PermissionChecker;