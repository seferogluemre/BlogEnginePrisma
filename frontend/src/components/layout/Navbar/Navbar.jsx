
import { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarComp() {
    const [expanded, setExpanded] = useState(false);
    return (
        <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Blog Frontend
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/posts" onClick={() => setExpanded(false)}>
                            Gönderiler
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComp;
