import React from 'react';
import './ResetPassword.css'

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

import services from '../../Services/userServices'

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
}


const service = new services()

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {



            password: "",
            passwordFlag: false,
            passwordErrorMsg: "",

            confirmPassword: "",
            confirmPasswordFlag: false,
            confirmPasswordErrorMsg: "",

            snackMessage: "",
            snackType: "",
            open: false

        }
    }
    clickShowPass = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };


    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(e.target.value);
    }

    validate = () => {
        let isError = false

        this.setState({ passwordFlag: false })
        this.setState({ passwordErrorMsg: "" })
        this.setState({ confirmPasswordFlag: false })
        this.setState({ confirmPasswordErrorMsg: "" })


        /**
         * @description : Validation for password
         */

        if (this.state.password.length < 6) {
            this.setState({ passwordFlag: true })
            this.setState({ passwordErrorMsg: "password is too sort" })
            isError = true
        }

        if (this.state.password.length > 11) {
            this.setState({ passwordFlag: true })
            this.setState({ passwordErrorMsg: "password is too long" })
            isError = true
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ confirmPasswordFlag: true })
            this.setState({ confirmPasswordErrorMsg: "Passwords didn't match" })
            isError = true

        }
        return isError
    }

    nextPath =(path)=>{
        this.props.history.push(path)
    }

    onSubmit = (e) => {
        const err = this.validate();
        if (!err) {
            console.log("calling api");
            let forgetData = {
                password: this.state.password,
            };
            console.log(forgetData)
            let token = this.props.match.params.token;
            console.log(token)
            service.resetPass(forgetData,token).then((responseReceived) => {
                if (responseReceived) {
                    console.log("res", responseReceived.data.message)
                    this.setState({ snackType: "success", snackMessage: responseReceived.data.message, open: true })
                    setTimeout(() => {  this.nextPath('/login'); }, 2000);
                }
                else {
                    this.setState({ snackType: "error", snackMessage: responseReceived.data.message, open: true})
                }


            }).catch((error) => {
                console.log("resetPass Failed" + error.response.data.message);
                this.setState({ snackType: "error", snackMessage: error.response.data.message, open: true })
            })
        }
        else {
            console.log("reg failed")
            this.setState({ snackType: "error", snackMessage: "Password Submission Failed", open: true})
        }
    }


    render() {

        return (
            <div className="forgetContainer">
                <div className="forgetContainerBox">
                    <div className="forgetContainerHeader">
                        <span className="forgetInlineTitle">
                            <b>
                                <font color="#1976d2">F</font>
                                <font color="#e53935">u</font>
                                <font color="#ffb74d">n</font>
                                <font color="#1976d2">d</font>
                                <font color="#388e3c">o</font>
                                <font color="#e53935">o</font>
                            </b>
                        </span>
                        <div className="forgetContainerHeaderText">Reset Password</div>
                        <div className="forgetContainerHeaderText1">Use your Fundoo Account</div>
                        <div className="formContainer">
                            <form className="form">



                                <div className="formInput">
                                    <div className="formInputField">
                                        <TextField
                                            name="password"
                                            value={this.state.password}
                                            helperText={this.state.passwordErrorMsg}
                                            error={this.state.passwordFlag}
                                            onChange={(e) => this.change(e)}
                                            id="password"
                                            label="Password"
                                            size="small"
                                            variant="outlined"
                                            type={this.state.showPassword ? "text" : "password"}
                                            fullWidth />
                                    </div>
                                </div>
                                <div className="formInput">
                                    <div className="formInputField">
                                        <TextField
                                            name="confirmPassword"
                                            value={this.state.confirmPassword}
                                            helperText={this.state.confirmPasswordErrorMsg}
                                            error={this.state.confirmPasswordFlag}
                                            onChange={(e) => this.change(e)}
                                            label="confirm password"
                                            size="small"
                                            variant="outlined"
                                            type={this.state.showPassword ? "text" : "password"}
                                            fullWidth />
                                    </div>
                                </div>


                                <span className="checkBoxInputs">
                                    <Checkbox
                                        color="primary"
                                        className="showPass"
                                        onClick={this.clickShowPass}
                                    />
                                    Show Password
                                </span>



                                <div className="footerButtonsSign">
                                    <div className="signInLink">
                                        <Button
                                            color="primary">
                                            <b>SignIn Instead</b>
                                        </Button>
                                    </div>
                                    <div className="nextButton">

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.onSubmit}>
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <Snackbar
                        autoHideDuration={3000}
                        open={this.state.open}>
                        <Alert severity={this.state.snackType}>
                            {this.state.snackMessage}
                        </Alert>

                    </Snackbar>
                </div>

            </div>
        )

    }
}


export default ResetPassword;


