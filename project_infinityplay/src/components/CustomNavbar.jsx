import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function CustomNavbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar expand="lg" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="./project_infinityplay/src/assets/img/infinityplay.png" alt="InfinityPlay" width={90} className="me-2" />
          <img src="./project_infinityplay/src/assets/img/project_infinityplay.png" alt="Project InfinityPlay" width={250} className="img-fluid" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/games">
              Games
            </Nav.Link>
          </Nav>

          <Nav>
            {!user ? (
              <NavDropdown title="Account" id="account-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">
                  Sign In
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title={user.username} id="profile-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
