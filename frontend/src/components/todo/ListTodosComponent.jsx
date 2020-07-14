import React, {Component} from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

export default class ListTodosComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            todos : [
            ],
            message : null
        }
        this.updateTodoCLicked = this.updateTodoCLicked.bind(this);
        this.deleteTodoCLicked = this.deleteTodoCLicked.bind(this);
        this.addTodoCLicked = this.addTodoCLicked.bind(this);
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

    updateTodoCLicked(id){
        this.props.history.push(`/todos/${id}`)
    }

    addTodoCLicked(){
        this.props.history.push(`/todos/-1`)
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
                            <th>Update</th>
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
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoCLicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoCLicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoCLicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}
