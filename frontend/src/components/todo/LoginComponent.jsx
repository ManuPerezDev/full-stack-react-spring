import React, {Component} from "react";
import AuthenticationService from "../../api/todo/AuthenticationService";

export default class LoginComponent extends Component{
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
        // AuthenticationService
        //     .executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(
        //         () => {
        //             AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //             this.props.history.push(`/welcome/${this.state.username}`)
        //         }
        //     ).catch(
        //         () => {
        //             this.setState({
        //                 hasLoginFailed: true,
        //                 showSuccessMessage: false
        //             })
        //         }
        //     )

        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                    AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                    this.props.history.push(`/welcome/${this.state.username}`)
                }).catch(() => {
                this.setState({
                    hasLoginFailed: true,
                    showSuccessMessage: false
                })
            }
        )
    }

    render() {
        return(
            <div className="LoginComponent">
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div >Login Successful</div>}
                    User name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}
