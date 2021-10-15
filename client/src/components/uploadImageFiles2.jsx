import { useState } from "react";
import UploadImages2 from "./uploadImages2";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Preview from "./preview";
import NavBar from "./navbar";
import Footer from './footer';

function UploadImgFiles2(){
    const [cover, setCover] = useState([]);

    const onSuccess1 = (savedFiles) => {
        setCover(savedFiles);
        console.log(savedFiles);
        console.log(cover);
    }
    return(
        <div className="page-container">
            <NavBar />
            <div className="content-wrap">
                <UploadImages2 onSuccess1={onSuccess1}/>
                <Preview files={cover} name={'encoded Image'} />
                <ToastContainer />
            </div>
            <Footer />
        </div>
    )
}

export default UploadImgFiles2;