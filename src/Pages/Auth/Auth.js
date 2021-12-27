import React from 'react'
import { Auth } from "aws-amplify";
import { useHistory } from 'react-router-dom';

const AuthScreen = () => {

    const history = useHistory();;

    const googleSignIn = async () => {
        try {
            await Auth.federatedSignIn({ provider: 'Google'});
        } catch (error) {
            console.log(error);
        }
      }

      const checkUser = async () => {
          const user = await Auth.currentAuthenticatedUser();
          console.log(user); 
          console.log(user.getUsername()); 
      }

    return (
        <div className="authScreen d-flex w-100 align-items-center justify-content-center">
            <button className="btn btn-dark" onClick={() => Auth.federatedSignIn()}>Sign-in</button>
        </div>
    )
}

export default AuthScreen;
