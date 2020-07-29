import React, {useEffect, useState} from "react";
import moment from "moment";
import {Formik, Form, Field, ErrorMessage} from "formik";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "../../api/todo/AuthenticationService";

export default function TodoComponent (props){
    const [id] = useState(props.match.params.id)
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState(moment(new Date()).format('YYYY-MM-DD'))

    useEffect(() => {
        if(id === -1){
            return
        }
        let username = AuthenticationService().getLoggedInUsername()
        TodoDataService().retrieveTodo(username, id)
            .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(moment(response.data.targetDate).format('YYYY-MM-DD'))
                }
            )
    })

    function validate(values){
        let errors = {}
        if(!values.description){
            errors.description = 'Enter a Description'
        }else if(values.description.length < 5){
            errors.description = 'Enter at least 5 characters in description'
        }
        if(!moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors
    }

    function onSubmit(values) {
        let username = AuthenticationService().getLoggedInUsername()
        let todo = {
            id: id,
            description: values.description,
            targetDate: values.targetDate
        }

        if(id === -1){
            TodoDataService().createTodo(username, todo).then(
                () => props.history.push('/todos')
            )
        }else {
            TodoDataService().updateTodo(username, id,todo).then(
                () => props.history.push('/todos')
            )
        }
    }


    return(
        <div>
            <h1>Todo</h1>
            <div className="container">
                <Formik
                    initialValues={{description, targetDate}}
                    onSubmit={onSubmit}
                    validate={validate}
                    enableReinitialize={true}
                >
                    {
                        (props) =>(
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )

}
