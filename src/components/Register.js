import Logo from '../assets/images/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { auth} from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import './Login-Register.scss'; 
import { useState } from 'react';
import { getDatabase, ref, set } from '@firebase/database';

const Register = () => {
  const db= getDatabase(); 
  //setting states for email and pass
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //disable button on click
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  //firebase auth
  const navigate = useNavigate();

  //add new user to database and authentication
  const userRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      console.log("Fill all fields");
      return;
    }
    console.log("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: name
        });
        writeUserData(user, name, email);
        navigate("/");
        setStatusMsg("Registration Successful!")
        console.log(user);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        console.log(err.message);
      });
  }; 
  //function to write user data to realtime database
  const writeUserData = (user, name, email) =>  {
    set(ref(db, 'users/' + user.uid), {
      username: name,
      email: email
    });
   
}

    return (  
        <div className=" container-fluid mt-4">
        <div className="row  d-flex justify-content-center">
        <div className="col-4 justify-content-center text-center">
        <img className="img-fluid" src={Logo}/>
        <h4 className='py-2 '>Your digital sticky notes app</h4>
        </div>
      </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-5  justify-content-center">
            <form className='py-4 px-5'>
              <p>{statusMsg}</p>
            <div className="form-group py-2">
                <input type="text" className="form-control" id="name" placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="form-group py-2">
                <input type="email" className="form-control" id="email" placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="form-group py-2">
                <input type="password" className="form-control" id="password" placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
              </div>
            
              <button className="formbtn btn w-100 my-2 " onClick={userRegister}
              disabled={submitButtonDisabled}>REGISTER</button>
              <p>Already have an account? <Link to='/'>Login here.</Link></p>
            </form>
          </div>
        </div>
      </div>
    );
}
 
export default Register;