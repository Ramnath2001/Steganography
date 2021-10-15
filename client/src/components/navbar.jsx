import React from 'react';
import {Navbar, Nav, Container } from 'react-bootstrap'

function NavBar(){
    const logOut = (e) => {
      e.preventDefault();
      localStorage.removeItem("userInfo");
      window.location.href = "/";
    }

    return(
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" >
    <Container>
    <Navbar.Brand href="/home" style={{color: '#1ba94c', fontFamily: "'Oswald', sans-serif", fontWeight: '700'}}>StegnoGrapher</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
  
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#">Your Stego's</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="#">Account</Nav.Link>
        <Nav.Link eventKey={2} onClick={logOut}>
          Log Out
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar;  