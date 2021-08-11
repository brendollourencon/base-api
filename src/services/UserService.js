import axios from 'axios';
const urlBackend = process.env.REACT_APP_HOST;

export const userLogin = async (user) => {
    const result = await axios.post(`${urlBackend}/user/login`, user);
    if(result.status === 200){
        return result.data;
    }
    return false;
}

export const createUser = () => {

}