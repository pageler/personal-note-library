import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = ({ userInfo }) => {
    // Check localStorage for User data:
    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className="title">
                                Personal Note Library...
                                <br />
                                Welcome!
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
