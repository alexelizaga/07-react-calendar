import React from 'react';
import { useDispatch } from 'react-redux';

import { eventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const handleClickDelete = () => {
        dispatch( eventDeleted() );
    }

    return (
        <button
            className='btn btn-danger fab-delete btn-fab btn-fab-mini text-white'
            onClick={ handleClickDelete }
        >
            <i className='fas fa-trash'></i>
        </button>
    )
}
