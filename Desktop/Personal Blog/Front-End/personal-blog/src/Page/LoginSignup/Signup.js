import React, { useRef } from "react";
import "./LoginSignup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import { MDBInput,MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom";
import {auth} from "../../Component/FirebaseConfig/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import API from "../../API";

const Signup = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const userNameRef = useRef(null);
    const goTo = useNavigate();

    const handleSubmit = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        createUserWithEmailAndPassword(auth,email,password).then(
            () => {
                updateProfile(auth.currentUser, {
                    displayName: userNameRef.current.value,
                    photoURL: 'https://firebasestorage.googleapis.com/v0/b/fir-9bc5d.appspot.com/o/imgs%2Fdefault-avatar-icon-of-social-media-user-vector.jpg?alt=media&token=ebfd3853-38e9-46f4-a3e6-d02df66db0bc'
                }).then(
                    () => {
                        API.createUser(
                            auth.currentUser.uid, 
                            auth.currentUser.displayName, 
                            auth.currentUser.email,
                            auth.currentUser.photoURL);
                    }
                )
                goTo('/home');
            }
        ).catch(
            (error) => {
                console.error('Error creating user:', error);
                alert('Email already used.');
                userNameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";
            }
        )
    }

    return (
        <div className="App" style={{backgroundImage: 'url(/img/contact-bg.jpg)'}}>
            <div className="login-signup-container">
                <div className="login-signup-header">
                    <div className="login-signup-text">Sign Up</div>
                </div>
                <div className="login-signup-inputs">
                    <div className="input">
                        <FontAwesomeIcon icon={faUser} className="input-icon"/>
                        <MDBInput className="input-box" label="User Name" id="typeText" type="text" ref={userNameRef}/>
                    </div>
                    <div className="input">
                        <FontAwesomeIcon icon={faEnvelope} className="input-icon"/>
                        <MDBInput className="input-box" label="User's Email" id="typeEmail" type="email" ref={emailRef} />
                    </div>
                    <div className="input">
                        <FontAwesomeIcon icon={faLock} className="input-icon"/>
                        <MDBInput className="input-box" label="Password" id="typePassword" type="password" ref={passwordRef}/>
                    </div>
                </div>
                <div className="submit-container">
                    <MDBBtn className='me-1 submit-btn' color='success' onClick={handleSubmit}>
                        Register
                    </MDBBtn>
                    <div className="underline"></div>
                    <div className="have-account-text">
                        Already have an account? 
                        <Link className="highlight-text" to={'/login'}>Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;