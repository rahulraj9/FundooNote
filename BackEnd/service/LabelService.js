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

    updateLabel = (data, callback) => {
        Label.update(data, (err, result) => {
          if(err){
            return callback(err, null);
          }else {
            return callback(null,result);
          }
        });
      };

      getAllLabels = (callback) => {
        Label.read( (err, result) => {
          if(err){
            return callback(err, null);
          }else {
            return callback(null,result);
          }
        });
      }
  
}
module.exports = new LabelService()