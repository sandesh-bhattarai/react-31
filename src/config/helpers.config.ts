export const setErrorMsg = (exception: any, setError: any) => {
    if(exception.status === 400 && exception.data.result !== null) {
        Object.keys(exception.data.result).map((field: any) => {
            setError(field, {message: exception.data.result[field]})
        })
    }
}