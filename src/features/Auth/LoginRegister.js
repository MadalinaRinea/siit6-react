import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";

export default function LoginRegister() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    function handleInputChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .catch(function(error) {
                console.warn(error);
            });
    }

    return (
        <form onSubmit={ handleSubmit }>
            <h1>Login</h1>
            <div className="form-group">
                <label htmlFor="genre">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={ values.email } onChange={ handleInputChange } />
            </div>
            <div className="form-group">
                <label htmlFor="genre">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={ values.password } onChange={ handleInputChange } />
            </div>
            <div className="form-group">
                <button className="btn btn-primary">Login</button>
            </div>
        </form>
    )
}
