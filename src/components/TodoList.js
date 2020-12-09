import React from 'react';
import { connect } from 'react-redux';
import TodoForm from './TodoForm';
import { AddTodo, RemoveTodo, CreateNewTodo, MarkComplete } from '../store/actions/TodoActions';

const TodoList = (props) => {
    console.log(props)
    const handleChange = (e) => {
        props.createTodo(e.target.value)
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        props.addTodo(props.todoState.newTodo)
    };

const todos = props.todoState.todos.map((todo, index) => {
    return (<li style={{listStyle: 'none', padding: '10px', color: 'cyan', backgroundColor: 'black'}} key={index}>
                <div>
                    {todo.complete ? 
                     `✅ ${todo.task}`
                     :
                     todo.task
                    }
                </div>
                <button onClick={() => props.markComplete(index)}>Complete</button>
                <button onClick={() => props.removeTodo(index)}>Remove</button>

            </li>)
});
    
    return (
        <div>
            <TodoForm 
                newTodo={props.todoState.newTodo}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <ul>
                {todos}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        todoState: state.todoState
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        addTodo: (newTodo) => dispatch(AddTodo(newTodo)),
        removeTodo: (index) => dispatch(RemoveTodo(index)),
        createTodo: (formData) => dispatch(CreateNewTodo(formData)),
        markComplete: (index) => dispatch(MarkComplete(index))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(TodoList);