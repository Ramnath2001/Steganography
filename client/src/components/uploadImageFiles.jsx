import { useState } from "react";
import UploadImages from "./uploadImages";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Preview from "./preview";
import NavBar from "./navbar";
import Footer from './footer';

function UploadImgFiles(){
    const [files, setFiles] = useState([]);
    const [cover, setCover] = useState([]);
    const onSuccess = (savedFiles) => {
        setFiles(savedFiles);
        console.log(savedFiles);
        console.log(files);
    }
    const onSuccess1 = (savedFiles) => {
        setCover(savedFiles);
        console.log(savedFiles);
        console.log(cover);
    }
    return(
        <div className="page-container">
            <NavBar />
            <div className="content-wrap">
                <UploadImages onSuccess={onSuccess} onSuccess1={onSuccess1}/>
                <Preview files={cover} name={'cover'} />
                <Preview files={files} name={'secret'}/>
                <ToastContainer />
            </div>
            <Footer />
        </div>
    )
}

export default UploadImgFiles;