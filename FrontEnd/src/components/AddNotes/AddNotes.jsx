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

function AddNotes() {
    const classes = useStyles();

    var [showTitle, titleDisplay] = React.useState("");
    var [notedata, setNoteData] = React.useState("");
    var [notetitle, setNoteTitle] = React.useState("");

    const clickedNote = () => {
        titleDisplay(true);
    };
    const closeNote = () => {

        if (notetitle === '' && notedata === '') {
            console.log("no data to be added in db");
            titleDisplay(false)
            return null
        }
        else {
            const token = localStorage.getItem("fundooUsertoken")
            console.log("token", token)
            console.log("Note added", notetitle);
            console.log("Note added", notedata);
            let formData = {
                notetitle: notetitle,
                notedata: notedata
            }
            service.addNote(formData, token).then((responseRecived) => {
                if (responseRecived) {
                    console.log("added");
                }

            }).catch((error) => {
                console.log("fail");
            });
            setNoteTitle('');
            setNoteData('');
            titleDisplay(false)
        }
    };

    return (
        <ClickAwayListener onClickAway={closeNote}>
            <div className="addNotes">
                <div className="notesField" onClick={clickedNote}>
                    <div
                        className="addNoteField"
                        style={{ display: showTitle ? "block" : "none" }}>
                        <div className={classes.titleInput}>
                            <InputBase
                                className={classes.input}
                                placeholder="Title"
                                value={notetitle}
                                fullWidth
                                onChange={(e) => setNoteTitle(e.target.value)} />
                        </div>
                    </div>
                    <div className="Note">
                        <div className="noteInput" >
                            <InputBase
                                className={classes.input}
                                placeholder="Take a note..."
                                value={notedata}
                                fullWidth
                                onChange={(e) => setNoteData(e.target.value)} />
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
                        <NoteOptions />
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
