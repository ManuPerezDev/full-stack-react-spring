import React, {Component} from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

export default class ListTodosComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            todos : [
            ],
            message : null
        }
        this.deleteTodoCLicked = this.deleteTodoCLicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
    }


    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    this.setState({todos: response.data})
                }
            )
    }

    deleteTodoCLicked(id){
        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({message : `Delete of todo ${id} succesful`})
                    this.refreshTodos()
                }
            )
    }

    render() {
        return(
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Is completed?</th>
                            <th>Target date</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoCLicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
