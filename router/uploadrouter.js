const express = require('express');
const router = express.Router();
const { image } = require('../config/multer');
const {
    uploadCon,
    getAllPost,
    getOnePost,
    updatePost,
    deletePost
} = require('../controller/postController');

router.route('/:userid').post(image, uploadCon);
router.route('/:userid/upload').get(getAllPost);
router.route('/:userid/upload/:uploadid')
    .get(getOnePost)
    .patch(image, updatePost)
    .delete(deletePost);

module.exports = router;