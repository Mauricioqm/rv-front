import React from 'react';
import { Nav, Navbar, Container, NavDropdown, Button } from 'react-bootstrap';
import { useLogoutUserMutation } from '../services/appApi';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/rv.jpg';

function Header() {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();

  async function handleLogout(event) {
    event.preventDefault();
    await logoutUser(user);
    // Redireccionar al home
    window.location.replace('/');
  }


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} style={{ width: 60, heigth: 60 }} alt="" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link href="#action1">Login</Nav.Link>
                </LinkContainer>
              </>
            )}

            <LinkContainer to="/chat">
              <Nav.Link href="#action1">Chat</Nav.Link>
            </LinkContainer>

            {user && (

              <NavDropdown title={
                <>
                  <img src={user.picture} alt="" style={{ width: 30, height: 30, marginRight: 10, objectFit: 'cover', borderRadius: '50%' }} />
                  {user.username}
                </>
              } id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.4">
                  <Button variant='danger' onClick={handleLogout}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;