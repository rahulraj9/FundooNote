const noteModel = require('../model/NoteModel')
const user = require('../model/usermodel')
const redisCache = require('../middleware/redisCache')
let statusCode = require('../middleware/httpStatusCode.json')

class NoteService {

    noteInsert(data, id) {
        data.userId = id;
        return noteModel.createNote(data)
            .then((result) => {
                return ({ success: true, message: "Notes Created Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ success: false, message: "Failed to created record", status: statusCode.BadRequest });
            })
    }

    updateNote(id, newData) {
        return noteModel.updateNote(id, newData)
            .then((result) => {
                return ({ message: "Notes Update Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Notes is Not found", error: error, status: statusCode.NotFound });
            })
    }

    deleteNote(id) {
        return noteModel.deleteNote(id)
            .then((result) => {
                if (result.length == 0) {
                    return ({ message: "No NOte", data: result, status: statusCode.BadRequest });
                }
                return ({ message: "Note Deleted Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Note Record is Not found", error: error, status: statusCode.NotFound });
            })
    }

    getUserAllNotes(id) {
        let userId = { userId: id }
        return noteModel.getUserAllNotes(userId)
            .then((result) => {
                return ({ message: "User All Notes Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Note Record is Not found", error: error, status: statusCode.NotFound });
            })
    }


    archiveNote(id) {
        return noteModel.findOne(id)
            .then((data) => {
                let flag = { isArchive: false }
                if (data.isArchive == false) {
                    flag.isArchive = true;
                }
                return noteModel.updateNote(id, flag)
                    .then((result) => {
                        return ({ message: "Notes Archived Successfully", data: result, status: statusCode.OK });
                    })
                    .catch((error) => {
                        return ({ message: "Notes is Not found", error: error, status: statusCode.NotFound });
                    })
            })
            .catch((error) => {
                return ({ message: "Notes is Not found", error: error, status: statusCode.NotFound });
            })

    }
    trashNote(id) {
        return noteModel.findOne(id)
            .then((data) => {
                let flag = { isTrash: false }
                if (data.isTrash == false) {
                    flag.isTrash = true;
                }
                return noteModel.updateNote(id, flag)
                    .then((result) => {
                        return ({ message: "Notes Trash Successfully", data: result, status: statusCode.OK });
                    })
                    .catch((error) => {
                        return ({ message: "Notes is Not found", error: error, status: statusCode.NotFound });
                    })
            })
            .catch((error) => {
                return ({ message: "Notes is Not found", error: error, status: statusCode.NotFound });
            })
    }



    addLabelToNotes = (noteData, callback) => {
        noteModel.addLabelToSingleNote(noteData, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data) {
                redisCache.loadCache(data.noteId, data)
                return callback(null, data)
            }
        });
    };


    removeLabel = (noteData, callback) => {
        noteModel.removeLabel(noteData, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data) {
                return callback(null, data)
            }
        });
    };


    search(searchKey) {
        return user.search(searchKey)
            .then((result) => {
                if (result.length == 0) {
                    return ({ message: "Search Matching Data Not Found!", error: err, status: statusCode.OK });
                } else {
                    return ({ message: "Successfully Search Matching Data For Collabrator", data: result, status: statusCode.OK });
                }
            }).catch((err) => {
                return ({ message: "Search Matching Data Not Found!", error: err, status: statusCode.NotFound });
            });
    }

    createCollaborator = (collaboratorData, callBack) => {
        noteModel.createCollaborator(collaboratorData, (error, data) => {
            if (error)
                return callBack(error, null);
            return callBack(null, data);
        });
    }


    removeCollaborator = (collaboratorData, callback) => {
        noteModel.removeCollaborator(collaboratorData, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data) {
                return callback(null, data)
            }
        });
    };


}



module.exports = new NoteService();
