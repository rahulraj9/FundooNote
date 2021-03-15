const mongoose = require('mongoose')
const Schema = mongoose.Schema
const note = require('../model/NoteModel')
const labelSchema = new Schema({

    labelName: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }
})
const Label = mongoose.model('label', labelSchema)

class LabelModel {

    create = (data, callback) => {
        const labelData = new Label({
            labelName: data.labelName,
            userId: data.userId,
            noteId: data.noteId
        });
        console.log("model" +labelData)
        return labelData.save(callback);
    };
 

    updateLabelName = (data, callback) => {
        return Label.findByIdAndUpdate(data._id, data, { new: true }, callback);
    };

     
    delete = (data, callback) => {
        Label.findByIdAndDelete(data.labelId, (err, data) => {
          if (err || data == null) {
            return callback(err, null);
          } else {
            return callback(null, data);
          }
        });
      };
   


}
module.exports = new LabelModel();
