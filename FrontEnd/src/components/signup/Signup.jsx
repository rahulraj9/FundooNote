import React from 'react';
import './signup.css'

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'


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
            this.setState({ firstNameErrorMsg: "Enter proper name" })
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

        if (!/[a-zA-Z0-9._]+[@]{1}[a-zA-Z120-9]*[.]{1}[a-zA-Z]*$/.test(this.state.email)){
            this.setState({ emailFlag: true })
            this.setState({ emailErrorMsg: "Enter proper email id" })
            isError = true
        }

        if (this.state.email.length === 0) {
            this.setState({ emailFlag: true })
            this.setState({ emailErrorMsg: "Enter email" })
            isError = true
        }

        /**
         * @description : Validation for password
         */

        if (this.state.password.length === 0) {
            this.setState({ passwordFlag: true })
            this.setState({ passwordErrorMsg: "Enter a password" })
            isError = true
        }


        // if (this.state.confirmPassword.length === 0) {
        //     this.setState({ confirmPasswordFlag: true })
        //     this.setState({ confirmPasswordErrorMsg: "Confirm your password" })
        //     isError = true
        // }



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
        }
        else {
            console.log("reg failed")
        }
    }


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
                                            name="firstName"
                                            onChange={(e) => this.change(e)}
                                            value={this.state.firstName}
                                            error={this.state.firstNameFlag}
                                            helperText={this.state.firstNameErrorMsg}
                                            label="First Name"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />
                                    </div>
                                    <div className="formInputField">
                                        <TextField
                                            name="lastName"
                                            onChange={(e) => this.change(e)}
                                            value={this.state.lasttName}
                                            error={this.state.lastNameFlag}
                                            helperText={this.state.lastNameErrorMsg}
                                            label="Last Name"
                                            size="small"
                                            variant="outlined"
                                            fullWidth />
                                    </div>
                                </div>

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
                                            onClick={this.onSubmit}
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


