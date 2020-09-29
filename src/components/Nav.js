import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../features/Auth/AuthContext';

export default function Nav() {
    const { isAuthenticated, user } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Games App</Link>
            

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav w-100">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/">Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item mr-auto">
                        <NavLink className="nav-link" exact to="/games">Games</NavLink>
                    </li>

                    { isAuthenticated ? (
                        <li className="nav-item">
                            Welcome { user.email }! 
                            <a className="nav-link" href="/">Logout</a>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/register">Register</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}
