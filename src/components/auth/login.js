import React, { useContext } from "react";
import firebase from "firebase/app";
import { Toastr, FirebaseApp } from "../../services";
import { AuthContext } from "../../contexts";
import { Redirect } from "react-router-dom";

export const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  const loginUser = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    FirebaseApp.auth
      .signInWithPopup(provider)
      .then((_) => history.push("/"))
      .catch(({ message }) => Toastr.error(message, "Login Error"));
  };

  return (
    <div className="button login">
      <button onClick={loginUser}>Login with Google</button>
    </div>
  );
};
