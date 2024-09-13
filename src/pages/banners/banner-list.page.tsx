import { useCallback, useEffect, useState } from "react"
import { FaGreaterThan, FaLessThan, FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { TableSkeleton } from "../../components/table/table-skeleton.component";
import { toast } from "react-toastify";
import bannerSvc from "./banner.service";
import { formatToYMD } from "../../config/helpers.config";

import { PaginationProps } from "../../config/http.config";
import TablePagination, { PaginationPageType } from "../../components/table/table-pagination.component";
import SearchFormField from "../../components/form/search.component";
import AdminPageButton from "../../components/common/links/admin-page-button.component";
import { AdminPageTitle } from "../../components/common/title/home-title.components";
import TableHeaderComponent from "../../components/table/table-header.component";
import TableActionButtons from "../../components/table/table-buttons.component";

const BannerListPage = () => {
    const [loading, setLoading] = useState(true);
    const [bannerData, setBannerData] = useState<any>();
    const [search, setSearch] = useState<string>();

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 15,
        totalPages: 1,
        total: 0
    })

    const loadBanner = useCallback(async ({page= 1,limit=15, search=null }: PaginationProps) => {
        setLoading(true)
        try {
            const response = await bannerSvc.listAllData({
                page: page,
                limit: limit, 
                search: search
            });
            setBannerData(response.data.result)
            setPagination({
                page: +response.data.meta.page,
                limit: +response.data.meta.limit,
                totalPages: +response.data.meta.totalpages,
                total: +response.data.meta.total,
            })
            setLoading(false)
        } catch (exception: any) {
            toast.error("Banner cannot be fetched at this moment.")
        }
    }, [])

    useEffect(() => {
        loadBanner({page: 1, limit: 15})
    }, [])

    useEffect(() => {
        
            const timeout = setTimeout(() => {
                loadBanner({
                    page: 1, 
                    limit: pagination.limit, 
                    search: search
                })
            }, 1500)

            return () => clearTimeout(timeout)
        
    }, [search])


    const deleteBanner = async(id: string) => {
        try {
            setLoading(true);
            await bannerSvc.deleteBannerById(id)
            toast.success("Banner deleted successfully.")
            loadBanner({page: 1, limit: 15})
            setLoading(false);
        } catch(exception) {
            console.log(exception);
            toast.error("Error deleting Banner")
        }
    }

    return (<>
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 mt-5">
            <div className="mx-auto w-full">

                
                <AdminPageTitle> Banner Page </AdminPageTitle>
                

                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <SearchFormField  setSearch={setSearch} />
                        </div>
                        <AdminPageButton url="/admin/banner/create" label="Add Banner"/>
                    </div>

                    <div className="overflow-x-auto my-3">

                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-400">
                                <TableHeaderComponent fields={["Title", "Link", "Image", "Date","Status","Actions"]} />
                            </thead>
                            <tbody>
                                {
                                    loading ? <>
                                        <TableSkeleton rows={3} col={6} />
                                    </> : <>
                                        {
                                            bannerData && bannerData.length ? <>
                                                {
                                                    bannerData.map((row: any, index: number) => (
                                                        <tr key={index} className="border-b dark:border-gray-700">
                                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.name}</th>
                                                            <td className="px-4 py-3">
                                                                <a href={row.link} className="hover:underline text-teal-600" target="_banner">
                                                                    {row.link}
                                                                </a>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <img src={row.image} className="w-32"></img>
                                                            </td>
                                                            <td className="px-4 py-3">{formatToYMD(row.startDate) + ' to ' + formatToYMD(row.endDate)}</td>
                                                            <td className="px-4 py-3">
                                                                <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${row.status === 'active' ? "bg-green-900" : 'bg-red-900'} text-white`}>
                                                                    {row.status === 'active' ? "Publish" : "Unpublish"}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 flex ">
                                                                <TableActionButtons 
                                                                    editUrl={'/admin/banner/'+row._id+'/edit'}
                                                                    id={row._id}
                                                                    deleteAction={deleteBanner}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </> : <>
                                                <tr className="border-b dark:border-gray-700">
                                                    <td colSpan={6} className="px-4 py-3 text-center">No data found</td>
                                                </tr>
                                            </>
                                        }
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        loading ? <></> : <>
                            <TablePagination 
                                pagination={{
                                    total: pagination.total,
                                    page: pagination.page,
                                    totalPages: pagination.totalPages,
                                    limit: pagination.limit
                                } as PaginationPageType}
                                search={search}
                                apiCaller={loadBanner}
                            />
                        </>
                    }
                </div>
            </div>
        </section>
    </>)
}

export default BannerListPage