const Label = require('../model/LabelModel')
const note = require('../model/NoteModel')
let statusCode = require('../middleware/httpStatusCode.json')


class LabelService {


    /**
     * 
     * Creating New Label
     *  
     *  
     */
    createLabel = (data, callback) => {
        Label.create(data, (err, result) => {
            if (err || result == null) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    };

    deleteLabel = (data, callback) => {
        Label.delete(data, (err, result) => {
            if (err || result == null) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        });
    };





    /**
     * 
     * Adding Label On Note
     * 
     */


    createLabelOnNote = (data, callback) => {
        Label.create(data, (err, result) => {
            if (err || result == null) {
                return callback(err, null);
            } else {
                return note.addLabelToNote(result, callback);
            }
        });
    }


    updateLabelOnNote = (data, callback) => {
        Label.updateLabelName(data, (err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                note.updateLabelToNote(result, callback);
            }
        });
    }

    deleteLabelOnNote = (data, callback) => {
        note.deleteLabelToNote(data, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            else{
                return callback(null,data)
            }
        })
    }



}
module.exports = new LabelService()