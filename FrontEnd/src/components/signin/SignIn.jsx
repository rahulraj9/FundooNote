import React from 'react';
import './SignIn.css'

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

import services from '../../Services/userServices'

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const service = new services()

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            firstNameFlag: false,
            firstNameErrorMsg: "",

            lastName: "",
            lastNameFlag: false,
            lastNameErrorMsg: "",

            email: "",
            emailFlag: false,
            emailErrorMsg: "",

            password: "",
            passwordFlag: false,
            passwordErrorMsg: "",

            confirmPassword: "",
            confirmPasswordFlag: false,
            confirmPasswordErrorMsg: "",

            snackMessage: "",
            snackType: "",
            setOpen: false,
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

        this.setState({ firstNameFlag: false })
        this.setState({ firstNameErrorMsg: "" })

        this.setState({ lastNameFlag: false })
        this.setState({ lastNameErrorMsg: "" })

        this.setState({ emailFlag: false })
        this.setState({ emailErrorMsg: "" })


        this.setState({ passwordFlag: false })
        this.setState({ passwordErrorMsg: "" })

        this.setState({ confirmPasswordFlag: false })
        this.setState({ confirmPasswordErrorMsg: "" })



        /**
         *   @description : Validation for first name
         */

        if (
            !/[a-zA-Z._]$/.test(
                this.state.firstName
            )
        ) {
            this.setState({ firstNameFlag: true })
            this.setState({ firstNameErrorMsg: "Enter valid name" })
            isError = true
        }
        if (this.state.firstName.length === 0) {
            this.setState({ firstNameFlag: true })
            this.setState({ firstNameErrorMsg: "Enter first name" })
            isError = true
        }

        /**
         *   @description :Validation for last name
         */
        if (this.state.lastName.length === 0) {
            this.setState({ lastNameFlag: true })
            this.setState({ lastNameErrorMsg: "Enter last name" })
            isError = true
        }

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

        if (this.state.password.length <6 ) {
            this.setState({ passwordFlag: true })
            this.setState({ passwordErrorMsg: "Password is too Short" })
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


    onSubmit = (e) => {
        const err = this.validate();
        if (!err) {
            console.log("calling api");
            let loginData = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            };
            console.log(loginData)

            service.login(loginData).then((loginData) => {
                console.log("Reg succesfully");
                this.setState({ snackType: "success", snackMessage: "login successful", open: true, setOpen: true })


            }).catch((error) => {
                console.log("login Failed" + error);
                this.setState({ snackType: "error", snackMessage: "login Failed", open: true, setOpen: true })
            })
        }
        else {
            console.log("reg failed")

            this.setState({ snackType: "error", snackMessage: "login Failed", open: true, setOpen: true })
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
                                            color="primary">
                                            <b>Forget Password</b>
                                        </Button>
                                    </div>
                                </div>
                                <div className="footerButtons">
                                    <div className="signInLink">
                                        <Button
                                            color="primary">
                                            <b>Create Account</b>
                                        </Button>
                                    </div>
                                    <div className="nextButton">

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.onSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <Snackbar open={this.state.open}>
                        <Alert severity={this.state.snackType}>
                            {this.state.snackMessage}

                        </Alert>

                    </Snackbar>
                </div>

            </div>
        )

    }
}


export default Signup;


