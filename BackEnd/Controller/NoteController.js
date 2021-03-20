const noteService = require('../service/NoteService')
let statusCode = require('../middleware/httpStatusCode.json')
const redisCache = require('../middleware/redisCache')
let response = {}
class NoteController {


    noteCreate(req, res) {
        try {
            let id = req.decoded._id;
            noteService.noteInsert(req.body, id)
                .then((result) => {
                    redisCache.loadCache(id, result.data)
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
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
                    redisCache.loadCache(id, result.newdata)
                    response.data = newData
                    response.flag = true;
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
            console.log(id)
            noteService.deleteNote(id)
                .then((result) => {
                    redisCache.deleteCache(id)
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
    getNote(req, res, next) {
        try {
            let id = req.decoded._id;
            noteService.getUserAllNotes(id)
                .then((result) => {
                    redisCache.loadCache(id, result.data)
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });
        } catch (error) {
            next(error);
        }
    }

    archiveNote(req, res, next) {
        try {
            let userid = req.decoded.id;
            let id = req.params.id;
            noteService.archiveNote(id)
                .then((result) => {
                    redisCache.deleteCache(userid)
                    response.flag = true;
                    response.data = result.data;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });

        } catch (error) {
            next(error)
        }
    }
    trashNote(req, res, next) {
        try {
            let userid = req.decoded.id;
            let id = req.params.id;
            noteService.trashNote(id)
                .then((result) => {
                    redisCache.deleteCache(userid)
                    response.flag = true;
                    response.data = result.data;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.success = false;
                    response.data = err.message;
                    res.status(err.status).send(response);
                });

        } catch (error) {
            next(error)
        }
    }

    addLabelToNotes(req, res, next) {
        const noteInfoWithLabelId = {
            noteID: req.params.noteId,
            labelId: req.body.labelId,
        };

        noteService.addLabelToNotes(noteInfoWithLabelId, (err, result) => {
            if (err) {
                response.success = false;
                response.message = "Could not create a label on the note";
                return res.status(statusCode.BadRequest).send(response);
            } else {
                response.success = true;
                response.data = result;
                response.message = "Label created successfully on the note.";
                return res.status(statusCode.OK).send(response);
            }
        });
    }

    removelabelfromnote(req, res) {
        const noteInfoWithLabelId = {
            noteID: req.params.noteId,
            labelId: req.body.labelId,
        };
        console.log(noteInfoWithLabelId)
        noteService.removeLabel(noteInfoWithLabelId, (err, result) => {
            if (err) {
                response.success = false;
                response.message = "Could not create a label on the note";
                return res.status(statusCode.BadRequest).send(response);
            } else {
                response.success = true;
                response.data = result;
                response.message = "Label created successfully on the note.";
                return res.status(statusCode.OK).send(response);
            }
        })
    }

    search(req, res) {
        let searchKey = req.body.searchKey;
        console.log(searchKey)
        noteService.search(searchKey)
            .then((result) => {
                response.data = result.data;
                response.flag = true;
                response.message = result.message;
                res.status(result.status).send(response);
            }).catch((err) => {
                response.flag = false;
                response.data = err.message;
                res.status(err.status).send(response);
            });
    }

    createCollaborator = (req, res, next) => {
        try {
            const collaboratorData = {
                noteId: req.body.noteId,
                userId: req.body.userId,
                noteCreatorId: req.decoded._id
            };

            noteService.createCollaborator(collaboratorData, (error, data) => {
                if (error) {
                    response.success = false;
                    response.message = "Could not find id";
                    return res.status(statusCode.BadRequest).send(response);
                }
                else {
                    response.success = true;
                    response.data = data;
                    response.message = "id found And collaborator Added";
                    return res.status(statusCode.OK).send(response);
                }
            });
        }
        catch (error) {
            next(error);
        }
    }

    removeCollaborator(req, res) {
        const collaboratorData = {
            noteId: req.body.noteId,
            userId: req.body.userId,
            noteCreatorId: req.decoded._id
        };
        console.log(collaboratorData)
        noteService.removeCollaborator(collaboratorData, (err, result) => {
            if (err) {
                response.success = false;
                response.message = "Some error occured";
                return res.status(statusCode.BadRequest).send(response);
            } else {
                response.success = true;
                response.data = result;
                response.message = "collaborator Remove";
                return res.status(statusCode.OK).send(response);
            }
        })
    }
}

module.exports = new NoteController();
