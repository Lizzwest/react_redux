import { ADD_TODO, NEW_TODO, REMOVE_TODO, MARK_COMPLETE } from '../types';

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

export const MarkComplete = (index) => ({
    type: MARK_COMPLETE,
    payload: index
});