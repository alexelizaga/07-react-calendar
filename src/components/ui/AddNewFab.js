import React from 'react'
import { useDispatch } from 'react-redux';

import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }

    return (
        <button
            className='btn btn-primary fab-new btn-fab btn-fab-mini text-white'
            onClick={ handleClickNew }
        >
            <i className='fas fa-plus'></i>
        </button>
    )
}
