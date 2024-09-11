import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authSvc from "../auth.service";
import AuthContext from "../../../context/auth.context";


export type CredentialType = {
    email: string, 
    password: string
}

export interface AuthContextData {
    loggedInUser: any,
    setLoggedInUser: any
}

const LoginPage = () => {
    const loginDTO = Yup.object({
        email: Yup.string().email().required(), 
        password: Yup.string().min(8).required()
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth: any = useContext(AuthContext)


    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(loginDTO)
    })


    const submitEvent =async (credentials: CredentialType) => {
        setLoading(true);
        try{
            const response = await authSvc.login(credentials);
            toast.success(response.message)
            navigate('/'+response.result.detail.role)
        }catch(exception: any) {
            toast.error(exception.data.message);
        } finally {
            setLoading(false)
        }
    }

    const loginCheck =async () => {
        try {
            if(auth.loggedInUser) {
                toast.info("You are already loggedIn.")
                navigate("/"+auth.loggedInUser.role)    
            }
        } catch(exception){
            //
            console.log(exception)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token') || null
        if(token) {
            loginCheck()
        }
    }, [auth])
    return (<>
        
        <section className="bg-teal-100 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(submitEvent)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input {...register("email")} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                                <span className="text-red-800">
                                    {
                                        errors?.email?.message
                                    }
                                </span>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input {...register("password")}  type="password" id="password" placeholder="••••••••" className={` border bg-gray-50  ${errors?.password?.message ? 'border-red-300 focus:ring-red-600 focus:border-red-600' : "border-gray-300 focus:ring-teal-600 focus:border-teal-600"} text-gray-900 rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                                <span className="text-red-800">
                                    {
                                        errors?.password?.message
                                    }
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm font-medium text-teal-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button
                            disabled={loading}
                            type="submit" className=" disabled:bg-teal-600/70 disabled:cursor-not-allowed w-full text-white bg-teal-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <NavLink to="/register" className="font-medium text-teal-600 hover:underline dark:text-primary-500">Sign up</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default LoginPage;