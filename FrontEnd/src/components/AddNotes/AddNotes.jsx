import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import './AddNotes.css'
import { IconButton, ClickAwayListener } from '@material-ui/core';
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

import NoteOptions from '../NoteIconOption/NoteOptn'
import services from "../../Services/noteService"

const service = new services()

const useStyles = makeStyles((theme) => ({

    titleInput: {
        padding: "10px 15px",
        width: "70%",
    },
    noteInput: {
        padding: "10px 15px",
        fontFamily: ' Roboto, Arial, sans-serif'
    },
    closeNotes: {
        padding: '10px 10px 10px 10px',
        fontSize: '17px',
        justifySelf: "flex-end",
        fontFamily: 'Google Sans ,Roboto,Arial,sans-serif',
        borderRadius: '5px',
        cursor: 'pointer',
    }
}));

function AddNotes(props) {
    const classes = useStyles();
    var [showTitle, titleDisplay] = React.useState();
    var [note, setNote] = React.useState();
    var [title, setTitle] = React.useState();
    const [edit, setEdit] = React.useState();
    const [clr, setClr] = React.useState();
    const clickedNote = () => {
        titleDisplay(true);
    };
    const closeNote = () => {

        if (title === '' && note === '') {
            console.log("no data to be added in db");
            titleDisplay(false)
            setClr("#fafafa");
            return null
        }
        
        else {
            const token = localStorage.getItem("fundooUsertoken")
            let formData = {
                notetitle: title,
                notedata: note
            }
            service.addNote(formData, token).then((data) => {
                    console.log("added",data);
            }).catch((error) => {
                console.log("fail");
            });
            setTitle('');
            setNote('');
            setClr("#fafafa");
            titleDisplay(false)
        }
    };

    return (
        <ClickAwayListener onClickAway={closeNote}>
            <div className="addNotes"
            style={{ backgroundColor: clr }}>
                <div className="notesField" onClick={clickedNote}>
                    <div
                        className="addNoteField"
                        style={{ display: showTitle ? "block" : "none" }}>
                        <div className={classes.titleInput}>
                            <InputBase
                                className={classes.input}
                                placeholder="Title"
                                value={title}
                                fullWidth
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    </div>
                    <div className="Note">
                        <div className="noteInput" >
                            <InputBase
                                className={classes.input}
                                placeholder="Take a note..."
                                value={note}
                                fullWidth
                                onChange={(e) => setNote(e.target.value)} />
                        </div>
                        <div style={{ display: showTitle ? "none" : "block" }}>
                            <IconButton>
                                <CheckBoxOutlinedIcon />
                            </IconButton>
                            <IconButton>
                                <BrushOutlinedIcon />
                            </IconButton>
                            <IconButton>
                                <ImageOutlinedIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div
                    className="addNoteField"
                    style={{ display: showTitle ? "block" : "none" }}>
                    <div className="addNoteOptions">
                        <NoteOptions
                         setClr={setClr}
                         setEdited={edit} />
                        <div className="closeNotes">
                            <IconButton className={classes.closeNotes} onClick={closeNote}>
                                CLOSE
                             </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    )
}

export default AddNotes
