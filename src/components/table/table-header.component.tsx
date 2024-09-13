const TableHeaderComponent = ({fields}: {fields: string[]}) => {
    return (<>
        <tr>
            {
                fields && fields.map((label: string, i:number) => (
                    <th scope="col" className="px-4 py-3" key={i}>{label}</th>
                ))
            }
        </tr>
    </>)
}
export default TableHeaderComponent