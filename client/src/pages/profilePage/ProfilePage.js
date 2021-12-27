import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainPage from "../../components/MainPage.js";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // From Redux userLogin and userUpdate:
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

    // Pre-populate form inputs:
    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPic(userInfo.pic);
        }
    }, [navigate, userInfo]);

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

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateProfile({ name, email, password, pic }));
    };

    return (
        <MainPage title="EDIT PROFILE">
            <div>
                <Row className="profileContainer">
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {loading && <Loading />}
                            {success && (
                                <ErrorMessage variant="success">
                                    Updated Successfully
                                </ErrorMessage>
                            )}
                            {error && (
                                <ErrorMessage variant="danger">
                                    {error}
                                </ErrorMessage>
                            )}
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                ></Form.Control>
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
                                    onChange={(e) =>
                                        postDetails(e.target.files[0])
                                    }
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                variant="warning"
                                style={{ color: "black" }}
                            >
                                Update Profile
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img src={pic} alt={name} className="profilePic" />
                    </Col>
                </Row>
            </div>
        </MainPage>
    );
};

export default ProfilePage;
