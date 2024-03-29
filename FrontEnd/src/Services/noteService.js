import Axios from "./axiosServices";

const http = new Axios();
const token = localStorage.getItem("fundooUsertoken")

const baseUrl = "https://fundoonote.onrender.com/note";

export default class services {
    addNote = (data) => {
        return http.Post(`${baseUrl}`, data, {
            headers: {
                token: token
            }
        })
    }

    getNote = () => {
        return http.Get(`${baseUrl}`, {
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

    archive = (noteId, data) => {
        return http.Put(`${baseUrl}/moveToArchive/${noteId}`, data, {
            headers: {
                token: token
            }
        })
    }
    trash = (noteId, data) => {
        return http.Put(`${baseUrl}/moveToTrash/${noteId}`, data, {
            headers: {
                token: token
            }
        })
    }

}