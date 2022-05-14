//import Images from '../services/Images';

import './Tarefas.css';
import axios from "axios";
import { useEffect, useState } from "react";
import Tarefa from '../componentes/Tarefa'

function Tarefas() {

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [inputVisibility, setInputVisibility] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    async function handleWithNewButton() {
        console.log("chegou");
        setInputVisibility(!inputVisibility);
    }

    async function getTodos() {
        const response = await axios.get("http://localhost:3333/todos");
        console.log(response);
        setTodos(response.data);
    }

    async function createTodo() {
        const response = await axios.post("http://localhost:3333/todos", {
            name: inputValue,
        });
        getTodos();
        setInputVisibility(!inputVisibility);
        setInputValue("");
    }

    async function deleteTodo(todo) {
        await axios.delete(`http://localhost:3333/todos/${todo.id}`);
        getTodos();
    }

    async function editTodo() {
        const response = await axios.put("http://localhost:3333/todos", {
            id: selectedTodo.id,
            name: inputValue,
        });
        console.log("AQUI,", response)
        setSelectedTodo(null);
        setInputVisibility(false);
        getTodos();
        setInputValue("");
    }

    async function modifyStatusTodo(todo) {
        const response = await axios.put("http://localhost:3333/todos", {
            id: todo.id,
            status: !todo.status,
        });
        getTodos();
    }

    async function handleWithEditButtonClick(todo) {
        setSelectedTodo(todo)
        setInputValue(todo.name)
        setInputVisibility(true);
    }

    useEffect(() => {
        getTodos();
    }, []);
    return (
        <div className="App">
            <header className="container">
                <div className="header">
                    <h1>Dont be lazzy</h1>
                </div>
                <div className="todos">
                {todos.map((todo) => {
                    return (
                    <Tarefa
                        key={todo.id}
                        todo={todo}
                        modifyStatusTodo={modifyStatusTodo}
                        handleWithEditButtonClick={handleWithEditButtonClick}
                        deleteTodo={deleteTodo}>
                    </Tarefa>
                )})}</div>
                <input
                    value={inputValue}
                    style={{ display: inputVisibility ? "block" : "none" }}
                    onChange={(event) => {
                        setInputValue(event.target.value);
                    }}
                    className="inputName"
                ></input>

                <button
                    onClick={
                        inputVisibility
                            ? selectedTodo
                                ? editTodo
                                : createTodo
                            : handleWithNewButton
                    }
                    className="newTaskButton">
                    {inputVisibility ? "Confirm" : "+ New Task"}
                </button>
            </header>
        </div>
    );
}

export default Tarefas;
