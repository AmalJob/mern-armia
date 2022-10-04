import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Container, Nav, Navbar, NavDropdown,Table } from 'react-bootstrap'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardLink, MDBCardSubTitle, MDBCardText, MDBCardTitle } from "mdb-react-ui-kit";
import Main from "./Main";

function Header() {
  const navigate = useNavigate();
  const data = localStorage.getItem('userinfo');
  console.log(data);
  const user = JSON.parse(data);
  const logout = ()=>{
    localStorage.removeItem('userinfo');
    navigate('/register')
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React-Notes-App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
             
            
            </Nav>
            <Nav>
           { user ? <NavDropdown title= { user.user.username } id="collasible-nav-dropdown">
              
                <NavDropdown.Item >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout} >
                 Logout
                </NavDropdown.Item>
               
              </NavDropdown>
             : <Nav.Link eventKey={2} onClick={() => {navigate('/register')}}>
                Login
              </Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     <Main/>
    </>
  );
}

export default Header;
