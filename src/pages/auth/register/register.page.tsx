import { FaHome } from "react-icons/fa"

import { NavLink, useNavigate } from "react-router-dom"
import { FileInputComponent, InputLabelComponet, InputTypeEnum, SelectOption, TextAreaInputComponent, TextInputComponent } from "../../../components/form/input.component"
import { useForm } from "react-hook-form"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import authSvc from "../auth.service";
import { useState, useEffect, useContext } from "react";
import { setErrorMsg } from "../../../config/helpers.config";
import AuthContext from "../../../context/auth.context";


export type RegisterDataType = {
    name: string | undefined, 
    email: string | undefined, 
    password: string | undefined,
    confirmPassword: string | undefined, 
    role: any | undefined, 
    phone: string | undefined,
    address?: string | undefined, 
    image?: any | undefined
}


const RegisterPage = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const registerDTO = Yup.object({
        name: Yup.string().min(2).required(), 
        email: Yup.string().email().required(), 
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,15}$/).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password and confirm Password should match").required(), 
        role: Yup.object({
            label: Yup.string(),
            value: Yup.string()
        }).default({label: "Buyer", value: "customer"}), 
        phone: Yup.string().required(),
        address: Yup.string().min(10).max(100), 
        image: Yup.mixed().optional().nullable()
    });

    const {control, handleSubmit, setValue, setError, formState: {errors}} = useForm({
        resolver: yupResolver(registerDTO)
    });

    const submitHandle =async (data: RegisterDataType) => {
        try{
            setLoading(true);
            data = {
                ...data, 
                role: data.role.value
            }
            await authSvc.register(data)
            toast.success("Your account has been registered successfully. Please check your email to further process.")
            navigate("/")
        } catch(exception: any) {
            setErrorMsg(exception, setError)
            toast.error("Error registering your account.")
        } finally {
            setLoading(false);
        }
    }
    const auth: any = useContext(AuthContext);
    
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
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <a className="block text-white text-4xl" href="#">
                            <FaHome />
                        </a>

                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to Ecommerce
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                            quibusdam aperiam voluptatum.
                        </p>
                    </div>
                </section>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            <a
                                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                                href="#"
                            >
                                <FaHome />
                            </a>

                            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                Welcome to Ecommerce
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                                quibusdam aperiam voluptatum.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(submitHandle)} className="mt-6 grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                                <InputLabelComponet
                                    htmlFor="name"
                                    label="Name:" />

                                <TextInputComponent 
                                    name="name"
                                    errMsg={errors?.name?.message as string}
                                    control={control}
                                    placeholder="Enter Your name.."
                                />
                            </div>


                            <div className="col-span-6">
                                <InputLabelComponet 
                                    htmlFor="email"
                                    label="Email: "
                                />
                                <TextInputComponent 
                                    name="email"
                                    errMsg={errors?.email?.message as string}
                                    control={control}
                                    placeholder="youremail@email.com"
                                    type={InputTypeEnum.EMAIL}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <InputLabelComponet 
                                    htmlFor="password"
                                    label="Password: "/>
                                <TextInputComponent 
                                    name="password"
                                    errMsg={errors?.password?.message as string}
                                    control={control}
                                    type={InputTypeEnum.PASSWORD}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <InputLabelComponet 
                                    htmlFor="confirmPassword"
                                    label="Re-Password: "/>
                                <TextInputComponent 
                                    name="confirmPassword"
                                    errMsg={errors?.confirmPassword?.message as string}
                                    control={control}
                                    type={InputTypeEnum.PASSWORD}
                                />
                            </div>

                            <div className="col-span-6">
                                <InputLabelComponet 
                                    htmlFor="phone"
                                    label="Phone: "/>
                                <TextInputComponent 
                                    name="phone"
                                    errMsg={errors?.phone?.message as string}
                                    control={control}
                                    type={InputTypeEnum.TEL}
                                />
                            </div>



                            <div className="col-span-6">
                                <InputLabelComponet 
                                    htmlFor="role"
                                    label="Role:"
                                />
                                <SelectOption 
                                    name="role"
                                    control={control}
                                    errMsg={errors?.role?.message as string}
                                    options={[
                                        {label: "Buyer", value: "customer"},
                                        {label: "Seller", value: "seller"}
                                    ]}
                                />
                            </div>


                            <div className="col-span-6">
                                <InputLabelComponet 
                                    htmlFor="address"
                                    label="Address: "
                                />

                                <TextAreaInputComponent 
                                    name="address"
                                    control={control}
                                    errMsg={errors?.address?.message as string}
                                    placeholder="Enter your address..."
                                />
                            </div>

                            
                            <div className="col-span-6">
                                <InputLabelComponet 
                                    htmlFor="image"
                                    label="Image"
                                />

                                <FileInputComponent 
                                    name="image"
                                    setValue={setValue}
                                    multiple={false}
                                />

                            </div>

                            

                            <div className="col-span-6">
                                <label htmlFor="MarketingAccept" className="flex gap-4">
                                    <input
                                        type="checkbox"
                                        id="MarketingAccept"
                                        name="marketing_accept"
                                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                                    />

                                    <span className="text-sm text-gray-700">
                                        I want to receive emails about events, product updates and company announcements.
                                    </span>
                                </label>
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500">
                                    By creating an account, you agree to our &nbsp;
                                    <NavLink to="/terms-and-conditions" className="text-gray-700 underline"> terms and conditions </NavLink>
                                    &nbsp;
                                    and
                                    &nbsp;
                                    <NavLink to="/privacy-policy" className="text-gray-700 underline">privacy policy</NavLink>.
                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    disabled={loading}
                                    className="disabled:cursor-not-allowed disabled:bg-teal-600/50 inline-block shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-900 hover:text-teal-200 focus:outline-none focus:ring active:text-teal-500"
                                >
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account? <NavLink to="/login" className="text-gray-700 underline">Log in</NavLink>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    </>)
}

export default RegisterPage