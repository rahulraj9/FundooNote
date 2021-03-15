const labelService = require('../service/LabelService')
let statusCode = require('../middleware/httpStatusCode.json')
const jwtToken = require('../middleware/jwtToken')
let response = {}
const logger = require("../middleware/logger")


class LabelController {
    createLabel = (req, res) => {
     
        const decodedValue = req.decoded._id;
       
        const labelDetails = {
            name: req.body.name,
            userId: decodedValue,
        };
        console.log(labelDetails)
        labelService.createLabel(labelDetails,(err, data)=> {
            if (err || data == null){
                response.success = false;
                response.message = "Could not create a label";
                return res.status(statusCode.BadRequest).send(response);
              }
              else {
                response.success = true;
                response.data = data;
                response.message = "Label created successfully for the note";
                return res.status(statusCode.OK).send(response);
              } 

        })
    }

    createLabelOnNote = (req, res) => {
        
        const decodedValue = req.decoded._id;
        const labelData = {
          noteId: req.body.noteId,
          labelName: req.body.labelName,
          userId: decodedValue,
        }
        console.log(labelData)
        labelService.createLabelOnNote(labelData, (err, result) => {
          if(err) {
            response.success = false;
            response.message = "Could not create a label on the note";
            return res.status(statusCode.BadRequest).send(response);
          }else {
            response.success = true;
            response.data = result;
            response.message = "Label created successfully on the note.";
            return res.status(statusCode.OK).send(response);
          }
        });
      }

      updateLabelOnNote = (req, res) => {
        const labelData = {
          noteId: req.body.noteId,
          labelName: req.body.labelName,
          _id: req.body._id
        }
        console.log(labelData)
        labelService.updateLabelOnNote(labelData, (err, result) => {
          if(err) {
            response.success = false;
            response.message = "Could not update a label on the note";
            return res.status(statusCode.BadRequest).send(response);
          }else {
            response.success = true;
            response.data = result;
            response.message = "Label updated successfully on the note.";
            return res.status(statusCode.OK).send(response);
          }
        });
      }


      deleteLabel = (req, res) => {
        const labelData = {
            labelId: req.body.labelId,
          }
          console.log(labelData)
        labelService.deleteLabel(labelData, (err, data) => {
          if (err || data == null) {
            response.success = false;
            response.message = "Could not delete the label";
            return res.status(statusCode.BadRequest).send(response);
          } else {
            response.success = true;
            response.message = "The label deleted sucessfully";
            return res.status(statusCode.OK).send(response);
          }
        });
      };


      deleteLabelOnNote = (req, res) => {
        const labelData = {
          noteId: req.body.noteId,
          _id: req.body._id,
        }
        labelService.deleteLabelOnNote(labelData, (err, result) => {
          if(err) {
            response.success = false;
            response.message = "Could not delete a label on the note";
            return res.status(statusCode.BadRequest).send(response);
          }else {
            response.success = true;
            response.message = "Label delete successfully on the note.";
            return res.status(statusCode.OK).send(response);
          }
        });
      }

   
}

module.exports = new LabelController();