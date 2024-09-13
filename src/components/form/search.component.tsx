import { FaSearch } from "react-icons/fa";

const SearchFormField = ({setSearch}: {setSearch: Function}) => {
    return (<>
        <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaSearch />
                </div>
                <input onChange={(e: any) => {
                    const keyword = e.target.value
                    setSearch(keyword);

                }} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-primary-500" placeholder="Search" required />
            </div>
        </form>
    </>)
}
export default SearchFormField