import React, { useState } from "react";
import AuthenticationService from "../../api/todo/AuthenticationService";

export default function LoginComponent(props){
    const [username, setUsername] = useState('Manuel')
    const [password, setPassword] = useState('')
    const [hasLoginFailed, setHasLoginFailed] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    function loginClicked(){
        AuthenticationService()
            .executeJwtAuthenticationService(username, password)
            .then((response) => {
                    AuthenticationService().registerSuccessfulLoginForJwt(username, response.data.token)
                    props.history.push(`/welcome/${username}`)
                }).catch(() => {
                setHasLoginFailed(true)
                setShowSuccessMessage(true)
            }
        )
    }

    return(
        <div className="LoginComponent">
            <h1>Login</h1>
            <div className="container">
                {hasLoginFailed && <div className="alert-warning">Invalid Credentials</div>}
                {showSuccessMessage && <div >Login Successful</div>}
                User name: <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                Password: <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn btn-success" onClick={loginClicked}>Login</button>
            </div>
        </div>
    )
}
