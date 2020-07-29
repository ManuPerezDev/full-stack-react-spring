import React from "react";
import {Route, Redirect} from 'react-router-dom';
import AuthenticationService from "../../api/todo/AuthenticationService.js";

export default function AuthenticatedRoute (props){
        if(AuthenticationService().isUserLoggedIn()){
            return <Route {...props}/>
        }else{
            return <Redirect to="/login"/>
        }
}
