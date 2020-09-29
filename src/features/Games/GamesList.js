import React, { useEffect, useState } from 'react';
import GameItem from './GameItem';

export default function GamesList() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('https://games-app-siit.herokuapp.com/games')
            .then(res => res.json())
            .then(data => setGames(data));
    }, []);

    function handleDeleteGame(id) {
        const newGames = games.filter(game => game._id !== id);
        setGames(newGames);
    }

    return (
    <div>
        <h1>Games</h1>
        <div className="row justify-content-between">
            { games.map(item => <GameItem game={ item } key={ item._id } onDelete={ handleDeleteGame } />) } 
        </div>
    </div>
    );
}