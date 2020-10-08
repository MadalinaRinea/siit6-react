import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import useForm from '../../hooks/useForm';

const validationRules = {
    title: [
        {name: 'required'},
        {name: 'min-length', value: 6}
    ],
    genre: [
        {name: 'required'}
    ],
    description: [
        {name: 'required'}
    ]
};

export default function EditGame() {
    const [alert, setAlert] = useState(null);
    const [game, setGame] = useState(null);
    const {values, inputProps, errors} = useForm(game, validationRules); 
    
    const { id } = useParams();

    useEffect(() => {
        fetch('https://games-app-siit.herokuapp.com/games/' + id)
            .then(res => res.json())
            .then(data => setGame(data));
    }, [id]);

    if(!game) {
        return <h1>Loading ...</h1>;
    }
    

    function handleSubmit(e) {
        e.preventDefault();

        const { _id, ...newGame } = values;

        if(!errors.length) {
            fetch('https://games-app-siit.herokuapp.com/games/' + id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(newGame), //title=valoare&genre=action&description=blabla%20bla
            })
                .then(res => res.json())
                .then(data => {
                    if(data.message) {
                        // afisam mesajul catre utilizator
                        setAlert({
                            type: 'danger',
                            message: data.message,
                        });
                    } else {
                        // afisam un mesaj de succes utilizatorului
                        setAlert({
                            type: 'success',
                            message: 'The game was updated successfully!',
                        });
                    }
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

            { Boolean(errors.length) && (
                <div className={ `alert alert-danger` } role="alert">
                    The form has validation error(s), please fix them and try again:
                    <ul>
                        { errors.map(error => <li>{ error.message }</li>) }
                    </ul>
                </div>
            )}
            
            <h1>Editing { game.title }</h1>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" {...inputProps('title')} />
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input type="text" className="form-control" id="genre" {...inputProps('genre')} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" {...inputProps('description')}>
                </textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
