import React from "react";
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <Navbar bg="warning" expand="lg" variant="light">
            <Container>
                <Navbar.Brand>
                    <Link to="/">Personal Note Library</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <Form inline>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                            />
                        </Form>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to="/notes">My Notes</Link>
                        </Nav.Link>
                        <NavDropdown
                            title="John Pageler"
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item href="#action/3.1">
                                My Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => {
                                    localStorage.removeItem("userInfo");
                                    navigate("/");
                                }}
                            >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
