import { useForm } from "react-hook-form"
import { InputLabelComponet, InputTypeEnum, TextInputComponent,SelectOption, FileInputComponent } from "../../components/form/input.component"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CancelButton, SubmitButton } from "../../components/form/button.component";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatToYMD, setErrorMsg } from "../../config/helpers.config";
import bannerSvc from "./banner.service";
import { useNavigate, useParams } from "react-router-dom";

const BannerEditPage = () => {
    const bannerEditDto = Yup.object({
        name: Yup.string().min(3).max(100).required(),
        status: Yup.object({
            label: Yup.string().matches(/^(Publish|Unpublish)$/),
            value: Yup.string().matches(/^(active|inactive)$/)
        }), 
        link: Yup.string().url().default(null),
        startDate: Yup.string().required(),
        endDate: Yup.string().required(),     // TODO: enddate should be greater than startDate
        image: Yup.mixed().optional()
    })

    const [detail, setDetail] = useState<any>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [thumb, setThumb] = useState<any>()
    const params = useParams()

    
    const {control, handleSubmit,setValue,setError, formState: {errors}} = useForm({
        resolver: yupResolver(bannerEditDto)
    })

    const submitEvent = async (data: any) => {
        setLoading(true);
        try {
            let formattedData = {
                ...data, 
                status: data.status.value,
                startDate: formatToYMD(data.startDate),
                endDate: formatToYMD(data.endDate)
            }
            // console.log(data, formattedData)

            await bannerSvc.editBanner(params.id as string, formattedData)
            toast.success("Banner Editd successfully.")
            navigate("/admin/banner")
        } catch(exception) {
            setErrorMsg(exception, setError)
            toast.error("Banner cannot be updated.")
        } finally {
            setLoading(false)
        }
    }

    const getBannerDetail = useCallback(async() => {
        try {
            const {data: {result}} = await bannerSvc.getDetailById(params.id as string);

            setValue('name', result.name);
            setValue('link', result.link);
            setValue('startDate',  formatToYMD(result.startDate));
            setValue('endDate',  formatToYMD(result.endDate));

            setValue('status', {
                label: result.status === 'active' ? "Publish" : "Unpublish",
                value: result.status
            })

            setThumb(result.image)


        } catch(exception) {

        }
    }, [params]);

    useEffect(() => {
        getBannerDetail()
    },[params])

    return (<>
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 mt-5">
            <div className="mx-auto w-full">

                <h1 className="text-teal-900 font-bold text-4xl mb-5">
                    Banner Edit Page
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
                                            placeholder="Enter Banner name.."
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <InputLabelComponet
                                            htmlFor="url"
                                            label="Url:" />

                                        <TextInputComponent 
                                            name="link"
                                            type={InputTypeEnum.URL}
                                            errMsg={errors?.link?.message as string}
                                            control={control}
                                            placeholder="Enter Banner link.."
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <InputLabelComponet
                                            htmlFor="startDate"
                                            label="Start Date:" />

                                        <TextInputComponent 
                                            name="startDate"
                                            type={InputTypeEnum.DATE}
                                            errMsg={errors?.startDate?.message as string}
                                            control={control}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <InputLabelComponet
                                            htmlFor="endDate"
                                            label="End Date:" />

                                        <TextInputComponent 
                                            name="endDate"
                                            type={InputTypeEnum.DATE}
                                            errMsg={errors?.endDate?.message as string}
                                            control={control}
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

export default BannerEditPage