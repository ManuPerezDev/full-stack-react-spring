import axios from 'axios';
import {API_URL} from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

export default function AuthenticationService(){

    function executeBasicAuthenticationService(username, password){
        return axios.get(`${API_URL}/basicauth`, {
            headers: {
                authorization: createBasicAuthToken(username, password)
            }
        })
    }
    function executeJwtAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`, {
                username,
                password
        })
    }

    function createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username + ':' + password)
    }

    function createJwtToken(token){
        return 'Bearer ' + token
    }

    function registerSuccessfulLogin(username, password){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        setupAxiosInterceptors(createBasicAuthToken(username, password))
    }

    function registerSuccessfulLoginForJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        setupAxiosInterceptors(createJwtToken(token))

    }


    function logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    function isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

        if(user === null) return false

        return true
    }

    function getLoggedInUsername(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user === null) return ''
        return user
    }

    function setupAxiosInterceptors(token){
        axios.interceptors.request.use(
            (config) => {
                if(isUserLoggedIn){
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

    return{
        executeJwtAuthenticationService: executeJwtAuthenticationService,
        registerSuccessfulLoginForJwt: registerSuccessfulLoginForJwt,
        isUserLoggedIn: isUserLoggedIn,
        getLoggedInUsername: getLoggedInUsername,
        logout: logout
    }
}
