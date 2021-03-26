import Axios from "./axiosServices";

const http = new Axios();

const baseUrl = "http://localhost:8000/user";

export default class services {
    Registration = (data) => {
        console.log("\n\n Userservices for registration --->", data)
        return http.Post(`${baseUrl}/registration`, data);
    };
}