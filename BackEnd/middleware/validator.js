const { buildCheckFunction, body, param } = require("express-validator")
const check = buildCheckFunction(["headers", "params"])

// const validator = require("express-validator")

module.exports = {
    registration: [
        body("firstName")
            .trim()
            .isString()
            .notEmpty().withMessage("FirstName is Required!")
            .isAlpha().withMessage("FirstName should be only Alphabet!")
            .isLength({ min: 3 }).withMessage("FirstName atleast contains  3 character!"),
        body("lastName")
            .trim()
            .isString()
            .notEmpty().withMessage("LastName is Required!")
            .isAlpha().withMessage("LastName should be only Alphabet!")
            .isLength({ min: 3 }).withMessage("LastName atleast contains  3 character!"),
        body("email")
            .trim()
            .notEmpty().withMessage("Email is Required!")
            .isEmail().withMessage("Email is Invalid!!!"),
        body("password")
            .trim()
            .notEmpty().withMessage("Password is Required!")
            .isLength({ min: 6 }).withMessage("Password atleast contains  6 character!")
            .isLength({ max: 11 }).withMessage("Password atleast contains  6 character!")
            // .isAlphanumeric().withMessage("Password Should be AlphaNumeric")
            .isString()


    ],
    login:[
        body("email")
        .trim()
        .notEmpty().withMessage("Email is Required!")
        .isEmail().withMessage("Email is Invalid!!!"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is Required!")
        .isLength({ min: 6 }).withMessage("Password atleast contains  6 character!")
        // .isAlphanumeric().withMessage("Password Should be AlphaNumeric")
        .isString()

    ],
    forget:[
        body("email")
        .trim()
        .notEmpty().withMessage("Email is Required!")
        .isEmail().withMessage("Email is Invalid!!!"),
    ],
    resetPassword:[
        body("password")
        .trim()
        .notEmpty().withMessage("Password is Required!")
        .isLength({ min: 6 }).withMessage("Password atleast contains  6 character!")
        // .isAlphanumeric().withMessage("Password Should be AlphaNumeric")
        .isString()
    ],
    addNote: [
        body('notetitle')
            .trim()
            .not()
            .isEmpty()
            .withMessage('title required'),
        body('notedata')
            .trim()
            .not()
            .isEmpty()
            .withMessage('description required')
    ],
    updateNotes: [
        body('notetitle')
            .trim()
            .not()
            .isEmpty()
            .withMessage('title should not be empty'),
        body('notedata')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Note Data or description should not be empty')
    ],

    moveToTrash: [
        body('moveToTrashNote_ID')
            .trim()
            .not()
            .isEmpty()
            .withMessage('moveToTrashNote_ID should not be empty')
    ],

    moveToArchive: [
        body('moveToArchiveNote_ID')
            .trim()
            .not()
            .isEmpty()
            .withMessage('moveToArchiveNote_ID should not be empty')
    ],

    label:[
        body('labelId')
        .trim()
        .notEmpty().withMessage("labelId is Required!")
    ]

    
}