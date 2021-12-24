import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import MainPage from "../../components/MainPage";
import "./RegisterPage.css";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const postDetails = (pics) => {
        if (!pics) {
            return setPicMessage("Please Select An Image");
        }
        setPicMessage(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "personal_note_library");
            data.append("cloud_name", "harakido1");
            fetch("https://api.cloudinary.com/v1_1/harakido1/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPic(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return setPicMessage("Please Select An Image");
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate("/notes");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords Do Not Match");
        } else {
            dispatch(register(name, email, password, pic));
        }
    };

    return (
        <MainPage title="REGISTER">
            <div className="registerContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && (
                    <ErrorMessage variant="danger">{message}</ErrorMessage>
                )}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    {picMessage && (
                        <ErrorMessage variant="danger">
                            {picMessage}
                        </ErrorMessage>
                    )}
                    <Form.Group controlId="pic" className="mb-3">
                        <Form.Label>Upload Profile Picture</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => postDetails(e.target.files[0])}
                        />
                    </Form.Group>

                    <div className="py-2">
                        <Button
                            type="submit"
                            variant="warning"
                            style={{ color: "black" }}
                        >
                            REGISTER
                        </Button>
                    </div>
                    <Row className="py-3">
                        <Col>
                            Returning User? <br />
                            <Link to="/login">Login Here...</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </MainPage>
    );
};

export default RegisterPage;
