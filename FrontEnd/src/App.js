import './App.css';
import Signup from './components/signup/Signup'
import SignIn from './components/signin/SignIn'
import ResetPassword from './components/ResetPassword/ResetPassword'
import DashBoard from './components/DashBoard/DashBoard'

import ForgetPassword from './components/ForgotPassword/ForgotPaswod'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
function App() {
  return (

    <div className="App">
     
      <BrowserRouter>

      <Switch>
        <Redirect path="/" to="/login" exact />
        <Route path="/registration" component={Signup} exact />
        <Route path="/login" component={SignIn} exact />
        <Route path="/forgotPassword" component={ForgetPassword} exact />
        <Route path="/resetpassword/:token" component={ResetPassword} exact />

        <Route path="/dashboard" component={DashBoard} exact />
      </Switch> 
      </BrowserRouter>

        </div >
       
  );
}

export default App;
