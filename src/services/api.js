import axios from "axios";

const api = axios.create({
    baseURL: "https://hamburgueria-json.herokuapp.com/"
});

export default api;