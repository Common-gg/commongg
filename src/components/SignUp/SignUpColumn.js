import React from 'react';
import Label from "../Label.js";
import Input from "../Input.js";

function SignUpColumn(props) {
    return (
        <div className="SignUpColumn">
            <div className="form-row">
                <div className="col-md-6 mb-3">
                    <Label htmlFor="validationDefault01" text="Email"/>
                    <Input type="text" 
                    id="validationDefault01" 
                    placeholder="Useremail@email.com" 
                    track={props.setEmail}/>
                </div>

                <div className="col-md-6 mb-3">
                    <Label htmlFor="validationDefault02" text="Password"/>
                    <Input type="password" 
                    id="validationDefault02" 
                    placeholder="Password" 
                    track={props.setPassword}/>
                </div>
            </div>
        </div>
    );
}

export default SignUpColumn;
