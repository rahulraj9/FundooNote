import './App.css';
import Signup from './components/signup/Signup'
import SignIn from './components/signin/SignIn'
import ResetPassword from './components/resetPassword/ResetPaswod'

function App() {
  return (
  
    <div className="App">
      <Signup/> 
      <SignIn/>
      <ResetPassword/>
        </div>
       
  );
}

export default App;
