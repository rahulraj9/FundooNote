import Axios from "./axiosServices";

const http = new Axios();
const token = localStorage.getItem("fundooUsertoken")

const baseUrl = "http://localhost:8000/note";

export default class services {
    addNote = (data) => {
        return http.Post(`${baseUrl}`, data, {
            headers: {
                token: token
            }
        })
    }

    getNote = () => {
        return http.Get(`${baseUrl}/get`, {
            headers: {
                token: token
            }
        })
    }
    update = (data, noteId) => {
        console.log("NoteId ::", noteId)
        console.log(token)
        return http.Put(`${baseUrl}/${noteId}`, data, {
            headers: {
                token: token
            }
        })
    }
    del = (noteId) => {
        console.log("NoteId ::", noteId)
        console.log(token)
        return http.Del(`${baseUrl}/${noteId}`, {
            headers: {
                token: token
            }
        })
    }

}