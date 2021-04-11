import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import NoteOptions from '../NoteIconOption/NoteOptn'
import AddNote from '../AddNotes/AddNotes'
import Dialog from "@material-ui/core/Dialog";
import './DisplayNote.css'


const useStyles = makeStyles((theme) => ({

    noteText: {
        wordWrap: "break-word",
        margin: "4px 4px 4px 4px"
    },
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
}));


function DisplayNotes(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    var [title, setTitle] = React.useState("");
    var [note, setNote] = React.useState("");
    const [clr, setClr] = React.useState("#fafafa");
    const [noteId, setNoteId] = React.useState();

    const dialogOpen = (e, data) => {
        setEdit(true)
        setTitle(data.title);
        setNote(data.description);
        setOpen(true);
        setNoteId(data._id);
        setClr(data.color);
    };
    const dialogClose = () => {
        setOpen(false);
    };
    const Note = () => {
        console.log(title);
        return (
            <div className="AllNotes">
                {props.notes
                    .map((data) => (
                        <div
                            className="noteBlock"
                            style={{ backgroundColor: data.color }}>
                            <div className="inputBlock" onClick={(e) => dialogOpen(e, data)}>
                                <h4 className={classes.noteText} >{data.title}</h4>
                                <p className={classes.noteText} >{data.description}</p>
                            </div>
                            <div className="optionContainer">
                                <div
                                    onMouseEnter={(e) => {
                                        setClr(clr);
                                    }}
                                    onMouseOver={setEdit(true)}
                                    className="noteOption">
                                    <NoteOptions
                                        setEdited={edit}
                                        setColor={clr}
                                        setClr={setClr}
                                        editId={data._id}
                                        getall={props.getall} />
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
                        getall={props.getall}
                        setEdited={edit}
                        dialogOff={dialogClose}
                        editOpen={open}
                        editTitle={title}
                        editDisc={note}
                        editId={noteId}
                        editColor={clr} 
                        className={classes.dialogBox} />
                </Dialog>
            </div>
        </div>
    );
}

export default DisplayNotes
