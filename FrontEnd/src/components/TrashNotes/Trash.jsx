import React, { useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import NoteOptions from "../NoteIconOption/NoteOptn";
import Services from "../../Services/noteService";
import Dialog from "@material-ui/core/Dialog";
import AddNote from "../AddNotes/AddNotes";
import Typography from '@material-ui/core/Typography';
import "../DisplayNotes/DisplayNote.css";
const service = new Services();

const useStyles = makeStyles((theme) => ({
    dialogBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    dialogOptions: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
    },
    noteText: {
        wordWrap: "break-word",
        margin: "4px 4px 4px 4px"
    }
}));

function ArchiveNotes(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    var [title, setTitle] = React.useState("");
    var [note, setNote] = React.useState("");
    const [clr, setClr] = React.useState("#fafafa");
    const [noteId, setNoteId] = React.useState();
    const [data, setData] = React.useState([]);
    const [trash, setTrash] = React.useState(true);

    React.useEffect(() => {
        getArchiveNotes();
    }, []);

    const getArchiveNotes = () => {
        service.getNote()
            .then((data) => {
                let arrayData = data.data.data;
                let array = arrayData.reverse();
                console.log("Archive Note List" + array);
                setData(array);
            })
            .catch((err) => {
                console.log("error = " + err);
            });
    };

    const dialogOpen = (e, data) => {
        e.stopPropagation();
        setEdit(true)
        setTitle(data.title);
        setNote(data.description);
        setClr(data.color);
        setNoteId(data._id);
        setOpen(true);
    };

    const dialogClose = () => {
        setOpen(false);
    };

    const Note = () => {
        return (
            <div className="AllNotes">
                {data
                    // props.notes
                    .filter((data) => data.isTrash === true)
                    .map((data) => (
                        <div
                            className="noteBlock"
                            style={{ backgroundColor: data.color }}>
                            <div className="inputBlock" onClick={(e) => dialogOpen(e, data)}>
                                <h4 className={classes.noteText} >{data.title}</h4>
                                <p className={classes.noteText} >{data.description}</p>
                            </div>
                            <div className="optionContainer">
                                <div onMouseEnter={(e) => {
                                    setClr(clr);
                                }}
                                    onMouseOver={setEdit(true)}
                                    className="noteOption">
                                    <NoteOptions
                                        getall={getArchiveNotes}

                                        trash={trash}
                                        setColor={clr}
                                        setClr={setClr}
                                        editId={data._id}
                                        setEdited={edit}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <div className="mainContent">
            <div className="displayNotes">
                <Note />
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={dialogClose} >
                    <AddNote
                        setEdited={edit}
                        getall={getArchiveNotes}
                        dialogOff={dialogClose}
                        editOpen={open}
                        editId={noteId}
                        editTitle={title}
                        editDisc={note}
                        editColor={clr}
                        className={classes.dialogBox} />
                </Dialog>
            </div>
        </div>
    );
}
export default ArchiveNotes