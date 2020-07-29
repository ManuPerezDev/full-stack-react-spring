import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';
import HelloWorldService from "../../api/todo/HelloWorldService";

export default function WelcomeComponent(){
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const { name } = useParams();

    return(
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {name}.
                    You can manage your todos <Link to="/todos">here</Link>
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {welcomeMessage}
                </div>
            </>
    );

    function retrieveWelcomeMessage(){
        HelloWorldService.executeHelloWorldPathVariableService(name).
            then(response => setWelcomeMessage(response.data.message))
    }
}
