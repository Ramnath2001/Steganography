import axios from "axios";
import React, { useEffect, useState } from "react";
import {Container, Row, Tabs, Tab, Form, Button, Col} from 'react-bootstrap';
import '../index.css';
import ErrorMessage from "./errorMessage";

import Loading from "./loading";

function Login({history}){

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if(userInfo){
      history.push("/home");
    }
  }, [history])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      setLoading(true);
      const { data } = await axios.post(
        "api/users/login",
        {
          email,
          password,
        },
        config
      );

      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      window.location.href = "/home";

    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  return(
      <Container fluid="lg" className="indent-top">
          <Row>
              <div>
                  <h2 className="title center">StegnoGrapher</h2>
              </div>
              <div style={{marginTop: "2%", marginBottom: '5%'}}>
                  <Tabs defaultActiveKey="Sign In" id="uncontrolled-tab-example" className="mb-2 center" >
                      <Tab eventKey="Sign Up" title="Sign Up" >
                          
                          {loading && <Loading />}
                          <Form style={{padding: '2% 2%', backgroundColor: '#f3f7f7', margin: '0% 20%'}} onSubmit={submitHandler}>
                              <Form.Group className="mb-3">
                              <Row>
                                  <Col>
                                      <Form.Label className='green'><b>First Name</b></Form.Label>
                                      <Form.Control placeholder="First name" 
                                      value={fname}
                                      onChange={(e) => setFname(e.target.value)}                                        
                                      />
                                  </Col>
                                  <Col>
                                      <Form.Label className='green'><b>Last Name</b></Form.Label> 
                                      <Form.Control placeholder="Last name" 
                                      value={lname}
                                      onChange={(e) => setLname(e.target.value)}
                                      />
                                  </Col>
                              </Row>
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='green'><b>Email address</b></Form.Label>
                                <Form.Control type="email" placeholder="Enter email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                  We'll never share your email with anyone else.
                                </Form.Text>
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='green'><b>Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Password" 
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </Form.Group>
                              
                              <Button variant="outline-success" type="submit" className='font-mono' size='sm' disabled="true">
                                Create An Account
                              </Button>
                          </Form>
                      </Tab>
                      <Tab eventKey="Sign In" title="Sign In">
                          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                          {loading && <Loading />}
                          <Form style={{padding: '2% 2%', backgroundColor: '#f3f7f7', margin: '0% 20%'}} onSubmit={submitHandler}>
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='green'><b>Email address</b></Form.Label>
                                <Form.Control type="email" placeholder="Enter email" 
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                  We'll never share your email with anyone else.
                                </Form.Text>
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className='green'><b>Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Password" 
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </Form.Group>
                              
                              <Button variant="success" type="submit" className='font-mono' size='sm'>
                                Log In
                              </Button>
                          </Form>
                      </Tab>
                  </Tabs>
              </div>
          </Row>
          
      </Container>
  );
}

export default Login;