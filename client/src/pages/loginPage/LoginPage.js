import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainPage from "../../components/MainPage"; // Reusable component
import "./LoginPage.css";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        // call API:
        try {
            const config = {
                "Content-type": "application/json",
            };
            setLoading(true);
            const { data } = await axios.post(
                "/api/users/login",
                {
                    email,
                    password,
                },
                config
            );

            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <MainPage title="LOGIN">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email} // Controlled input with value of email
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password} // Controlled input
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        variant="warning"
                        type="submit"
                        style={{ color: "black" }}
                    >
                        Submit
                    </Button>
                    <Row className="py-3">
                        <Col>
                            New User? <br />
                            <Link to="/register">Register Here...</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </MainPage>
    );
};

export default LoginPage;
