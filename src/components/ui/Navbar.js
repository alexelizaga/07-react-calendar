import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authStartLogout } from '../../actions/auth';

import { Offline, Online } from 'react-detect-offline';

export const Navbar = () => {
  const { name } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch( authStartLogout() );
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
        <span className='navbar-brand'>{name}</span>

        <Online>
          <span className='text-success'>Online</span>
        </Online>
        <Offline>
          <span className='text-danger'>Offline</span>
        </Offline>

        <button
          className='btn btn-outline-danger'
          onClick={ handleLogout }
        >
            <i className='fas fa-sign-out-alt'></i>
            <span> Salir</span>
        </button>
    </div>
  )
}
