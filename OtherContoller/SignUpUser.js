const express = require('express');
const userModel = require('../Model/UserModel');
const router = express.Router();
const bcrypt = require('bcrypt');
const cloudinary = require('../config/cloudinary');
const upload = require('../config/multer');

router.post("/register", upload, async (req, res) => {
    try {
        const { email, password, userName } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const image = await cloudinary.uploader.upload(req.file.path);

        const createUser = await userModel.create({
            email,
            password: hashed,
            userName,
            avatar: image.secure_url,
            avatarID: image.public_id,
        });

        res.status(201).json({
            message: "member created ",
            data: createUser,
        });
    } catch (err) {
        res.status(400).json({
            message: err
        });
        console.log(err);
    }
});
router.patch('/:userid/update', upload, async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const image = await userModel.findById(req.params.userid);
        await cloudinary.uploader.destroy(req.params.public_id);

        const updaterUser = await userModel.findByIdAndUpdate(req.params.userid, {
            userName,
            email,
            password,
            avatar: image.secure_url,
            avatarID: image.public_id
        }, { new: true });

        res.status(201).json({
            status: 201,
            data: updaterUser
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        });
    }
});
router.delete('/:userid/delete', upload, async (req, res) => {
    try {
        const image = await userModel.findById(req.params.userid);
        await cloudinary.uploader.destroy(req.params.public_id);

        const updaterUser = await userModel.findByIdAndDelete(req.params.userid);

        res.status(200).json({
            status: 200,
            data: updaterUser
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        });
    }
});


module.exports = router;