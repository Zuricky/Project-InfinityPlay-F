import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <Navbar expand="lg" className="sticky-top">
      <Container fluid>
        <Navbar.Brand href="home" className="d-flex align-items-center">
          <img src="./project_infinityplay/src/assets/img/infinityplay.png" alt="InfinityPlay" width={90} />
          <img src="./project_infinityplay/src/assets/img/project_infinityplay.png" alt="Project InfinityPlay" width={250} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="library">Library</Nav.Link>
            <Nav.Link href="backoffice">Backoffice</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
