import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'


function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
}


function SnakeBar() {
    const [open, setOpen] = React.useState(false);

    resType = (type) => {
        return type;
    };


    Message = (message) => {
        setOpen(true);
        return message;
    };

    return (
        <div>
            <div>
                <Snackbar open={open} autoHideDuration={2500} >
                <Alert
                    severity={resType} >
                    <Message />
                </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default SnakeBar
