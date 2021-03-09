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

    getNote(req, res) {
        try {
            noteService.getNoteService()
                .then((result) => {
                    response.data = result.data;
                    response.success = true;
                    response.message = result.message;
                    res.status(statusCode.OK).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.data = err.message;
                    res.status(statusCode.BadRequest).send(response);
                });
        } catch (error) {
            console.log(error);

        }
    }
}
module.exports = new NoteController();
