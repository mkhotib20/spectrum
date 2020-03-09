import axios from 'axios'
const api_url = process.env.BACKEND_URL

var header = {
    authorization: "Bearer 76d8ascxh8edwb"
}
let newAx = axios.create({
    baseURL: `${api_url}api/`,
    timeout: 15000,
    // headers: header
});

export default newAx