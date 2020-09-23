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

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
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
            photo: '',
        }
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        }).catch(err => {
        // An error happened.
        console.log(err.message)
      });
    } 
    //CUSTOM LOGIN FORM VALIDATION
    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /(.+)@(.+){2,}\.(.+){2,}/.test(e.target.value);
        }
        if(e.target.name === 'password'){
            const isValidPassword = e.target.value.length > 6;
            const hasNumber = /\d/g.test(e.target.value);
            isFieldValid = isValidPassword && hasNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    //CUSTOM lOGIN FORM SUBMIT
    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                const newUserInfo = {...user};
                newUserInfo.isSignedIn = true;
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUser(user.name, user.photo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch(err => {
                const newUserInfo = {...user};
                newUserInfo.error = err.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
                setLoggedInUser(newUserInfo)
            })
        }

        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                const newUserInfo = {...user};
                newUserInfo.isSignedIn = true;
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch(err => {
                const newUserInfo = {...user};
                newUserInfo.error = err.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
                setLoggedInUser(newUserInfo)
            })
            }
        e.preventDefault();
    }

    //UPDATE NAME AND PHOTP
    const updateUser = (name, photo) => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
            photoURL: photo
        })
        .then(res => {
            console.log('User name update successfully')
        })
        .catch(err => {
            console.log('User name update failed')
        })
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
            <form className="login__form" onSubmit={handleSubmit}>
                <div display="flex" alignItems="center">
                    <input type="checkbox" style={{marginRight:'5px'}} name="newUser" onClick={() => setNewUser(!newUser)}/>
                    <label htmlFor="newUser">Sign in new user</label>
                </div>
                {newUser && <input onBlur={handleBlur} name="name" type="text" placeholder="Enter your name" required/>}
                <input onBlur={handleBlur} name="email" type="email" placeholder="Enter your email" required/>
                <input onBlur={handleBlur} name="password" type="password" placeholder="Your password" required/>
                <input onBlur={handleBlur} name="photo" type="file" />
                {loggedInUser.isSignedIn ? <Button onClick={handleGoogleSignOut} color="primary" variant="contained">Sign Out</Button> :
                 <input type="submit"/>}

            </form>
            {/* SHOW LOGIN SUCCESS OR ERROR MESSAGE */}
                {user.success ? <p style={{color:'green', fontWeight:'bold'}}>User {newUser ? 'created' : 'logged in'} successfully</p> :
                <p style={{color:'red', fontWeight:'bold'}}>{user.error}</p>}
        </div>
    );
};

export default Login;