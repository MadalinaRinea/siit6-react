import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";

export default function LoginRegister() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        retype_password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        retype_password: '',
    });

    const [alert, setAlert] = useState(null)
    const { pathname } = useLocation();
    const isRegister = (pathname === '/register');

    function handleInputChange(e) {
        setErrors({...errors, [e.target.name]: '' });

        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function isFormValid() {
        let isValid = true;
        const newErrors = {...errors};

        if(!values.email) {
            // Set an error message
            newErrors.email = 'Please provide an email.';
            isValid = false;
        }

        if(!values.password) {
            // Set an error message
            newErrors.password = 'Please provide a password.';
            isValid = false;
        }

        if(isRegister && values.password !== values.retype_password) {
            // Set an error message
            newErrors.retype_password = 'The passwords did not match.';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    }

    console.log(errors);

    function handleSubmit(e) {
        e.preventDefault();
        setAlert(null);

        if(!isFormValid()) {
            return;
        }

        if(!isRegister) {
            // Login
            firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .catch(function(error) {
                    console.warn(error);
                });
        } else {
            // Register
            firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
                .catch(function(error) {
                    console.warn(error);
                    setAlert({type: 'danger', message: error.message});
                });
        }
    }

    return (
        <form onSubmit={ handleSubmit }>
            { alert?.message && (
                <div className={ `alert alert-${alert.type}` } role="alert">
                    { alert.message }
                </div>
            )}
            <h1>{ !isRegister ? 'Login' : 'Register' }</h1>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    className={ `form-control${errors.email && ' is-invalid'}` } 
                    id="email" 
                    name="email" 
                    value={ values.email }
                    onChange={ handleInputChange } />
                <div className="invalid-feedback">
                    { errors.email }
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    className={ `form-control${errors.password && ' is-invalid'}` }  
                    id="password" 
                    name="password" 
                    value={ values.password } 
                    onChange={ handleInputChange } />
                <div className="invalid-feedback">
                    { errors.password }
                </div>
            </div>
            { isRegister && (
                <div className="form-group">
                    <label htmlFor="retype_password">Retype Password</label>
                    <input 
                        type="password" 
                        className={ `form-control${errors.retype_password && ' is-invalid'}` }  
                        id="retype_password" 
                        name="retype_password" 
                        value={ values.retype_password } 
                        onChange={ handleInputChange } />
                    <div className="invalid-feedback">
                        { errors.retype_password }
                    </div>
                </div>
            )}
            
            <div className="form-group">
                <button className="btn btn-primary">{ !isRegister ? 'Login' : 'Register' }</button>
            </div>
        </form>
    )
}
