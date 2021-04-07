import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import { IconButton, Menu, Paper } from '@material-ui/core';
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ArchiveIcon from '@material-ui/icons/Archive';

const useStyles = makeStyles((theme) => ({

    optionButton: {
        width: "100%"
    },
    button: {
        padding: "10px",
    },
    colorPaper: {
        marginLeft: theme.spacing(5),
        width: "49%",
        padding: "5px 5px 5px 5px"
    },
    colorButton: {
        width: "1px",
        border: "1px solid white"

    }


}));

function NoteOptn(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(props.setEdited);
 
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
    const AddColor = (e, colr) => {
      
    }
    const ColorBlock = () => {
        return (
            <div className={classes.colorMenu} onMouseLeave={colorsHandleClose}>
                {
                    colors.map((color) => (
                        <IconButton
                            className={classes.colorButton}
                            style={{
                                backgroundColor: color.color,
                                display: "inline-block",
                                margin: "0 5px 5px 5px",
                                flexgrow: "1",
                                width: "calc(90% * (1/4) - 10px - 42px)"
                            }}
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
                <IconButton className={classes.button} title="More">
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
        </div>
    )
}

export default NoteOptn
