type TableSkeletonProps = {
    rows?: number, 
    col: number
}
export const TableSkeleton = ({rows=3, col}: TableSkeletonProps) => {
    return (<>
        {
            [...Array(rows)].map((_: any, i:number) => (
                <tr key={i} className="border-b dark:border-gray-700">
                    {
                        [...Array(col)].map((_: any, j: number) => (
                            <td className="px-4 py-3" key={j}>
                                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                            </td>
                        ))
                    }
                </tr>
            ))
        }
    </>)
}