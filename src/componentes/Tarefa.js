import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import './Tarefa.css'

export default function Todos({ todo, modifyStatusTodo, handleWithEditButtonClick, deleteTodo }) {

    return (
        <div className="todo" key={todo.id}>
            <button
                onClick={() => modifyStatusTodo(todo)}
                className="checkbox"
                style={{ backgroundColor: todo.status ? "#A879E6" : "white" }}
            ></button>
            <p>{todo.name}</p>
            <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
            </button>
            <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
            </button>
        </div>)
};