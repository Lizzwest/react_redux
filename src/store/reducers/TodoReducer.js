import { ADD_TODO, NEW_TODO, REMOVE_TODO, MARK_COMPLETE, FAVORITE_TODO, REMOVE_FAVORITE } from '../types';

const initialState = {
    todos: [],
    newTodo: '',
    favorites: []
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
        case FAVORITE_TODO:
            return { ...state, favorites: [...state.favorites, state.todos[action.payload]]}
        case REMOVE_FAVORITE:
            return { ...state, favorites: [...state.favorites.filter((fave, index) => index !== action.payload)]}
        default:
            return { ...state };
    };
};

export default TodoReducer;