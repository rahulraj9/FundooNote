const router = require("express").Router();
const { addNote, deleteNote, updateNotes, moveToArchive, moveToTrash,label } = require('../middleware/validator')
const { validation } = require('../middleware/validate')
const noteController = require('../Controller/NoteController')
const jwtToken = require("../middleware/jwtToken")
const redisCache = require('../middleware/redisCache')

router.post('/note', addNote, validation, jwtToken.tokenVerify, noteController.noteCreate);
router.get('/note', jwtToken.tokenVerify,redisCache.checkCache, noteController.getNote);
router.put('/note/:id', jwtToken.tokenVerify, noteController.updateNote)
router.delete('/note/:id', jwtToken.tokenVerify, noteController.deleteNote)


router.put('/moveToArchive/:id', jwtToken.tokenVerify, noteController.archiveNote)
router.put('/moveToTrash/:id', jwtToken.tokenVerify, noteController.trashNote)

/**
 * LABEL API
 */
router.put('/addlabel/:noteId',label,validation, jwtToken.tokenVerify, noteController.addLabelToNotes)
router.put('/removelabel/:noteId',label,validation, jwtToken.tokenVerify, noteController.removelabelfromnote)



/**
 * Collaborator
 */

router.get('/note/search',jwtToken.tokenVerify,noteController.search)

router.put('/createCollaborator', jwtToken.tokenVerify, noteController.createCollaborator)
router.put('/removeCollaborator', jwtToken.tokenVerify, noteController.removeCollaborator)

module.exports = router