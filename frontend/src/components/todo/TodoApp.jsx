import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

class TodoApp extends Component{
    render() {
        return(
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}></Route>
                            <Route path="/login" component={LoginComponent}></Route>
                            <Route path="/welcome/:name" exact component={WelcomeComponent}></Route>
                            <Route path="/todos" exact component={ListTodosComponent}></Route>
                            <Route component={ErrorComponent}></Route>
                        </Switch>
                        <FooterComponent/>
                        </>
                </Router>
            </div>
        )
    }
}

class WelcomeComponent extends Component{
    render() {
        return<div>
            Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>
        </div>
    }
}

class ListTodosComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            todos : [
                    {id: 1, description: 'Learn to dance', done: false, targetDate: new Date()},
                    {id: 2, description: 'Learn React', done: false, targetDate: new Date()},
                    {id: 3, description: 'Visit India', done: false, targetDate: new Date()}
                ]
        }
    }

    render() {
        return(
            <div>
                <h1>List Todos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Is completed?</th>
                            <th>Target date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

class HeaderComponent extends Component{
    render() {
        return(
            <div>
                Header <hr/>
            </div>
        )
    }
}

class FooterComponent extends Component{
    render() {
        return(
            <div>
                <hr/> Footer
            </div>
        )
    }
}

function ErrorComponent() {
    return <div>An Error Ocurred.</div>
}

class LoginComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: 'Manuel',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    loginClicked(){
        if (this.state.username === 'admin' && this.state.password === 'admin'){
            this.props.history.push(`/welcome/${this.state.username}`)
        }
        else{
            this.setState({hasLoginFailed: true, showSuccessMessage: false})
        }
    }

    render() {
        return(
            <div className="LoginComponent">
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                User name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        )
    }
}

export default TodoApp;
