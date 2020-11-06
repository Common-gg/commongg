import React from 'react';
import Input from '../components/Input.js';
import Button from '../components/Button.js';

function Login() {
  return (
    <div className="Login">
      <Input type="username"/>
      <Input type="password"/>
      <Button text="Submit"/>
    </div>
  );
}

export default Login;
