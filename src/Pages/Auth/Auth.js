import React from 'react'
import { Auth } from "aws-amplify";

const AuthScreen = () => {

    return (
        <div className="authScreen d-flex w-100 align-items-center justify-content-center">
            <button className="btn btn-dark" onClick={() => Auth.federatedSignIn()}>Sign-in</button>
        </div>
    )
}

export default AuthScreen;
