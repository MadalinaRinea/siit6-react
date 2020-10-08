import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from "firebase/app";

import Nav from './Nav';
import GamesList from '../features/Games/GamesList';
import GameDetails from '../features/Games/GameDetails';
import EditGame from '../features/Games/EditGame';
import LoginRegister from '../features/Auth/LoginRegister';
import { AuthContextProvider } from '../features/Auth/AuthContext';
import Todos from '../features/Todos/Todos';

import 'bootstrap/dist/css/bootstrap.css';
console.log(process.env)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FBapiKey,
    authDomain: process.env.REACT_APP_FBauthDomain,
    databaseURL: process.env.REACT_APP_FBdatabaseURL,
    projectId: process.env.REACT_APP_FBprojectId,
    storageBucket: process.env.REACT_APP_FBstorageBucket,
    messagingSenderId: process.env.REACT_APP_FBmessagingSenderId,
    appId: process.env.REACT_APP_FBappId
};
firebase.initializeApp(firebaseConfig);

function App() {
    return (
        <AuthContextProvider>
            <div className="container">
                <Router>
                    <Nav />

                    <Route exact path="/" component={ () => <h1>Homepage</h1> } />
                    
                    <Route exact path="/login" component={ LoginRegister } />
                    <Route exact path="/register" component={ LoginRegister } />

                    <Route exact path="/todos" component={ Todos } />

                    <Route exact path="/games" component={ GamesList } />
                    <Route exact path="/games/edit/:id" component={ EditGame } />
                    <Route exact path="/games/:id" component={ GameDetails } />
                </Router>
            </div>
        </AuthContextProvider>
    );
}

export default App;

