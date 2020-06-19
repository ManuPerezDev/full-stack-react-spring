package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardcodedService {

    private static List<Todo> todos = new ArrayList();
    private static int idCounter = 0;

    static {
        todos.add(new Todo(++idCounter, "Manuel", "Learn",false, new Date()));
        todos.add(new Todo(++idCounter, "Manuel", "Learn",false, new Date()));
        todos.add(new Todo(++idCounter, "Manuel", "Learn",false, new Date()));
    }

    public List<Todo> findAll(){
        return todos;
    }

    public Todo deleteById(long id){
        Todo todo = findById(id);
        if(todos.remove(todo)){
            return todo;
        }
        return null;
    }

    public Todo findById(long id) {
        for (Todo todo : todos){
            if(todo.getId() == id){
                return todo;
            }
        }
        return null;
    }
}
