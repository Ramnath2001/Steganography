import React from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import Home from "./components/home";
import Login from "./components/login";
import UploadImgFiles from "./components/uploadImageFiles";
import UploadImgFiles2 from "./components/uploadImageFiles2";
import './index.css'


function App(){
    return(
        <BrowserRouter>
            <Route path="/" component={Login} exact />
            <Route path="/home" component={Home} exact />
            <Route path="/uploadImages" component={UploadImgFiles} exact />
            <Route path="/uploadImages2" component={UploadImgFiles2} exact />
        </BrowserRouter>
    );
}

export default App;