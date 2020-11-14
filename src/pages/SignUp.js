import React, { useRef } from "react";
import SignUpButton from "../components/SignUp/SignUpButton.js";
import SignUpColumn from "../components/SignUp/SignUpColumn.js";

function SignUp(props) {

  const email = useRef();
  const password = useRef();

  const signUp = () => {
    props.signUpUser(email.current.value, password.current.value);
  }

  return (
    <div className="mx-auto card" style={{ margin: "40px", maxWidth: "500px" }}>
      <div style={{ margin: "20px" }}>
        <SignUpColumn emailRef={email} passwordRef={password}/>
        <SignUpButton onClick={signUp}/>
      </div>
    </div>
  )
}

export default SignUp;