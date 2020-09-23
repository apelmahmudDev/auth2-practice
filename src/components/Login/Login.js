import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Button } from '@material-ui/core';
import { UserContext } from '../../App';
import './Login.css';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    //REDIRECTS
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    })
    //GOOGLE SIGN IN
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleSignWithGoogle = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const {displayName, email, photoURL} = res.user;
                const newUserInfo = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    //GOOGLE SIGN OUT
    const handleGoogleSignOut = () => {
        firebase.auth().signOut()
        .then( res => {
        const newUserInfo = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: ''
        }
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo)
        }).catch(err => {
        // An error happened.
        console.log(err.message)
      });
    } 
    //CUSTOM LOGIN FORM VALIDATION
    const handleBlur = (e) => {
        if(e.target.name === 'email'){
            const isValidEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(e.target.value);
            console.log(isValidEmail)
        }
        if(e.target.name === 'password'){
            const isValidPassword = e.target.value.length > 6;
            const hasNumber = /\d/g.test(e.target.value);
            console.log(isValidPassword && hasNumber)
        }
    }
    
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Firebase Authentication Start here....🚀</h1>
            {/* SHOW USER DETAILS ON SCREEN */}
            {user.isSignedIn && <div>
                <img style={{height:'100px', borderRadius:'100%'}} src={user.photo} alt=""/>
                <h2>{user.name}</h2>
                <h4>{user.email}</h4>
            </div>}
            {/* SIGN WITH GOOGLE */}
            {
                loggedInUser.isSignedIn ? <Button onClick={handleGoogleSignOut} color="primary" variant="contained">Google Sign Out</Button>:
                <Button onClick={handleSignWithGoogle} color="primary" variant="contained">Sign with Google</Button>
            }
            {/* CUSTOM LOGIN FORM  */}
            <form className="login__form">
                <input onBlur={handleBlur} name="email" type="email" placeholder="Enter your email" required/>
                <input onBlur={handleBlur} name="password" type="password" placeholder="Your password" required/>
                <input type="submit"/>
            </form>
        </div>
    );
};

export default Login;