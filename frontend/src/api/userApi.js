import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const signupUser = (data) => axios.post(`${API}/users/signup`, data);

export const loginUser = (data) => axios.post(`${API}/users/login`, data);
