import Axios from "./axiosServices";

const http = new Axios();

const baseUrl = "http://localhost:8000/user";

export default class services {
    Registration = (data) => {
        return http.Post(`${baseUrl}/registration`, data);
    };
    login = (data) => {
        return http.Post(`${baseUrl}/login`, data);
    }
    forgetPass = (data) => {
        return http.Post(`${baseUrl}/forgetpassword`, data);
    }
    resetPass = (data, token) => {
        return http.Post(`${baseUrl}/resetPassword/${token}`, data, {
            headers: {
                token: token
            }
        });
    }
}