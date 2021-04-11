import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import { IconButton, Menu, MenuItem, Paper } from '@material-ui/core';
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ArchiveIcon from '@material-ui/icons/Archive';
import Services from '../../Services/noteService';

const service = new Services();

const useStyles = makeStyles((theme) => ({
    optionButton: {
        width: "100%"
    },
    colorPaper: {
        marginLeft: theme.spacing(5),
    },
    button: {
        padding: "6px",
    },
    colorMenu: {
        width: "130px",
        height: "90px",
        display: "flex",
        flexFlow: " column wrap",
    },
    colorButton: {
        margin: "2px",
        width: "5px",
        height: "5px",
        "&:hover": {
            border: "black 2px solid",
        },
    },

    paper: {
        marginRight: theme.spacing(2),
    },


}));

function NoteOptn(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(props.setEdited);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [noteId, setNoteId] = React.useState(props.editId);

    const colors = [
        { color: "#fafafa" },
        { color: "#ef9a9a" },
        { color: "#b39ddb" },
        { color: "#f8bbd0" },
        { color: "#a1887f" },
        { color: "#cfd8dc" },
        { color: "#dcedc8" },
        { color: "#b2dfdb" },
        { color: "#e0f7fa" },
        { color: "#4fc3f7" },
        { color: "#ffcc80" },
        { color: "#fff59d" },

    ];
    const colorsHandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const colorsHandleClose = () => {
        setAnchorEl(null);
    };

    const deleteHandleOpen = (event) => {
        setAnchorE2(event.currentTarget);
    };

    const deletesHandleClose = () => {
        setAnchorE2(null);
    };

    const del = () => {
        console.log(noteId)
        service.del(noteId).then((data) => {
            console.log("deleted");
            props.getall();
        }).catch((error) => {
            console.log("Technical Issues")
        })
    }
    const addColor = (e, colr) => {
        if (edit) {
            let data = {
                color: colr,
            };
            service.update(data, noteId).then((data) => {
                props.getall()
            }).catch((error) => {
                console.log("failed to change color");
            })
        }
        props.setClr(colr);

    }
    const ColorBlock = () => {
        return (
            <div className={classes.colorMenu} onMouseLeave={colorsHandleClose}>
                {
                    colors.map((color) => (
                        <IconButton
                            className={classes.colorButton}
                            onClick={(e) => addColor(e, color.color)}
                            style={{ backgroundColor: color.color }}
                        ></IconButton>
                    ))}
            </div >
        );
    };
    return (
        <div className={classes.optionButton}>
            <div className='optionfield'>
                <IconButton className={classes.button} title="Remind me">
                    <AddAlertIcon />
                </IconButton>
                <IconButton className={classes.button} title="collaborator">
                    <PersonAddIcon />
                </IconButton>
                <IconButton className={classes.button} title="change color" onMouseOver={colorsHandleClick}>
                    <ColorLensOutlinedIcon />
                </IconButton>
                <IconButton className={classes.button} title="Add image">
                    <ImageOutlinedIcon />
                </IconButton>
                <IconButton className={classes.button} title="Archive">
                    <ArchiveIcon />
                </IconButton>
                <IconButton className={classes.button} title="More" onClick={deleteHandleOpen}>
                    <MoreVertOutlinedIcon />
                </IconButton>

            </div>

            <div
                style={{ display: open ? "block" : "none" }}
                onClick={colorsHandleClose} >
                <Paper open={Boolean(open)} >
                    <Menu
                        open={Boolean(open)}
                        className={classes.colorPaper}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}>
                        <ColorBlock />
                    </Menu>
                </Paper>
            </div>
            <div>
                <Paper>
                    <Menu
                        className={classes.settingMenu}
                        anchorEl={anchorE2}
                        open={Boolean(anchorE2)}
                        onClose={deletesHandleClose}
                    >
                        <MenuItem onClick={del}>Delete</MenuItem>
                    </Menu>
                </Paper>
            </div>
        </div>
    )
}

export default NoteOptn
