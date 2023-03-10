import { Nav, Navbar, NavLink, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container className="px-10px mx-0">
        <Navbar.Brand>Nova Poshta tracking app</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          data-bs-target="#navbarScroll"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            style={{ marginLeft: "20px" }}
            defaultActiveKey={pathname === "/" ? "1" : "2"}
          >
            <NavLink eventKey="1" as={Link} to="/">
              Tracking package
            </NavLink>
            <NavLink eventKey="2" as={Link} to="/departments">
              Departments
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
