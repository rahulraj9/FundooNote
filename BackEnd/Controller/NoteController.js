const noteService = require('../service/NoteService')
let statusCode = require('../middleware/httpStatusCode.json')
let response = {}
class NoteController {


    noteCreate(req, res) {
        try {
            let id = req.decoded._id;
            noteService.noteInsert(req.body, id)
                .then((result) => {
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(result.status).send(response);
                });
        } catch (error) {
            console.log(error);
        }

    }

    updateNote(req, res) {

        try {
            let newData = req.body;
            let id = req.params.id;
            console.log("update id and data", id, newData);
            noteService.updateNote(id, newData)
                .then((result) => {
                    response.flag = true;
                    // response.data = result.data;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });

        } catch (error) {
            console.error("Record is Not found Please Enter Correct One");
        }
    }

    deleteNote(req, res, next) {
        try {
            let id = req.params.id;
            noteService.deleteNote(id)
                .then((result) => {
                    response.flag = true;
                    response.data = result.data;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });
        } catch (error) {
            next(error)
        }
    }
    getNote(req, res) {
        try {
            let id = req.decoded._id;
            noteService.getUserAllNotes(id)
                .then((result) => {
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(result.status).send(response);
                });
        } catch (error) {
            console.error("Employee Record is Not found Please Enter Correct One");
        }
    }

    moveToArchive(req, res) {
        let obj = {
            moveToArchiveNote_ID: req.body.moveToArchiveNote_ID
        }
        console.log(obj);
        noteService.moveToArchive(obj, (data, err) => {
            if (data) {
                response.success = data.success;
                response.message = data.message;
                return res.status(statusCode.OK).send(response);
            } else if (err) {

                response.success = err.success;
                response.message = err.message;
                return res.status(statusCode.BadRequest).send(response);
            }
        })
    }

    moveToTrash(req, res, next) {
        let obj = {
            moveToTrashNote_ID: req.body.moveToTrashNote_ID
        }
        noteService.moveToTrash(obj, (err, data) => {
            if (data) {
                response.success = data.success;
                response.message = data.message;
                return res.status(statusCode.OK).send(response);
            } else if (err) {
                response.success = err.success;
                response.message = err.message;
                return res.status(statusCode.BadRequest).send(response);
            }
        })
    }
}

module.exports = new NoteController();
