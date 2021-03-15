const noteModel = require('../model/NoteModel')
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
                return ({ message: "Note Deleted Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Note Record is Not found", error: error, status: statusCode.NotFound });
            })
    }

    getUserAllNotes(id) {
        return noteModel.getUserAllNotes(id)
            .then((result) => {
                return ({ message: "User All Notes Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ message: "Note Record is Not found", error: error, status: statusCode.NotFound });
            })
    }


    moveToArchive(obj, callback) {

        noteModel.moveToArchive(obj, (err, data) => {
            if (err) {
                return callback(err)
            } else if (data) {
                return callback(null, data)
            }
        })
    }

    moveToTrash = (obj, callback) => {
        noteModel.moveToTrash(obj, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data) {
                return callback(null, data)
            }
        })
    }




    addLabelToNotes = (noteData, callback) => {
        noteModel.addLabelToSingleNote(noteData, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data) {
                return callback(null, data)
            }
        });
    };


    removeLabel =  (noteData, callback) => {
        noteModel.removeLabel(noteData, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data) {
                return callback(null, data)
            }
        });
    };


}



module.exports = new NoteService();
