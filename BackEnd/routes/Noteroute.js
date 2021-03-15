const router = require("express").Router();
const {addNote,deleteNote,updateNotes,moveToArchive,moveToTrash}= require('../middleware/validator')
const{validation}= require('../middleware/validate')
const noteController = require('../Controller/NoteController')
const jwtToken = require("../middleware/jwtToken")

router.post('/create',addNote,validation,jwtToken.tokenVerify,noteController.noteCreate);
router.get('/get',jwtToken.tokenVerify,noteController.getNote);
router.put('/update/:id',updateNotes,validation,jwtToken.tokenVerify,noteController.updateNote)
router.delete('/delete/:id',jwtToken.tokenVerify,noteController.deleteNote)
router.put('/moveToArchive',moveToArchive,validation,jwtToken.tokenVerify,noteController.moveToArchive)
router.put('/moveToTrash',moveToTrash,validation,jwtToken.tokenVerify,noteController.moveToTrash)

/**
 * LABEL API
 */
router.put('/addlabel/:noteId',jwtToken.tokenVerify,noteController.addLabelToNotes)
router.put('/removelabel/:noteId',jwtToken.tokenVerify,noteController.removelabelfromnote)

module.exports = router