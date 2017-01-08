import axios from 'axios';


export default function setAuthorizationToken(token) {
  if (token) {
    // We want to add the token to every request's header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
