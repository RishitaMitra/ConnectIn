import React, { useState } from 'react';
import './Login.css';
//import pic from './logo.jpg';
import pic2 from './logo2.jpg';
import { auth } from './firebasefile';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilepic, setPic] = useState("");
  const dispatch = useDispatch();

const logintoapp = (e)=> {
  e.preventDefault();
  auth.signInWithEmailAndPassword(email, password)
  .then(userAuth=>{
    dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profileUrl: userAuth.user.photoURL,
    }))
  }).catch((error)=> alert(error));
};


const register = () =>{
    if(!name){
      return alert("please enter a full name!");
    }
    auth.createUserWithEmailAndPassword(email, password).then((userAuth)=>{
          userAuth.user.updateProfile({
            displayName: name,
            photoURL: profilepic,
          })
          .then(()=>{
              dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilepic,
              }))
          })
    }).catch((error)=> alert(error));
};

  return (
    <div className='login'>
      <img src={pic2} alt="logo2" /> 
      
        <form>
          <input value={name} onChange={e=> setName(e.target.value)} placeholder='Full Name (required if registering)' type='text'/>
          <input value={profilepic} onChange={e=> setPic(e.target.value)} placeholder='Profile pic URL (optional)' type='text'/>
          <input value={email} onChange={e=> setEmail(e.target.value)} placeholder='Email' type='email'/>
          <input value={password} onChange={e=> setPassword(e.target.value)} placeholder='Password' type='password'/>

          <button type='submit' onClick={logintoapp}>Sign In</button>

        </form>

        <p>Not a member? {" "}
          <span className='login_register' onClick={register}>
            Register Now
          </span>
        </p>

    </div>
  )
}

export default Login