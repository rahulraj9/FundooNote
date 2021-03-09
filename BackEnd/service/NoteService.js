const noteModel = require('../model/NoteModel')
let statusCode = require('../middleware/httpStatusCode.json')

class NoteService {

    noteInsert(data, id) {
         data.userId = id;
        return noteModel.createNote(data)
            .then((result) => {
                return ({ success: true, message: "Notes Created Successfully", data: result, status: statusCode.OK });
            })
            .catch((error) => {
                return ({ success: false, message: "Failed to created record", status: statusCode.BadRequest });
            })
    }


    getNoteService() {
        return noteModel.getNote()
            .then((result) => {

                return ({ message: "Note", data: result });
            })
            .catch((error) => {
                return ({ message: " No Notes ", error: error });
            })
    }

}



module.exports = new NoteService();
