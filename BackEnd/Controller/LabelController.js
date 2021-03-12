const labelService = require('../service/LabelService')
let statusCode = require('../middleware/httpStatusCode.json')
let response = {}

class LabelController {
  
    createLable(req, res) {
        try {
            let id = req.decoded._id;
            let obj ={
                labelName:req.body.labelName,
                NoteId:req.body.NoteId
            }
            labelService.labelInsert(obj, id)
                .then((result) => {
                    response.data = result.data;
                    response.flag = true;
                    response.message = result.message;
                    res.status(result.status).send(response);
                }).catch((err) => {
                    response.flag = false;
                    response.data = err.message;
                    res.status(result.status).send(response);
                });
        } catch (error) {
            console.log(error);
        }

    }
}
module.exports = new LabelController();