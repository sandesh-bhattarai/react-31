import { Carousel } from "flowbite-react";
import { SliderImage } from "../common/slider/slider.components";
import banner1 from "../../assets/images/banner-1.jpg"
import banner2 from "../../assets/images/banner-2.jpg"
import banner3 from "../../assets/images/banner-3.jpg"

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import bannerSvc from "../../pages/banners/banner.service";


const HomeBannerSlider = () => {
    // code block 
    // data state 
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)

    const giveBanner = useCallback(async() => {
        setLoading(true)
        try {
            const {data: {result}} = await bannerSvc.getForHome()
            setData(result);
        } catch(exception) {
            toast.error("Banner Cannot load.")
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(()=> {
        giveBanner()
    }, [])
    return (<>
        <div className="h-30 xl:h-[640px]">
            {
                loading ? <></> : <>
                <Carousel slideInterval={5000}>
                    {
                        data && data.map((row: any, i:number) => (
                            <SliderImage key={i} image={row.image} link={row.link} alt={row.name} />
                        ))
                    }
                </Carousel>
                </>
            }
        </div>
    </>)
}
export default HomeBannerSlider;