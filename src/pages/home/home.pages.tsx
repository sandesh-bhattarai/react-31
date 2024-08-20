import React from "react";
import "./home.pages.css";

import { HomePageSectionTitle } from "../../components/common/title/home-title.components";
import HomeHeaderMenu from "../../components/header/home-header.compontnets";
import HomeBannerSlider from "../../components/banner/home-slider.components";

const HomePage: React.FC = () => {
    
    return (<>
        
        <HomeHeaderMenu />

        
        <HomeBannerSlider />

        {/* Category Section Starts */}
        <div className="bg-teal-300">
            <HomePageSectionTitle title="Category List" link="/category" />
        </div>

        <div className="bg-teal-300">
            <HomePageSectionTitle title="Brand List" link={'/brands'}/>
        </div>


        <div className="bg-teal-300">
            <HomePageSectionTitle  title="Product List" link={'/products'}/>
        </div>
    </>)
}

export default HomePage;