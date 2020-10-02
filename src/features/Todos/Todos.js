import React, { useContext, useEffect, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/firestore";
import { AuthContext } from '../Auth/AuthContext';

export default function Todos() {
    const db = firebase.firestore();
    const [todoInput, setTodoInput] = useState('');
    const [filterInput, setFilterInput] = useState('');
    // const [originalTodos, setOriginalTodos] = useState([]);
    const [todos, setTodos] = useState([]);

    const { user } = useContext(AuthContext);

    function handleFilterChange(e) {
        setFilterInput(e.target.value);
    }



    useEffect(() => {
        // if(user) {
        //     db.collection('todos').where('userId', '==', user.uid).get()
        //         .then((res) => {
        //             const todoList = [];
        //             res.forEach((doc) => {
        //                 // console.log(`${doc.id}`, doc.data());
        //                 todoList.push({ id: doc.id, ...doc.data()});
        //             });
        //             setTodos(todoList);
        //         });   
        // }
        if(user) {
            db.collection('todos').where('userId', '==', user.uid).onSnapshot((res) => {
                const todoList = [];
                res.forEach((doc) => {
                    // console.log(`${doc.id}`, doc.data());
                    todoList.push({ id: doc.id, ...doc.data()});
                });
                setTodos(todoList);
                // setOriginalTodos(todoList)
            });   
        }
    }, [db, user])

    function handleInputChange(e) { 
        setTodoInput(e.target.value);
    }

    async function handleAddTodo() {
        if(user && todoInput) {
            try {
                const docRef = await db.collection('todos').add({
                    title: todoInput,
                    completed: false,
                    userId: user.uid,
                });
                
                console.log("Document written with ID: ", docRef.id);
            } catch(error) {
                console.error("Error adding document: ", error);
            };
        }
    }

    async function handleStatusChange(todo) {
        todo.completed = !todo.completed;

        try {
            await db.collection('todos').doc(todo.id).update({
                completed: todo.completed
            });
            console.log("Document successfully updated!");
        } catch(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        };

        setTodos([...todos]);
    }

    async function handleDeleteTodo(toDelete) {
        try {
            await db.collection('todos').doc(toDelete.id).delete();

            console.log("Document successfully deleted!");
        } catch(error) {
            console.error("Error removing document: ", error);
        };
        setTodos(todos.filter(todo => todo !== toDelete));
    }

    return (
        <>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Todos</h1>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Type a new todo item" value={ todoInput } onChange={ handleInputChange } />
                    <div className="input-group-append">
                        <button className="btn btn-primary" disabled={ !todoInput } type="button" onClick={ handleAddTodo }>Add</button>
                    </div>
                </div>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Filter your todo items" value={ filterInput } onChange={ handleFilterChange } />
                </div>
            </div>  
        </div>
        { todos
            .filter(todo => todo.title.toLowerCase().includes(filterInput.toLowerCase()))
            .map(todo => (
                <div className="custom-control custom-checkbox" key={todo.id}>
                    <input 
                        className="custom-control-input" 
                        id={todo.id} 
                        type="checkbox" 
                        checked={todo.completed}
                        onChange={ () => handleStatusChange(todo) } />
                    <label className="custom-control-label" htmlFor={todo.id}>
                        { todo.title }
                        <button className="ml-1 btn btn-outline-danger btn-sm" onClick={ () => handleDeleteTodo(todo) }>&times;</button>
                    </label>
                </div>
        )) }
        </>
    )
}
