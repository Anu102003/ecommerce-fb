import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Action';

export const PageNotFound = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logout());
  }
  return (
    <div>PageNotFound
      <button onClick={logout}>logout</button>
    </div>
  )
}
