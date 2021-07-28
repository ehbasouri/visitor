import axios from "axios";
import _ from "lodash";

export const HOST = 
"https://api.ehsan2.ir/";
// "http://localhost:5600/"
export const BASE_URL = HOST + "api/";


axios.defaults.headers["Content-Type"] = "application/json";
var TOKEN = null;

export async function refreshToken(newToken) {
    if(newToken){
        TOKEN = newToken;
    } else {
        const token = localStorage.getItem("token");
        if (token) {
            TOKEN = token;
        }
    }
}

export function clearToken(params) {
    TOKEN = null;
}

refreshToken()

function getHeaders(secured) {
    const headers = {
    }
    if (secured && TOKEN) {
        headers["Authorization"] = "Bearer " + TOKEN;
    } 
    return headers;
}

export async function request(method, url, data, params = {}, secured = true, headerOptions = {}) {
    const headers = getHeaders(secured);
    const options = {
        method: _.toLower(method),
        url: BASE_URL + url,
        params,
        headers: {...headers, ...headerOptions},
        data,
    };
    // console.log(options.method + " - " + options.url )
    return(Promise.resolve(axios(options)));
}

function get(url, params = {}, secured, headerOptions) {
    return request("get", url, undefined, params, secured, headerOptions);
}

function post(url, data, params = {}, secured, headerOptions) {
    return request("post", url, data, params, secured, headerOptions);
}

function patch(url, data, params = {}, secured, headerOptions) {
    return request("patch", url, data, params, secured, headerOptions);
}

function put(url, data, params = {}, secured, headerOptions) {
    return request("put", url, data, params, secured, headerOptions);
}

function del(url, params = {}, secured, headerOptions) {
    return request("delete", url, undefined, params, secured, headerOptions);
}

async function multipartPost(file) {
    const data = new FormData();
    data.append("file", file, file.name);
    const headers = getHeaders();
    headers["Content-Type"] = "multipart/form-data" 
    // boundary=${data._boundary}`;
    const options = {
        url: HOST + "file",
        method: "post",
        headers,
        data
    };
    return axios(options);
}

export const API = {
    get,
    post,
    patch,
    put,
    del,
    request,
    getHeaders,
    multipartPost,
};
