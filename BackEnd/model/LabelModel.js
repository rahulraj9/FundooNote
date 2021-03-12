const mongoose = require('mongoose')
const Schema = mongoose.Schema
const labelSchema = new Schema({
    
    labelName:{
        type:String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    noteId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Note'
    }
})
const NotelabelModel = mongoose.model('label',labelSchema)

class LabelModel{
 
    createLabel(data) {
        console.log("LabelDetails", data)
        let labelData = new NotelabelModel(data)

        return labelData.save(data)
            .then((result) => {
                return result;
            }).catch((error) => {
                return error;
            });
    }


}
module.exports = new LabelModel();
