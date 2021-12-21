import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainPage from "../../components/MainPage";
import axios from "axios";

const MyNotes = () => {
    const [notes, setNotes] = useState([]);

    // notes API called on every render:
    const fetchNotes = async () => {
        const { data } = await axios.get("/api/notes");

        setNotes(data);
    };
    console.log(notes);
    useEffect(() => {
        fetchNotes();
    }, []);

    const deleteHandler = (id) => {
        if (window.confirm("Delete in irreversible, are you sure?")) {
        }
    };

    return (
        <>
            <MainPage title="Welcome back John Pageler...">
                <Link to="create">
                    <Button
                        style={{
                            color: "black",
                            marginLeft: 10,
                            marginBottom: 6,
                        }}
                        size="lg"
                        variant="warning"
                    >
                        CREATE NEW NOTE
                    </Button>
                </Link>
                {notes.map((note) => (
                    <Accordion key={note._id}>
                        <Card style={{ margin: 10 }}>
                            <Card.Header style={{ display: "flex" }}>
                                <span
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                        flex: 1, // pushes <div> to the right
                                        cursor: "pointer",
                                        alignSelf: "center",
                                        fontSize: 18,
                                    }}
                                >
                                    <Accordion.Toggle
                                        as={Card.Text}
                                        variant="link"
                                        eventKey="0"
                                    >
                                        {note.title}
                                    </Accordion.Toggle>
                                </span>
                                <div>
                                    <Button
                                        href={`/note/${note._id}`}
                                        style={{ color: "black" }}
                                        variant="warning"
                                    >
                                        EDIT NOTE
                                    </Button>
                                    <Button
                                        style={{ color: "black" }}
                                        variant="danger"
                                        className="mx-2"
                                        onClick={() => deleteHandler(note._id)}
                                    >
                                        DELETE NOTE
                                    </Button>
                                </div>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <h4>
                                        <Badge
                                            variant="success"
                                            style={{ color: "black" }}
                                        >
                                            Category - {note.category}
                                        </Badge>
                                    </h4>
                                    <blockquote className="blockquote mb-0">
                                        <p>{note.content}</p>
                                        <footer className="blockquote-footer">
                                            Created On - date
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                ))}
            </MainPage>
        </>
    );
};

export default MyNotes;
