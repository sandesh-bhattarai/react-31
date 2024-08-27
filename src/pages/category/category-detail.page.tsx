import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const CategoryDetail = () => {
    // 
    const params = useParams();

    const [query, setQuery] = useSearchParams();

    // console.log(query.get('price'))
    // console.log(query.get('brand'))
    
    useEffect(() => {
        setTimeout(() => {
            setQuery({
                title: "Hello"
            })
        }, 5000)
    }, [])


    useEffect(() => {
        console.log(query.get("price"))
        console.log(query.get("brand"))
        console.log(query.get("title"))
    }, [query])
    return (<>
        {params.slug}
    </>)    
}

export default CategoryDetail;