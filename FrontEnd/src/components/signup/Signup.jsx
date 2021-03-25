import React from 'react';
import './signup.css'

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'


class Signup extends React.Component {



    render() {

        return (
            <div className="registrationContainer">
                <div className="registrationContainerBox">
                    <div className="registrationContainerHeader">
                        <span className="registrationInlineTitle">
                            <b>
                                <font color="#1976d2">F</font>
                                <font color="#e53935">u</font>
                                <font color="#ffb74d">n</font>
                                <font color="#1976d2">d</font>
                                <font color="#388e3c">o</font>
                                <font color="#e53935">o</font>
                            </b>
                        </span>
                        <div className="registrationContainerHeaderText">Create your Fundoo Account </div>
                        <div className="formContainer">
                            <form className="form">

                                <div className="formInput">
                                    <div className="formInputField">
                                        <TextField
                                            label="First Name"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />
                                    </div>
                                    <div className="formInputField">
                                        <TextField
                                            label="Last Name"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />
                                    </div>
                                </div>

                                <div className="formInput">
                                    <div className="formInputField">
                                        <TextField
                                            label="Email"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />
                                    </div>
                                </div>


                                <div className="formInput">
                                    <div className="formInputField">
                                        <TextField
                                            label="password"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />
                                    </div>
                                    <div className="formInputField">
                                        <TextField
                                            label="confirm password"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />
                                    </div>
                                </div>

                                <span className="checkBoxInputs">
                                    <Checkbox
                                        color="primary"
                                        className="showPass"
                                    />
                                    Show Password
                                </span>


                                <div className="footerButtons">
                                    <div className="signInLink">
                                        <Button
                                            color="primary">
                                            <b>Sign in insted</b>
                                        </Button>
                                    </div>
                                    <div className="nextButton">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>


                            </form>
                            <div className="regImg">
                                <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="google imge" />
                                <p className="imgText">
                                    One account. All of Fundoo working for you.
                                 </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )

    }
}


export default Signup;


