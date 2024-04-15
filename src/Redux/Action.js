import { REMOVE_USER, SET_USER } from "./Type"

export const login = (email) => ({
  type: SET_USER,
  payload: {email},
});

export const logout = () => ({
  type: REMOVE_USER,
});
