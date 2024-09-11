import { Spinner } from "flowbite-react"

export enum LoadingSize {
    XS="xs",
    SM="sm",
    MD= "md",
    LG="lg",
    XL="xl"
}

const LoadingComponent = ({size =LoadingSize.MD}: {size?: LoadingSize}) => {
    return (<>
        
        <Spinner size={size} aria-label="Center-aligned spinner example" />
        
    </>)
}
export default LoadingComponent