const mongoose = require('mongoose')
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
        default:"white"
    }

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
                return ({ message: "Something Went Wrong Please Check", error: error });
            });
    }    
    getNote() {
        return userNoteModel.find({})
            .then((result) => {

                return result;
            })
            .catch((error) => {
                return ({ message: "Something Went Wrong Please Check", error: error });
            })
    }

}

module.exports = new NoteModel();

