import React, { useRef, useState } from "react";
import SignUpButton from "../components/SignUp/SignUpButton.js";
import SignUpColumn from "../components/SignUp/SignUpColumn.js";

function SignUp(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signUp = () => {
    console.log(email.current.value);
    props.signUpUser(email.current.value, password.current.value);
  }

  return (
    <div className="mx-auto card"
      style={{
        margin: "40px",
        maxWidth: "500px",
        backgroundColor: "#292823",
        borderRadius: "10px",
        boxShadow: "-1px 10px 250px 1px #171421"
      }}>
      <div style={{
        margin: "20px",
      }}>
        <SignUpColumn setEmail={setEmail} setPassword={setPassword} />
        <SignUpButton click={signUp} />
      </div>
    </div>
  )
}

export default SignUp;