import React from 'react';
import './ForgotPassword.css'

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

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            email: "",
            emailFlag: false,
            emailErrorMsg: "",

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

        return isError
    }


    onSubmit = (e) => {
        const err = this.validate();
        if (!err) {
            console.log("calling api");
            let resetPassData = {
                email: this.state.email,
            };
            console.log(resetPassData)

            service.resetPass(resetPassData).then((responseReceived) => {
                if(responseReceived){
                console.log("res",responseReceived.data.message)
                this.setState({ snackType: "success", snackMessage: responseReceived.data.message, open: true, setOpen: true })
                }
                else{
                    this.setState({ snackType: "error", snackMessage: responseReceived.data.message, open: true, setOpen: true })   
                }
                

            }).catch((error) => {
                console.log("resetPass Failed" + error.response.data.message);
                this.setState({ snackType: "error", snackMessage: error.response.data.message, open: true, setOpen: true })
            })
        }
        else {
            console.log("reg failed")

            this.setState({ snackType: "error", snackMessage: "Enter Valid Email", open: true, setOpen: true })
        }
    }

    nextPath = (path)=>{
        this.props.history.push(path)
    }

    render() {

        return (
            <div className="resetPassContainer">
                <div className="resetPassContainerBox">
                    <div className="resetPassContainerHeader">
                        <span className="resetPassInlineTitle">
                            <b>
                                <font color="#1976d2">F</font>
                                <font color="#e53935">u</font>
                                <font color="#ffb74d">n</font>
                                <font color="#1976d2">d</font>
                                <font color="#388e3c">o</font>
                                <font color="#e53935">o</font>
                            </b>
                        </span>
                        <div className="resetPassContainerHeaderText">Forgot Password</div>
                        <div className="resetPassContainerHeaderText1">Enter your phone number or email</div>
                        <div className="formContainer">
                            <form className="form">

                                <div className="formInput">
                                    <div className="formInputFieldReset">
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
                             
                                <div className="footerButtonsReset">
                                    <div className="signInLink">
                                        <Button
                                            color="primary"
                                            onClick = {()=>this.nextPath('/login')}>
                                            <b>Sign In Insted</b>
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
                       autoHideDuration={500}
                        open={this.state.open}>
                        <Alert severity={this.state.snackType} >
                            {this.state.snackMessage}
                        </Alert>

                    </Snackbar>
                </div>

            </div>
        )

    }
}


export default ForgetPassword;


