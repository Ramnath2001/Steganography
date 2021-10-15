import React, { useEffect, useState } from "react";
import '../index.css';
import './upImages.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import {toast} from 'react-toastify';
import Loading from "./loading";
import download from 'downloadjs';

function UploadImages({history, onSuccess, onSuccess1}){
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if(!userInfo){
          history.push("/")
        }
    }, [history])



    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [muliB, setMultiB] = useState(true);
    const [singleB, setSingleB] = useState(true);
    const [check1, setCheck1] = useState(true);
    const [check2, setCheck2] = useState(true);
    const [check3, setCheck3] = useState(true);
    const [loading, setLoading] = useState(false);

    const onInputChange1 = (e)=>{
        setFile(e.target.files[0]);
        setSingleB(false);
        
    }

    const onInputChange2 = (e)=>{
        setFiles(e.target.files);
        setMultiB(false);
        
    }


    const onSubmit1 = (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const data = new FormData();
        data.append('id', userInfo._id);
        data.append('coverImage', file);

        axios.post("api/users/uploadImageFiles", data)
            .then((response) => {
                toast.success('Upload Sucess');
                setCheck1(false);
                onSuccess1([response.data]);
                console.log(response.data);
                console.log('Single file upload Success');
            })
            .catch((e) => {
                toast.error('Upload Error');
                console.error('error', e);
            })
    }

    const onSubmit2 = (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const data = new FormData();
        data.append('id', userInfo._id);
        for(let i=0; i<files.length; i++){
            data.append('secretImage', files[i])
        }

        axios.post("api/users/uploadMultipleImageFiles", data)
            .then((response) => {
                toast.success('Upload Sucess');
                setCheck2(false);
                onSuccess(response.data);
                console.log(response.data);
                console.log("Multiple File upload Success");
            })
            .catch((e) => {
                toast.error('Upload Error');
                console.error('error', e);
            })
    }

    const encode = (e) => {
        e.preventDefault();
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        axios.post("api/users/encodeImages/"+userInfo._id)
            .then((response) => {
                setLoading(false);
                setCheck3(false);
                toast.success('Encryption Success');
                console.log(response.data)
            })
            .catch((e) => {
                setLoading(false);
                toast.error('Encryption Failed');
                console.error('error', e);
            })
    }

    const downloadFiles = async (e) =>{
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const res = await fetch('api/users/downloadImages/'+userInfo._id);
        const blob = await res.blob();
        download(blob, 'image.zip');
        axios.post("api/users/deleteFiles/"+userInfo._id)
            .then((response) => {
                setCheck3(true);
                setCheck1(true);
                setCheck2(true);
                console.log(response.data)
            })
            .catch((e) => {
                console.error('error', e);
            })
    }

    
    return(
            <Container>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <form method="post" action="#" id="#" onSubmit={onSubmit1}>
                            <div className="form-group files">
                                <label className="green" style={{marginTop: '10px'}}>Upload Your Cover Image </label>
                                <input 
                                type="file" 
                                className="form-control" 
                                multiple="" 
                                onChange={onInputChange1}
                                />
                            </div>
                            <Button variant="success" type="submit" className='font-mono' size='sm'
                            style={{marginTop: '5px'}} disabled={singleB}>Upload</Button>
                        </form>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <form method="post" action="#" id="#" onSubmit={onSubmit2}>
                            <div className="form-group files">
                                <label className="green" style={{marginTop: '10px'}}>Upload Your Secret Images </label>
                                <input 
                                type="file" 
                                className="form-control" 
                                multiple 
                                onChange={onInputChange2}
                                />
                            </div>
                            <Button variant="success" type="submit" className='font-mono' size='sm'
                            style={{marginTop: '5px'}}  disabled={muliB}>Upload</Button>
                        </form>
                    </Col>
                </Row>
                <div style={{paddingTop:'2%'}}>
                    <Button variant="success" size='sm' onClick={encode} disabled={check1 || check2}>Encode Images</Button>
                    <Button variant="success" size='sm' 
                    onClick={downloadFiles} 
                    disabled={check3} 
                    style={{marginLeft:'2%'}}
                    >Download Files</Button>
                
                </div>
                {loading && <Loading />}
            </Container>
    );

}

export default UploadImages;