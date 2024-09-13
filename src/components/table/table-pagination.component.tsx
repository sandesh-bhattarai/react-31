import { FaGreaterThan, FaLessThan } from "react-icons/fa";
export type PaginationPageType =  {
    total: number, 
    limit: number,
    page: number,
    totalPages: number
}
export type PaginationDataProps = {
    pagination: PaginationPageType,
    apiCaller: Function, 
    search?: string | null
}
const TablePagination = ({pagination,apiCaller, search=null }: PaginationDataProps) => {
    return (<>
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing&nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">
                    {
                        pagination.page === 1 ? '1' : ((pagination.page - 1) * pagination.limit + 1)
                    }
                    -
                    {
                        (pagination.total > pagination.limit) ? (
                            pagination.page === 1 ? pagination.limit : (
                                pagination.total < (pagination.limit * (pagination.page) + 1) ? (pagination.total) : (pagination.limit * (pagination.page) + 1)
                            )
                        ) : pagination.total
                    }
                </span>
                &nbsp;of&nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">
                    {pagination.total}
                </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
                {
                    pagination.page > 1 ? <>
                        <li>
                            <a
                                onClick={(e: any) => {
                                    e.preventDefault();
                                    apiCaller({
                                        page: pagination.page - 1,
                                        limit: pagination.limit,
                                        search: search
                                    })
                                }}
                                href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <FaLessThan className="text-sm" />
                            </a>
                        </li>
                    </> : <></>
                }

                {
                    pagination.totalPages > 0 ? [...Array(pagination.totalPages)].map((_: any, i: number) => (
                        <li key={i}>
                            <a onClick={(e: any) => {
                                e.preventDefault();
                                apiCaller({
                                    page: i + 1,
                                    limit: pagination.limit,
                                    search: search
                                })
                            }} href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-teal-50 border border-primary-300 hover:bg-teal-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                                {i + 1}
                            </a>
                        </li>
                    )) : <></>
                }

                {
                    (pagination.page !== pagination.totalPages && pagination.total > pagination.limit) ? <><li>
                        <a
                            onClick={(e: any) => {
                                e.preventDefault();
                                apiCaller({
                                    page: pagination.page + 1,
                                    limit: pagination.limit,
                                    search: search
                                })
                            }}
                            href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <FaGreaterThan className="text-sm" />
                        </a>
                    </li></> : <></>
                }
            </ul>
        </nav>
    </>)
}

export default TablePagination;