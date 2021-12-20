import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className="title">
                                The Public Note Library... Welcome!
                            </h1>
                            <p className="subtitle">
                                Your one secure repository for personal and
                                professional notes.
                            </p>
                        </div>
                        <div className="buttonContainer">
                            <a href="/login">
                                <Button
                                    className="landingButton"
                                    size="lg"
                                    style={{ color: "black" }}
                                    variant="warning"
                                >
                                    Login
                                </Button>
                            </a>
                            <a href="/register">
                                <Button
                                    className="landingButton"
                                    size="lg"
                                    style={{ color: "black" }}
                                    variant="warning"
                                >
                                    Signup
                                </Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default LandingPage;
