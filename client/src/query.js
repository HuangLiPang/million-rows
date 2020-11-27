import axios from "axios";

export const search = (obj) => {
    const requestUrl = "search";
    return axios.post(requestUrl, obj);
};
