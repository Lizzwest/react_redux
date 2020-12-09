import React from 'react';
import { connect } from 'react-redux';
import { RemoveFavorite } from '../store/actions/TodoActions'

const FavoriteTodos = (props) => {
    const favorites = props.todoState.favorites.map((fave, index) => {
        return (
            <li key={index} className="todo-item fave">
                <div>💯 {fave.task}</div>
                <button onClick={() => props.removeFavorite(index)}>Remove</button>
            </li>
        )
    })

    return (
        <div>
            <h2>Favorite Todos</h2>
            {props.todoState.favorites.length ? 
            <ul className="todo-list">
                {favorites}
            </ul>
            :
            <></>}
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        todoState: state.todoState
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        removeFavorite: (index) => dispatch(RemoveFavorite(index))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(FavoriteTodos)