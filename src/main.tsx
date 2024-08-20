// named Export 
// export const xyz = "";
// default Export 

// import 
// for named import
// import {candidateName} from "filepath";

// import "filename"; // execute 

// import * as alias from "filepath"
// import * as sandesh from "abc";
// sandesh.
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// const DomElem: any = document.getElementById('root');


// const virtualDom = createRoot(DomElem)
// virtualDom.render(<h1>
//   Hello World
// </h1>)
import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/home/home.pages";
import "./assets/global.css";
import "flowbite";  // flowbite js

// import AboutUsPage from "./pages/about-us/about-us.pages";


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HomePage />
    {/* <AboutUsPage /> */}
  </React.StrictMode>
)
// default Export 
// export default xyz;
// non executable

// import {namedCandidate, ...n}, candidateName from "filepath"