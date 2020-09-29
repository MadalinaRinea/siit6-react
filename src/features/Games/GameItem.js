import React from 'react'
import { Link } from 'react-router-dom';

export default function GameItem({ game, onDelete }) {

    function handleDelete(e) {
        fetch('https://games-app-siit.herokuapp.com/games/' + game._id, {
            method: 'DELETE'
        })
            .then(res => res.text())
            .then(message => {
                console.log(message);
                onDelete(game._id);
            });
    }

    return (
        <div className="card col-3">
            <img src={game.imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{ game.title }</h5>
                <p className="card-text">{game.description?.substring(0, 50)}</p>
                <Link to={ `/games/${game._id}` } className="btn btn-primary">Details</Link>
                <button className="btn btn-danger" onClick={ handleDelete }>Delete</button>
            </div>
        </div>
    );
}
