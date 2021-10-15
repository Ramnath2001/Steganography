import NavBar from "./navbar";
import Footer from './footer';
import React, { useEffect } from "react";
import {Container, Row, Col, Card, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import '../index.css';


function Home({history}){
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
    
        if(!userInfo){
          history.push("/")
        }
    }, [history])

    return(
    <div className='page-container'>
        <NavBar />
        <div className="content-wrap">
            <div className="bg-green">
                <Container style={{padding: "44px 12px", color: "#ffffff"}}>
                    <h1>Welcome Ramnath</h1>
                    <p>Hide all your secret information with the help of our latest features.</p>
                </Container>
            </div>
            <div id="features">
                <Container style={{padding: "44px 12px"}}>
                    <h3 className="green" style={{textAlign:'center'}}>Our features</h3>
                    <Row xs={1} md={2} className="g-4" style={{paddingTop: '3%'}}>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title className='green'>Image in Image - Resample</Card.Title>
                                    <Card.Text>
                                        Hide multiple image files in a single cover image using  
                                        <span className='green'> Image Resampling</span> technique.
                                    </Card.Text>
                                    <div className="d-grid gap-2">
                                        <Button variant="outline-success" type="button" className='font-mono' size='sm'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = "/uploadImages";
                                        }}>
                                        Encode
                                        </Button>
                                        <Button variant="success" type="submit" className='font-mono' size='sm'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = "/uploadImages2";
                                        }}
                                        >
                                        Decode
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title className='green'>Image in Image - DCT (under development)</Card.Title>
                                    <Card.Text>
                                        Hide multiple image files in a single cover image using  
                                        <span className='green'> Discrete Cosine Transform </span>Algorithm.
                                    </Card.Text>
                                    <div className="d-grid gap-2">
                                        <Button variant="outline-success" type="submit" className='font-mono' size='sm' disabled='true'>
                                        Encode
                                        </Button>
                                        <Button variant="success" type="submit" className='font-mono' size='sm' disabled='true'>
                                        Decode
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title className='green'>Text in Image (under development)</Card.Title>
                                    <Card.Text>
                                        Hide text files in a single cover image.
                                    </Card.Text>
                                    <div className="d-grid gap-2">
                                        <Button variant="outline-success" type="submit" className='font-mono' size='sm' disabled='true'>
                                        Encode
                                        </Button>
                                        <Button variant="success" type="submit" className='font-mono' size='sm' disabled='true'>
                                        Decode
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title className='green'>Audio in Image (under development)</Card.Title>
                                    <Card.Text>
                                        Hide audio files in a single cover image.
                                    </Card.Text>
                                    <div className="d-grid gap-2">
                                        <Button variant="outline-success" type="submit" className='font-mono' size='sm' disabled='true'>
                                        Encode
                                        </Button>
                                        <Button variant="success" type="submit" className='font-mono' size='sm' disabled='true'>
                                        Decode
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="bg-green bg-image">
                <Container style={{padding: "44px 12px", color: "#ffffff"}}>
                    <h3 style={{textAlign: 'center'}}>Contributors</h3>
                    <Row xs={1} md={3} className="g-3" style={{paddingTop: '3%'}}>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title className='green'>Ramnath K</Card.Title>
                                    <Card.Text className='green'>
                                       Undergrad at SSN college of Engineering
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Roles</ListGroupItem>
                                    <ListGroupItem>Image in Image Resample</ListGroupItem>
                                    <ListGroupItem>Text in Image</ListGroupItem>
                                    <ListGroupItem>Website Development</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link href="https://www.linkedin.com/in/ramnath-karthikesan-ba44b31ab/"><FontAwesomeIcon icon={faLinkedin} size="lg" target="_blank" /></Card.Link>
                                    <Card.Link href="https://github.com/Ramnath2001"><FontAwesomeIcon icon={faGithubSquare} size="lg" target="_blank" /></Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title className='green'>Rohit Ram A</Card.Title>
                                    <Card.Text className='green'>
                                    Undergrad at SSN college of Engineering
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Roles</ListGroupItem>
                                    <ListGroupItem>Image in Image DCT</ListGroupItem>
                                    <ListGroupItem>Audio in Image</ListGroupItem>
                                    <ListGroupItem>Encryption</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link href="https://www.linkedin.com/in/rohith-ram-a-84b92010b/"><FontAwesomeIcon icon={faLinkedin} size="lg" /></Card.Link>
                                    <Card.Link href="https://github.com/tridot64"><FontAwesomeIcon icon={faGithubSquare} size="lg" /></Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title className='green'>Rohith D</Card.Title>
                                    <Card.Text className='green'>
                                    Undergrad at SSN college of Engineering
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Roles</ListGroupItem>
                                    <ListGroupItem>Image in Image DCT</ListGroupItem>
                                    <ListGroupItem>Text in Image</ListGroupItem>
                                    <ListGroupItem>Encryption</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link href="https://www.linkedin.com/in/rohit-d-898384211/"><FontAwesomeIcon icon={faLinkedin} size="lg" /></Card.Link>
                                    <Card.Link href="https://github.com/RohitRadar"><FontAwesomeIcon icon={faGithubSquare} size="lg" /></Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        <Footer />
    </div>
    )
}

export default Home;