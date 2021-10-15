import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel} from 'react-bootstrap';
import img from '../images/image1.jpg';
import img2 from '../images/ram1.jpg';
function Carousels(){

    return(
    <Carousel>
        <Carousel.Item>
            <img src={img2} height="200px" width="200px" alt="Image1" style={{borderRadius: '100%'}} />
            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>  
        <Carousel.Item>
            <img src={img} height="400px" width="100%" alt="Image1"/>
            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img src={img} height="400px" width="100%" alt="Image1"/>
            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>          
    </Carousel>
    )
}

export default Carousels;