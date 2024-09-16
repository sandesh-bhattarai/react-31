import { useForm } from "react-hook-form"
import { InputLabelComponet, TextAreaInputComponent, TextInputComponent,SelectOption, FileInputComponent } from "../../components/form/input.component"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CancelButton, SubmitButton } from "../../components/form/button.component";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  setErrorMsg } from "../../config/helpers.config";
import brandSvc from "./brand.service";
import { useNavigate, useParams } from "react-router-dom";

const BrandEditPage = () => {
    const brandEditDto = Yup.object({
        name: Yup.string().min(3).max(100).required(),
        status: Yup.object({
            label: Yup.string().matches(/^(Publish|Unpublish)$/),
            value: Yup.string().matches(/^(active|inactive)$/)
        }), 
        description: Yup.string().nullable().optional(),
        image: Yup.mixed().optional()
    })

    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [thumb, setThumb] = useState<any>()
    const params = useParams()

    
    const {control, handleSubmit,setValue,setError, formState: {errors}} = useForm({
        resolver: yupResolver(brandEditDto)
    })

    const submitEvent = async (data: any) => {
        setLoading(true);
        try {
            let formattedData = {
                ...data, 
                status: data.status.value,
            }
            // console.log(data, formattedData)

            await brandSvc.editBrand(params.id as string, formattedData)
            toast.success("Brand Editd successfully.")
            navigate("/admin/brand")
        } catch(exception) {
            setErrorMsg(exception, setError)
            toast.error("Brand cannot be updated.")
        } finally {
            setLoading(false)
        }
    }

    const getBrandDetail = useCallback(async() => {
        try {
            const {data: {result}} = await brandSvc.getDetailById(params.id as string);

            setValue('name', result.name);
            setValue("description", result.description);
            setValue('status', {
                label: result.status === 'active' ? "Publish" : "Unpublish",
                value: result.status
            })

            setThumb(result.image)


        } catch(exception) {

        }
    }, [params]);

    useEffect(() => {
        getBrandDetail()
    },[params])

    return (<>
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 mt-5">
            <div className="mx-auto w-full">

                <h1 className="text-teal-900 font-bold text-4xl mb-5">
                    Brand Edit Page
                </h1>

                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">

                    <div className=" my-3">
                        <section className="bg-white dark:bg-gray-900">
                            <div className="py-8 px-4 mx-auto w-full">
                                <form onSubmit={handleSubmit(submitEvent)} className="mt-6 grid grid-cols-6 gap-6">
                                    
                                    <div className="col-span-6">
                                        <InputLabelComponet
                                            htmlFor="name"
                                            label="Name:" />

                                        <TextInputComponent 
                                            name="name"
                                            errMsg={errors?.name?.message as string}
                                            control={control}
                                            placeholder="Enter Brand name.."
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <InputLabelComponet
                                            htmlFor="description"
                                            label="Description:" />

                                        <TextAreaInputComponent 
                                            control={control}
                                            name="description"
                                            errMsg={errors?.description?.message as string}
                                        />
                                    </div>


                                    <div className="col-span-6">
                                        <InputLabelComponet 
                                            htmlFor="status"
                                            label="Status:"
                                        />
                                        <SelectOption 
                                            name="status"
                                            control={control}
                                            errMsg={errors?.status?.message as string}
                                            options={[
                                                {label: "Publish", value: "active"},
                                                {label: "Unpublish", value: "inactive"}
                                            ]}
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
                                            thumbClass=""
                                            thumbnail={thumb}
                                            thumbsize='400x150'
                                        />

                                    </div>

                                    <div className="col-span-6">
                                        <CancelButton label="Cancel" loading={loading} />
                                        <SubmitButton label="Submit" loading={loading} />
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default BrandEditPage