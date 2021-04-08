import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import NoteOptions from '../NoteIconOption/NoteOptn'
import './DisplayNote.css'


const useStyles = makeStyles((theme) => ({

    noteText: {
        wordWrap: "break-word",
        margin: "4px 4px 4px 4px"
    }
}));


function DisplayNotes(props) {

    const classes = useStyles();
    const Note = () => {
        return (
            <div className="AllNotes">
                {props.notes
                    .map((data) => (
                        <div
                            className="noteBlock">
                            <div className="inputBlock" >
                                <h4 className={classes.noteText} >{data.notetitle}</h4>
                                <p className={classes.noteText} >{data.notedata}</p>
                            </div>
                            <div className="optionContainer">
                                <div className="noteOption">
                                    <NoteOptions />
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
        </div>
    );
}

export default DisplayNotes
