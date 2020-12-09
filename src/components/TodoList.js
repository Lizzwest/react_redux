import React from 'react';
import { connect } from 'react-redux';
import TodoForm from './TodoForm';
import { AddTodo, RemoveTodo, CreateNewTodo, MarkComplete, FavoriteTodo } from '../store/actions/TodoActions';
import FavoriteTodos from './FavoriteTodos'


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
    return (<li className="todo-item current" key={index}>
                <div>
                    { todo.complete ? 
                    <span>
                        {`✅ `}
                        <span style={{color: 'red', textDecoration: 'line-through', fontWeight: '700'}}>
                            <span style={{color: 'white'}}>{todo.task}</span>
                        </span>
                    </span>
                    : `✏️ ${todo.task}` }
                </div>
                <button onClick={() => props.markComplete(index)}>Complete</button>
                <button onClick={() => props.removeTodo(index)}>Remove</button>
                <button onClick={() => props.favoriteTodo(index)}>Favorite</button>
            </li>)
});
    
    return (
        <div>
            <TodoForm 
                newTodo={props.todoState.newTodo}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <div className="list-container">
                <div>
                    <h2>Current Todo Items</h2>
                    {props.todoState.todos.length ?
                    <ul className='todo-list'>
                        {todos}
                    </ul>
                    :
                    <></>}
                    
                </div>
                <FavoriteTodos />
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        todoState: state.todoState
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        addTodo: (newTodo) => dispatch(AddTodo(newTodo)),
        removeTodo: (index) => dispatch(RemoveTodo(index)),
        createTodo: (formData) => dispatch(CreateNewTodo(formData)),
        markComplete: (index) => dispatch(MarkComplete(index)),
        favoriteTodo: (index) => dispatch(FavoriteTodo(index))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(TodoList);