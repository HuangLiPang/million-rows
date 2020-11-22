import axios from "axios";
import constants from "./constants";
axios.defaults.baseURL = constants.apiUrl;

export const search = (obj) => {
    const requestUrl = "search";
    return axios.post(requestUrl, obj);
};
