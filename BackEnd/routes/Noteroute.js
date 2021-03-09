const router = require("express").Router();
const noteController = require('../Controller/NoteController')
const jwtToken = require("../middleware/jwtToken")

router.post('/create',jwtToken.tokenVerify,noteController.noteCreate);
router.get('/get/:token',jwtToken.tokenVerify,noteController.getNote);

module.exports = router