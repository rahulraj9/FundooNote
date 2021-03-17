const mongoose = require('mongoose')
const labelmodel = require("../model/LabelModel")
const usermodel = require("../model/usermodel")
const async = require('async-waterfall')
const Schema = mongoose.Schema
const noteSchema = new Schema({

    notetitle: {
        type: String
    },
    notedata: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    color: {
        type: String,
        default: "#FFFFFF"
    },
    isTrash: {
        type: Boolean,
        default: false
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    labelId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "label",
    },],

    collaborator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
})

const userNoteModel = mongoose.model('Note', noteSchema)

class NoteModel {

    createNote(data) {
        console.log("NoteDetails", data)
        let noteData = new userNoteModel(data)
        return noteData.save(data)
            .then((result) => {
                return result;
            }).catch((error) => {
                return error;
            });
    }



    updateNote(id, newData) {
        return userNoteModel.findByIdAndUpdate(id, newData)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    deleteNote(id) {
        return userNoteModel.findByIdAndRemove(id)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    getUserAllNotes(id) {
        return userNoteModel.find({ userId: id }).populate('userId')
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })

    }

    moveToArchive = (obj, callback) => {

        userNoteModel.findById(obj.moveToArchiveNote_ID, function (err, data) {
            if (err) {
                callback({ 'message': "Note on that ID not found", 'success': false })
            } else if (data) {
                if (data.isArchive == true || data.isArchive == false) {
                    let updatedObj = {
                        isArchive: !data.isArchive
                    }
                    userNoteModel.findByIdAndUpdate(obj.moveToArchiveNote_ID, updatedObj, (err, success) => {
                        if (err) {
                            callback({ 'message': "Error failed to move to the Archived", 'success': false })
                        } else if (success) {
                            callback({ 'message': "Successfull in moving to the Archived", 'success': true })
                        }
                    })
                }
            }
        })
    }

    moveToTrash = (obj, callback) => {
        userNoteModel.findById(obj.moveToTrashNote_ID, function (err, data) {
            if (err) {
                callback({ 'message': "Note on that ID not found", 'success': false })
            } else if (data) {
                if (data.isTrash == true || data.isTrash == false) {
                    let updatedObj = {
                        isTrash: !data.isTrash
                    }
                    userNoteModel.findByIdAndUpdate(obj.moveToTrashNote_ID, updatedObj, (err, success) => {
                        if (err) {
                            callback({ 'message': "Error failed to move to the trash", 'success': false })
                        } else if (success) {
                            callback({ 'message': "Successfull in moving to the trash", 'success': true })
                        }
                    })
                }

            }
        })
    }

    addLabelToSingleNote = (noteInfo, callback) => {
        console.log(noteInfo)
        userNoteModel.findById(noteInfo.noteID, (error, noteData) => {
            if (error) callback(error, null);
            else {
                return userNoteModel.findByIdAndUpdate(
                    noteInfo.noteID, {
                    $push: {
                        labelId: noteInfo.labelId,
                    },
                }, { new: true },
                    callback
                );
            }
            callback(error, null);
        });
    };

    removeLabel = (noteInfo, callback) => {
        return userNoteModel.findByIdAndUpdate(
            noteInfo.noteID, {
            $pull: { labelId: noteInfo.labelId },
        }, { new: true },
            callback
        );
    };

    createCollaborator = (collaboratorData, callBack) => {
        let id = collaboratorData.userId;
        console.log("inside model" + id)
        return userNoteModel.find({ collaborator: id }, (error, data) => {
            if (error) {
                callBack(error, null)
            }
            else {
                console.log("user Found with user id" + id)
                userNoteModel.findById(collaboratorData.noteId, (error, data) => {
                    if (error) {
                        callBack(error, null)
                    }
                    else {
                        console.log("noteid found with NoteId" + collaboratorData.noteId)
                        userNoteModel.findByIdAndUpdate(collaboratorData.noteId,
                            { $push: { collaborator: id } }, { new: true }, (error, data) => {
                                if (error) {
                                    callBack(error, null)
                                }
                                else {
                                    console.log("collaborator Added")
                                    callBack(null, data)
                                }
                            })
                    }
                })
            }
        })
    }

    removeCollaborator = (collaboratorData, callback) => {
        let id = collaboratorData.userId;
        console.log(id)
        return userNoteModel.findByIdAndUpdate(
            collaboratorData.noteId, {
            $pull: { collaborator: id },
        }, { new: true },(error,data)=>{
            if(error){
                callback(error)
            }
            else{
                callback(null,data)
            }
        }
        )
    };



}

module.exports = new NoteModel();
