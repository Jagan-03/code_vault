import React from 'react'
import { Auth } from "aws-amplify";

import "./auth.css";

const AuthScreen = () => {

    return (
        <div className="authScreen d-flex w-100 flex-column align-items-center justify-content-center text-center">
            <h1>CODE VAULT</h1>
            <p className="text-white-50">Store your code snippets for future use with code vault</p>
            <button className="btn btn-secondary" onClick={() => Auth.federatedSignIn()}>Sign-in</button>
        </div>
    )
}

export default AuthScreen;
