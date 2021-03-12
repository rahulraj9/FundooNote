const labelModel = require('../model/LabelModel')
const noteModel = require('../model/NoteModel')
const user = require('../model/usermodel')
let statusCode = require('../middleware/httpStatusCode.json')
const { callbackPromise } = require('nodemailer/lib/shared')

class LabelService {

    labelInsert(data, id) {
        data.userId = id;
       
        return labelModel.createLabel(data)
            .then((result) => {
                return ({ success: true, message: "Label Created Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ success: false, message: "Failed to created Label", status: statusCode.BadRequest });
            })
    }

}
module.exports = new LabelService()