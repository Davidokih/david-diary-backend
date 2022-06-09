const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {
    uploadCon,
    getAllPost,
    getOnePost,
    updatePost,
    deletePost
} = require('../controller/postController');

router.route('/:userid').post(upload, uploadCon);
router.route('/:userid/upload').get(getAllPost);
router.route('/:userid/upload/:uploadid')
    .get(getOnePost)
    .patch(upload, updatePost)
    .delete(deletePost);

module.exports = router;