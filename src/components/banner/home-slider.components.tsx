import { Carousel } from "flowbite-react";
import { SliderImage } from "../common/slider/slider.components";
import banner1 from "../../assets/images/banner-1.jpg"
import banner2 from "../../assets/images/banner-2.jpg"
import banner3 from "../../assets/images/banner-3.jpg"

import { useEffect, useState } from "react";


const HomeBannerSlider = () => {
    // code block 
    // data state 
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)

    // setLoading(false);  // error 
    // side effect hook 
    // useEffect(() => {

    //     // activity tracking 

    //     // console.log("I am always called")

    //     // no second argument, 
    //     // this hook exectues on any state initialization / update
    //     // after every component render this gets executed
    // })


    useEffect(() => {

        // api call/network caller
        // this hook call only once when the component gets loaded
        
        // console.log("I am only once called")
        // setLoading(false)
        
        setData("Hello there")
    }, [])



    useEffect(() => {

        // this hook function executes whenever the loading state changes
        
        // console.log("I am called when loading state is changed")
    }, [loading])

    return (<>
        <div className="h-30 xl:h-[640px]">
            <Carousel slideInterval={5000}>
                <SliderImage image={banner1} link="http://localhost:5173" alt="banner1" />
                <SliderImage image={banner2} link="http://localhost:5173" alt="banner1" />
                <SliderImage image={banner3} link="http://localhost:5173" alt="banner1" />
            </Carousel>
        </div>
    </>)
}
export default HomeBannerSlider;