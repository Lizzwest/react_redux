import { ADD_TODO, NEW_TODO, REMOVE_TODO } from '../types';

export const AddTodo = (todo) => ({
    type: ADD_TODO,
    payload: todo
});

export const CreateNewTodo = (formData) => ({
    type: NEW_TODO,
    payload: formData
});

export const RemoveTodo = (index) => ({
    type: REMOVE_TODO,
    payload: index
});