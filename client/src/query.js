import axios from "axios";
import constants from "./constants";
// axios.defaults.baseURL = process.env.BASE_URL;

export const search = (obj) => {
    const requestUrl = "search";
    return axios.post(requestUrl, obj);
};
