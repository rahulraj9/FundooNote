const labelService = require('../service/LabelService')
let statusCode = require('../middleware/httpStatusCode.json')
const jwtToken = require('../middleware/jwtToken')
let response = {}
const logger = require("../middleware/logger")


class LabelController {
  createLabel = (req, res) => {

    const decodedValue = req.decoded._id;

    const labelDetails = {
      labelName: req.body.labelName,
      userId: decodedValue,
    };
    console.log(labelDetails)
    labelService.createLabel(labelDetails, (err, data) => {
      if (err || data == null) {
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

  deleteLabel = (req, res) => {
    labelService.deleteLabel(req.params.id, (err, data) => {
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


  updateLabel = (req, res) => {
    const contentToUpdate = {
      fields: req.body,
      id: req.params.id
    };
    labelService.updateLabel(contentToUpdate, (err, data) => {
      if (err) {
        response.success = false;
        response.message = "Could not update the label";
        return res.status(statusCode.BadRequest).send(response);
      } else {
        response.success = true;
        response.data = data;
        response.message = "The label updated sucessfully";
        return res.status(statusCode.OK).send(response);
      }
    });
  }

  getUserLabels = (req, res) => {
    labelService.getAllLabels((err, result) => {
      if (err) {
        response.success = false;
        response.message = "Could not find labels";
        return res.status(422).send(response);
      } else {
        response.success = true;
        response.data = result;
        response.message = "Labels found successfully";
        return res.status(200).send(response);
      }
    })
  }
}

module.exports = new LabelController();