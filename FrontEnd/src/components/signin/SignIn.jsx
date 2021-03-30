import React from 'react';
import './SignIn.css'

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

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            email: "",
            emailFlag: false,
            emailErrorMsg: "",

            password: "",
            passwordFlag: false,
            passwordErrorMsg: "",

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

        this.setState({ emailFlag: false })
        this.setState({ emailErrorMsg: "" })


        this.setState({ passwordFlag: false })
        this.setState({ passwordErrorMsg: "" })


        /**
         *  @description : Validation for Email
         */

        if (!/[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/.test(this.state.email)) {
            this.setState({ emailFlag: true })
            this.setState({ emailErrorMsg: "Enter valid email id" })
            isError = true
        }

        if (this.state.email.length === 0) {
            this.setState({ emailFlag: true })
            this.setState({ emailErrorMsg: "Choose a Fundoo Mail" })
            isError = true
        }

        /**
         * @description : Validation for password
         */

        if (this.state.password.length < 6) {
            this.setState({ passwordFlag: true })
            this.setState({ passwordErrorMsg: "Password is too Short" })
            isError = true
        }

        if (this.state.password.length > 11) {
            this.setState({ passwordFlag: true })
            this.setState({ passwordErrorMsg: "password is too long" })
            isError = true
        }

        return isError
    }


    nextPath(path) {
        this.props.history.push(path);
        console.log(this.props.history)
      }
    
    onSubmit = (e) => {
        const err = this.validate();
        if (!err) {
            console.log("calling api");
            let loginData = {
                email: this.state.email,
                password: this.state.password,
            };
            console.log(loginData)

            service.login(loginData).then((responseReceived) => {
                console.log("Reg succesfully");
                this.setState({ snackType: "success", snackMessage: "login successful", open: true })
                setTimeout(() => {  this.nextPath('../dashboard'); }, 2000);

            }).catch((error) => {
                console.log("login Failed" + error.response.data.message);
                this.setState({ snackType: "error", snackMessage: error.response.data.message, open: true })
            })
        }
        else {
            console.log("reg failed")

            this.setState({ snackType: "error", snackMessage: "login Failed", open: true})
        }
    }


    render() {

        return (
            <div className="loginContainer">
                <div className="loginContainerBox">
                    <div className="loginContainerHeader">
                        <span className="loginInlineTitle">
                            <b>
                                <font color="#1976d2">F</font>
                                <font color="#e53935">u</font>
                                <font color="#ffb74d">n</font>
                                <font color="#1976d2">d</font>
                                <font color="#388e3c">o</font>
                                <font color="#e53935">o</font>
                            </b>
                        </span>
                        <div className="loginContainerHeaderText">Sign In</div>
                        <div className="loginContainerHeaderText1">Use your Fundoo Account</div>
                        <div className="formContainer">
                            <form className="form">

                                <div className="formInput">
                                    <div className="formInputField">
                                        <TextField
                                            name="email"
                                            value={this.state.email}
                                            helperText={this.state.emailErrorMsg}
                                            error={this.state.emailFlag}
                                            onChange={(e) => this.change(e)}
                                            label="Email"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />
                                    </div>
                                </div>


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


                                <span className="checkBoxInputs">
                                    <Checkbox
                                        color="primary"
                                        className="showPass"
                                        onClick={this.clickShowPass}
                                    />
                                    Show Password
                                </span>


                                <div className="footerButtons">
                                    <div className="signInLink">
                                        <Button
                                            color="primary"
                                            onClick={()=>this.nextPath('/forgotPassword')}>
                                            <b>Forget Password</b>
                                        </Button>
                                    </div>
                                </div>
                                <div className="footerButtonsSign">
                                    <div className="signInLink">
                                        <Button
                                            color="primary"
                                            onClick={() => this.nextPath('/registration')}
                                            >
                                            <b>Create Account</b>
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


export default SignIn;


