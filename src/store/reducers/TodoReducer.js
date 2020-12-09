import { ADD_TODO, NEW_TODO, REMOVE_TODO, MARK_COMPLETE } from '../types';

const initialState = {
    todos: [],
    newTodo: ''
};

const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {...state, todos: [...state.todos, {task: action.payload, complete: false}], newTodo: '' };
        case NEW_TODO:
            return { ...state, newTodo: action.payload};
        case REMOVE_TODO:
            return { ...state, todos: [...state.todos.filter((todo, index) => index !== action.payload)]};
        case MARK_COMPLETE:
            return { ...state, todos: [...state.todos.map((todo, index, arr) => {
                if (index === action.payload) {
                    todo.complete = true;
                }
                return todo;
            }).sort((a,b)=> (a.complete === b.complete) ? 0 : a.complete ? 1 : -1)]};
        default:
            return { ...state };
    };
};

export default TodoReducer;