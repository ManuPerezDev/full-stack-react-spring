import axios from 'axios';
import {JPA_API_URL} from '../../Constants'

export default function TodoDataService(){
    function retrieveAllTodos(name){
        return axios.get(`${JPA_API_URL}/users/${name}/todos`)
    }

    function retrieveTodo(name, id){
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }

    function deleteTodo(name, id){
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }

    function updateTodo(name, id, todo){
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo)
    }

    function createTodo(name, todo){
        return axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo)
    }

    return{
        retrieveAllTodos: retrieveAllTodos,
        retrieveTodo: retrieveTodo,
        deleteTodo: deleteTodo,
        updateTodo: updateTodo,
        createTodo: createTodo
    }
}
