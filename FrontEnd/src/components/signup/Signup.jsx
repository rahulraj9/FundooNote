import React from 'react';
import './signup.css'

import TextField from '@material-ui/core/TextField';
class Signup extends React.Component {
    render() {
        return (
            <div className="RegistrationContainer">
                <div className="RegistrationContainerBox">
                    <div className="RegistrationContainerHeader">
                        <span className="RegistrationInlineTitle">
                            <b>
                                <font color="#1976d2">F</font>
                                <font color="#e53935">u</font>
                                <font color="#ffb74d">n</font>
                                <font color="#1976d2">d</font>
                                <font color="#388e3c">o</font>
                                <font color="#e53935">o</font>
                            </b>
                        </span>
                        <div className="RegistrationContainerHeaderText">Create your Fundoo Account </div>
                        <div className="FormContainer">
                            <form className="Form">
                                <div className="FormInput">
                                    <div className="FormInputField">
                                        <TextField
                                            id="outlined-basic"
                                            label="First Name"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />

                                    </div>
                                    <div className="FormInputField">
                                        <TextField
                                            id="outlined-basic"
                                            label="Last Name"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />

                                    </div>

                                </div>
                                <div className="FormInput">
                                    <div className="FormInputField">
                                        <TextField
                                            id="outlined-basic"
                                            label="Email"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />

                                    </div>
                                </div>


                                <div className="FormInput">
                                    <div className="FormInputField">
                                        <TextField
                                            id="outlined-basic"
                                            label="password"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />

                                    </div>
                                    <div className="FormInputField">
                                        <TextField
                                            id="outlined-basic"
                                            label="confirm password"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />

                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Signup;


