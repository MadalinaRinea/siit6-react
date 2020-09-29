import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function EditGame() {
    const [game, setGame] = useState(null);
    const [alert, setAlert] = useState(null);
    const [isValid, setIsValid] = useState({
        title: true,
        genre: true,
        description: true,
    });

    const { id } = useParams();

    useEffect(() => {
        fetch('https://games-app-siit.herokuapp.com/games/' + id)
            .then(res => res.json())
            .then(data => setGame(data));
    }, [id]);

    if(!game) {
        return <h1>Loading ...</h1>;
    }
    
    console.log(game);

    function handleInputChange(e) {
        // const newGame = { ...game };
        // newGame[e.target.name] = e.target.value;
        // setGame(newGame);

        setGame({ ...game, [e.target.name]: e.target.value });

        if(!e.target.value) {
            setAlert({
                type: 'danger',
                message: 'All fields are mandatory',
            });

            setIsValid({ ...isValid, [e.target.name]: false});
        } else {
            setAlert(null);
            setIsValid({ ...isValid, [e.target.name]: true});
        }
    }

    function isFormValid() {
        for(const field in isValid) {
            if(!isValid[field]) {
                return false;
            }
        }
        
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const { _id, ...newGame } = game;

        if(isFormValid()) {
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
    console.log(alert);
    return (
        <form onSubmit={ handleSubmit }>
            { alert?.message && (
                <div className={ `alert alert-${alert.type}` } role="alert">
                    { alert.message }
                </div>
            )}
            
            <h1>Editing { game.title }</h1>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={ game.title } onChange={ handleInputChange } />
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input type="text" className="form-control" id="genre" name="genre" value={ game.genre } onChange={ handleInputChange } />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" name="description" value={ game.description } onChange={ handleInputChange }>
                </textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
