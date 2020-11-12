import React, { useRef } from "react";

function SignUp(props) {
  
  const email = useRef();
  const password = useRef();

  return (
    <div className="mx-auto card" style={{ margin: "40px", maxWidth: "500px" }}>
      <div style={{margin: "20px"}}>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="validationDefault01">Email</label>
            <input type="text"
              className="form-control"
              id="validationDefault01"
              placeholder="Useremail@email.com" 
              ref={email}
              required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="validationDefault02">Password</label>
            <input type="password"
              className="form-control"
              id="validationDefault02"
              placeholder="Password" 
              ref={password}
              required />
          </div>
        </div>
        
        <button className="btn btn-info" onClick={() => props.signUpUser(email.current.value, password.current.value)}>Sign Up</button>
      </div>
    </div>
  )
}

export default SignUp;