import './Login-Register.scss'; 
import Logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, logInWithEmailAndPassword } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const navigate = useNavigate();

  const userLogin = (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }
    console.log("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        setStatusMsg("Login Successful");
        setSubmitButtonDisabled(false);
        navigate("/home");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        console.log(err.message);
        setStatusMsg("Invalid details, please try again!")
      });
  };

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

   return(
    <div className=" container-fluid mt-4">
      <div className="row  d-flex justify-content-center">
        <div className="col-4 justify-content-center text-center">
        <img className="img-fluid" src={Logo}/>
        <h4 className='py-2 '>Your digital sticky notes app</h4>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-5  justify-content-center">
         
          <form className='p-5'>
          <p>{statusMsg}</p>
            <div className="form-group py-2 pt-3">
              <input type="email" value={email}  className="form-control" id="email" 
              placeholder="Enter your email address..."
              onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group py-2">
              <input type="password" value={password} className="form-control" id="password" 
              placeholder="Enter your password..."
              onChange={(e) =>setPassword(e.target.value)}/>
            </div>
            <button className="formbtn btn w-100 my-2"  
            onClick={userLogin}
            disabled={submitButtonDisabled}>LOGIN</button>
            <p>Don't have an account? <Link to='/register'>Sign up here.</Link></p>
          </form>
        </div>
      </div>
    </div>
   )
      
}
            
     
export default Login;