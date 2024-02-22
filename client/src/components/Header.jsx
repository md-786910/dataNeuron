import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            DataNeuron
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/task1">
              Task1
            </Nav.Link>
            <Nav.Link as={Link} to="/task2">
              Task2
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
