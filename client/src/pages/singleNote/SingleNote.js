import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

function SingleNote() {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    console.log(params.id);
    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { loading, error } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete } = noteDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Delete is irreversible, are you sure?")) {
            dispatch(deleteNoteAction(id));
        }
        navigate("/notes");
    };

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${params.id}`);
            console.log(params.id);

            // Loads fields with stored data:
            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        };

        fetching();
    }, [params.id, date]);

    const resetHandler = () => {
        console.log(params.id);
        setTitle("");
        setCategory("");
        setContent("");
    };

    const updateHandler = (e) => {
        e.preventDefault();
        console.log(params.id);
        // From noteActions folder:
        dispatch(updateNoteAction(params.id, title, content, category));
        if (!title || !content || !category) return;

        console.log(params.id);
        resetHandler(); // reset fields
        console.log(params.id);
        navigate("/notes"); // return to MyNotes
    };

    return (
        <MainPage title="Edit Note">
            <Card>
                <Card.Header>Edit Your Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loadingDelete && <Loading />}
                        {error && (
                            <ErrorMessage variant="danger">
                                {error}
                            </ErrorMessage>
                        )}
                        {errorDelete && (
                            <ErrorMessage variant="danger">
                                {errorDelete}
                            </ErrorMessage>
                        )}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Enter the title"
                                value={title || false}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter the content 
                                (Markdown syntax is supported)"
                                rows={4}
                                value={content || false}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>

                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="content">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="content"
                                placeholder="Enter the Category"
                                value={category || false}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button
                            variant="warning"
                            type="submit"
                            style={{ color: "black" }}
                        >
                            Update Note
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            style={{ color: "black" }}
                            onClick={() => deleteHandler(params.id)}
                        >
                            Delete Note
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainPage>
    );
}

export default SingleNote;
