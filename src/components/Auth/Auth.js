import React from "react";
import {
  Grid,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import useChangeInputConfig from "../hooks/useInput";
import useFetchAPI from "../hooks/useFetchAPI";
import CheckAuthCookie from "../hooks/checkAuthCookie";
import("./Auth.css")


function Auth(props) {
  
  // console.log(props);
  // console.log(props.match);
  let isLoginRoute = props.match.path === "/login";
  let buttonTitle = isLoginRoute ? "Login" : "Sign up";
  let apiURL = isLoginRoute ? "/users/login" : "/users/create-user";

  const {checkIfCookieExists}= CheckAuthCookie()

  const [
    { isLoading, response, error, setResponse },
    handleAPICallButtonSubmit,
    isMessageOpen,
    ,
    handleMessageClose,
    successMessageValue,
  ] = useFetchAPI(apiURL);

  const [
    email,
    handleEmailChange,
    isEmailError,
    emailErrorMessage,
    isEmailDisbaled,
    clearEmailInput,
  ] = useChangeInputConfig("email");

  const [
    username,
    handleUsernameChange,
    isUsernameError,
    usernameErrorMessage,
    isUsernameDisbaled,
    clearUsernameInput,
  ] = useChangeInputConfig("username");

  const [
    password,
    handlePasswordChange,
    isPasswordError,
    passwordErrorMessage,
    isPasswordDisbaled,
    clearPasswordInput,
  ] = useChangeInputConfig("password");

  function handleOnSubmit(e) {
    e.preventDefault();

    const user = isLoginRoute
      ? { email, password }
      : { email, username, password };

    handleAPICallButtonSubmit({
      method: "post",
      data: {
        ...user,
      },
    });
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function errorMessage() {
    return (
      <Snackbar
        open={isMessageOpen}
        autoHideDuration={6000}
        onClose={handleMessageClose}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    );
  }

  function successMessage() {
    return (
      <Snackbar
        open={isMessageOpen}
        autoHideDuration={6000}
        onClose={handleMessageClose}
      >
        <Alert severity="success">{successMessageValue}</Alert>
      </Snackbar>
    );
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (response === "user created") {
    clearEmailInput();
    clearUsernameInput();
    clearPasswordInput();
    setResponse(null);
  }

  if(checkIfCookieExists()){
    props.history.push("/protected")
  }
  return (
    <div>
             <p style={{color:"red"}}>AUTHORIZED LAW ENFORCEMENT USE ONLY!</p>
             
        <div className="background-wrap">
          <div className="background" />
        </div>
        <form id="accesspanel" onSubmit={handleOnSubmit}>
          <h1 id="litheader">PATRIOT CAD SYSTEMS</h1>
          <div className="inset">
            <p>
              <input 
              type="text" 
              name="email" 
              id="email" 
              placeholder="Email address" 
              value={email}
              onChange={handleEmailChange}
              
              style={{color:"green"}} 
              helperText={emailErrorMessage}
              />
              {/* <div className="errorMessage">{emailError && emailError}</div> */}
            </p>
            <p>
              <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Access code"
              value={password} 
              onChange={handlePasswordChange}
              style={{color:"green"}}
              />
              <div className="errorMessage">
                  {/* {passwordError && passwordError} */}
            </div>
            </p>
            <div style={{textAlign: 'center'}}>
              
            </div>
            <input className="loginLoginValue" type="hidden" name="service" defaultValue="login" />
          </div>
          <p className="p-container">
            <input type="submit" name="Login" id="go" defaultValue="Authorize" />
          </p>
        </form>
      </div>
  );
}

export default Auth;
