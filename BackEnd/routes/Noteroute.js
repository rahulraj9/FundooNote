const router = require("express").Router();
const { addNote, deleteNote, updateNotes, moveToArchive, moveToTrash,label } = require('../middleware/validator')
const { validation } = require('../middleware/validate')
const noteController = require('../Controller/NoteController')
const jwtToken = require("../middleware/jwtToken")

router.post('/create', addNote, validation, jwtToken.tokenVerify, noteController.noteCreate);
router.get('/get', jwtToken.tokenVerify, noteController.getNote);
router.put('/update/:id', updateNotes, validation, jwtToken.tokenVerify, noteController.updateNote)
router.delete('/delete/:id', jwtToken.tokenVerify, noteController.deleteNote)
router.put('/moveToArchive', moveToArchive, validation, jwtToken.tokenVerify, noteController.moveToArchive)
router.put('/moveToTrash', moveToTrash, validation, jwtToken.tokenVerify, noteController.moveToTrash)

/**
 * LABEL API
 */
router.put('/addlabel/:noteId',label,validation, jwtToken.tokenVerify, noteController.addLabelToNotes)
router.put('/removelabel/:noteId',label,validation, jwtToken.tokenVerify, noteController.removelabelfromnote)



/**
 * Collaborator
 */

router.put('/createCollaborator', jwtToken.tokenVerify, noteController.createCollaborator)
router.put('/removeCollaborator', jwtToken.tokenVerify, noteController.removeCollaborator)

module.exports = router