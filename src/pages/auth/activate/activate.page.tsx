import { useEffect, useState } from "react"
import LoadingComponent, { LoadingSize } from "../../../components/common/loading/loading.component"
import { useNavigate, useParams } from "react-router-dom"
import authSvc from "../auth.service"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

const ActivateUser = () => {
    const [loading, setLoading] = useState(true)
    const params = useParams();
    const navigate = useNavigate();

    const activateUser = async() => {
        try{
            await authSvc.activateUser(params.token as string)
            toast.success("Your account has been successfully activated. Please login to contiue...")
            navigate('/login')
        } catch(exception: any) {
            // handling 
            if(+exception.status === 400 && exception.data.status === 'ACTIVATION_TOKEN_EXPIRED'){
                Swal.fire({
                    title: "Token Expired!",
                    text: "Your token has been expired. Do you wish to resend the email?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm"
                }).then(async(result) => {
                    if (result.isConfirmed) {
                        await authSvc.resendActivationToken(params.token as string)
                        // notify 
                        toast.success("A new token has been resent. Please check your email.")
                        navigate('/')
                    } else {
                        navigate('/')
                    }
                    
                });
            } else {
                toast.success("Error activating your account...")
                navigate('/')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        activateUser()    
    },[])


    const loginCheck =async () => {
        try {
            const {data} = await authSvc.getLoggedInuser()
            // console.log("Data:", data)
            toast.info("You are already loggedIn.")
            navigate("/"+data.result.role)
        } catch(exception){
            //
            console.log(exception)
        }
    }
    useEffect(() => {
        // login check 
        loginCheck()
    }, [])
    return (<>
        {
            loading ? <>
                <div className="flex flex-wrap gap-2 my-5">
                    <div className="justify-center mx-5">
                        <LoadingComponent size={LoadingSize.XL} />
                    </div>
                </div>
            </> : <></>
        }
    </>)
}

export default ActivateUser