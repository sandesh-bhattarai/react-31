export type ButtonProps = {
    loading: boolean, 
    label: string
}
export const SubmitButton = ({loading, label}: ButtonProps) => {
    return (<>
        <button
            disabled={loading}
            className="me-3 disabled:cursor-not-allowed disabled:bg-teal-600/50 inline-block shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-900 hover:text-teal-200 focus:outline-none focus:ring active:text-teal-500"
            type="submit"
        >
            {label}
        </button>
    </>)
}

export const CancelButton = ({loading, label}: ButtonProps) => {
    return (<>
    <button
            disabled={loading}
            type="reset"
            className="me-3 disabled:cursor-not-allowed disabled:bg-red-600/50 inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-red-900 hover:text-red-200 focus:outline-none focus:ring active:text-red-500"
        >
            {label}
        </button>
    </>)
}