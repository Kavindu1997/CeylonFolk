import axios from 'axios';

export default axios.create({
    baseURL:"http://localhost:3001",
});
// const url='http://localhost:5000/index';

//const fetchIndex= () =>axios.get(url);