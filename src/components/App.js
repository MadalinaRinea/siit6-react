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

const firebaseConfig = {
    apiKey: "AIzaSyCrNeWr0OTJHvVtOxiVwy4TP6BEA6EUCUQ",
    authDomain: "siit6-44a9f.firebaseapp.com",
    databaseURL: "https://siit6-44a9f.firebaseio.com",
    projectId: "siit6-44a9f",
    storageBucket: "siit6-44a9f.appspot.com",
    messagingSenderId: "383651846910",
    appId: "1:383651846910:web:3f0c8e7e5a54771db163af"
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

