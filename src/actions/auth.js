import Swal from 'sweetalert2';
import { fetchWithoutToken } from '../helpers/fetch';
import { types } from '../types/types';

export const authStartLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchWithoutToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login( {
                uid: body.uid,
                name: body.name,
            } ) );
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
};

export const authStartRegister = ( name, email, password ) => {
    return async( dispatch ) => {
            
            const resp = await fetchWithoutToken( 'auth/new', { name, email, password }, 'POST' );
            const body = await resp.json();
    
            if ( body.ok ) {
                localStorage.setItem( 'token', body.token );
                localStorage.setItem( 'token-init-date', new Date().getTime() );
    
                dispatch( login( {
                    uid: body.uid,
                    name: body.name,
                } ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
    
    }
};

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});