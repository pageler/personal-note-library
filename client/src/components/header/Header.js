import React, { useEffect } from "react";
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
    };

    useEffect(() => {}, [userInfo]);

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
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Form>
                    </Nav>
                    <Nav>
                        {userInfo ? (
                            <>
                                <Nav.Link>
                                    <Link to="/notes">My Notes</Link>
                                </Nav.Link>
                                <NavDropdown
                                    title={userInfo?.name}
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item href="/profile">
                                        My Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
