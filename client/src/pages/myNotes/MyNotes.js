import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainPage from "../../components/MainPage";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

const MyNotes = ({ search }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const noteList = useSelector((state) => state.noteList);
    const { loading, notes, error } = noteList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const noteDelete = useSelector((state) => state.noteDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = noteDelete;

    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: successCreate } = noteCreate;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;

    useEffect(() => {
        console.log(userInfo);
        dispatch(listNotes());
        if (!userInfo) {
            navigate("/");
        }
    }, [
        dispatch,
        navigate,
        userInfo,
        successDelete,
        successCreate,
        successUpdate,
    ]);

    const deleteHandler = (id) => {
        if (window.confirm("Delete is irreversible, are you sure?")) {
            dispatch(deleteNoteAction(id));
        }
    };

    return (
        <MainPage title={`Welcome back ${userInfo && userInfo.name}...`}>
            <Link to="/create">
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

            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            {loading && <Loading />}
            {loadingDelete && <Loading />}
            {notes
                ?.reverse()
                .filter((filteredNote) =>
                    filteredNote.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
                .map((note) => (
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
                                        href={`/note/${note._id}`} //Path to updateNote
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
                                        <ReactMarkdown>
                                            {note.content}
                                        </ReactMarkdown>
                                        <footer className="blockquote-footer">
                                            Created On -{" "}
                                            <cite title="Source Title">
                                                {note.createdAt.substring(
                                                    0,
                                                    10
                                                )}
                                            </cite>
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                ))}
        </MainPage>
    );
};

export default MyNotes;
