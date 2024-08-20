import { Carousel } from "flowbite-react";
import { SliderImage } from "../common/slider/slider.components";
import banner1 from "../../assets/images/banner-1.jpg"
import banner2 from "../../assets/images/banner-2.jpg"
import banner3 from "../../assets/images/banner-3.jpg"

import { useState } from "react";


const HomeBannerSlider = () => {
    // code block 
    // data state 
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)

    // setLoading(false);  // error 

    return (<>
        <div className="h-[650px]">
            <Carousel slideInterval={5000}>
                <SliderImage image={banner1} link="http://localhost:5173" alt="banner1" />
                <SliderImage image={banner2} link="http://localhost:5173" alt="banner1" />
                <SliderImage image={banner3} link="http://localhost:5173" alt="banner1" />
            </Carousel>
        </div>
    </>)
}
export default HomeBannerSlider;