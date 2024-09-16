import { useCallback, useEffect, useState } from "react"
import { TableSkeleton } from "../../components/table/table-skeleton.component";
import { toast } from "react-toastify";
import brandSvc from "./brand.service";
import { formatToYMD } from "../../config/helpers.config";

import { PaginationProps } from "../../config/http.config";
import TablePagination, { PaginationPageType } from "../../components/table/table-pagination.component";
import SearchFormField from "../../components/form/search.component";
import AdminPageButton from "../../components/common/links/admin-page-button.component";
import { AdminPageTitle } from "../../components/common/title/home-title.components";
import TableHeaderComponent from "../../components/table/table-header.component";
import TableActionButtons from "../../components/table/table-buttons.component";

const BrandListPage = () => {
    const [loading, setLoading] = useState(true);
    const [brandData, setBrandData] = useState<any>();
    const [search, setSearch] = useState<string>();

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 15,
        totalPages: 1,
        total: 0
    })

    const loadBrand = useCallback(async ({page= 1,limit=15, search=null }: PaginationProps) => {
        setLoading(true)
        try {
            const response = await brandSvc.listAllData({
                page: page,
                limit: limit, 
                search: search
            });
            setBrandData(response.data.result)
            setPagination({
                page: +response.data.meta.page,
                limit: +response.data.meta.limit,
                totalPages: +response.data.meta.totalpages,
                total: +response.data.meta.total,
            })
            setLoading(false)
        } catch (exception: any) {
            toast.error("Brand cannot be fetched at this moment.")
        }
    }, [])

    useEffect(() => {
        loadBrand({page: 1, limit: 15})
    }, [])

    useEffect(() => {
        
            const timeout = setTimeout(() => {
                loadBrand({
                    page: 1, 
                    limit: pagination.limit, 
                    search: search
                })
            }, 1500)

            return () => clearTimeout(timeout)
        
    }, [search])


    const deleteBrand = async(id: string) => {
        try {
            setLoading(true);
            await brandSvc.deleteBrandById(id)
            toast.success("Brand deleted successfully.")
            loadBrand({page: 1, limit: 15})
            setLoading(false);
        } catch(exception) {
            console.log(exception);
            toast.error("Error deleting Brand")
        }
    }

    return (<>
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 mt-5">
            <div className="mx-auto w-full">

                
                <AdminPageTitle> Brand Page </AdminPageTitle>
                

                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <SearchFormField  setSearch={setSearch} />
                        </div>
                        <AdminPageButton url="/admin/brand/create" label="Add Brand"/>
                    </div>

                    <div className="overflow-x-auto my-3">

                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-400">
                                <TableHeaderComponent fields={["Title", "Page", "Image","Status","Actions"]} />
                            </thead>
                            <tbody>
                                {
                                    loading ? <>
                                        <TableSkeleton rows={3} col={6} />
                                    </> : <>
                                        {
                                            brandData && brandData.length ? <>
                                                {
                                                    brandData.map((row: any, index: number) => (
                                                        <tr key={index} className="border-b dark:border-gray-700">
                                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.name}</th>
                                                            <td className="px-4 py-3">
                                                                
                                                                <a href={'/brand/'+row.slug} className="hover:underline text-teal-600" target="_brand">
                                                                    {row.slug}
                                                                </a>

                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <img src={row.image} className="w-16"></img>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${row.status === 'active' ? "bg-green-900" : 'bg-red-900'} text-white`}>
                                                                    {row.status === 'active' ? "Publish" : "Unpublish"}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 flex ">
                                                                <TableActionButtons 
                                                                    editUrl={'/admin/brand/'+row._id+'/edit'}
                                                                    id={row._id}
                                                                    deleteAction={deleteBrand}
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
                                apiCaller={loadBrand}
                            />
                        </>
                    }
                </div>
            </div>
        </section>
    </>)
}

export default BrandListPage