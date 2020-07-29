import React, {useState, useEffect} from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "../../api/todo/AuthenticationService";
import moment from "moment";

export default function ListTodosComponent (props){
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)

    useEffect(() => {
        refreshTodos()
    })

    function refreshTodos() {
        let username = AuthenticationService().getLoggedInUsername()
        TodoDataService().retrieveAllTodos(username)
            .then(response => {setTodos(response.data)})
    }

    function deleteTodoCLicked(id){
        let username = AuthenticationService().getLoggedInUsername()
        TodoDataService().deleteTodo(username, id)
            .then(response => {
                    setMessage(`Delete of todo ${id} succesful`)
                    refreshTodos()
                }
            )
    }

    function updateTodoCLicked(id){
        props.history.push(`/todos/${id}`)
    }

    function addTodoCLicked(){
        props.history.push(`/todos/-1`)
    }

    return(
        <div>
            <h1>List Todos</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Is completed?</th>
                        <th>Target date</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo =>
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td><button className="btn btn-success" onClick={() => updateTodoCLicked(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodoCLicked(todo.id)}>Delete</button></td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={addTodoCLicked}>Add</button>
                </div>
            </div>
        </div>
    )
}
