import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Input from '../components/Input.js';
import Button from '../components/Button.js';

function Login(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="Login">
      <Input type="username" track={setEmail}/>
      <Input type="password" track={setPassword}/>
      <Link to="/Categories/" >
        <button type="submit" className="btn btn-outline-dark"
          onClick={() => props.signInUser(email.current.value, password.current.value)} style={{ marginBottom: "20px" }}>
          Login
        </button>
      </Link>
    </div>
  );
}

export default Login;
