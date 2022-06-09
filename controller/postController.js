const userModel = require('../Model/UserModel');
// const { image } = require('../config/multer');
const postModel = require('../Model/PostModel');
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');

const uploadCon = async (req, res) => {
    try {
        const { title, content } = req.body;

        const getUser = await userModel.findById(req.params.userid);
        const createItems = new postModel({
            title,
            content,
            image: req.file.path
        });

        createItems.user = getUser;
        createItems.save();

        getUser.item.push(mongoose.Types.ObjectId(createItems._id));
        getUser.save();

        res.status(201).json({
            message: "items has been created",
            data: createItems,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        });
        console.log(error);
    }
};

const getAllPost = async (req, res) => {
    try {
        const getPost = await postModel.find();

        res.status(200).json({
            status: "Success",
            data: getPost
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        });
    }
};

const getOnePost = async (req, res) => {
    try {
        const getPost = await postModel.findById(req.params.uploadid);

        res.status(200).json({
            status: "Success",
            data: getPost
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        });
    }
};
const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const myImage = await userModel.findById(req.params.userid);
        await cloudinary.uploader.destroy(req.params.public_id);

        const update = await userModel.findByIdAndUpdate(req.params.userid, {
            title,
            content,
            image: myImage.secure_url,
            image: myImage.public_id
        }, { new: true });

        res.status(200).json({
            status: "Success",
            data: update
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        });
        console.log(error);
    }
};
const deletePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        // const myImage = await cloudinary.uploader.upload(req.file.path)
        const getPost = await postModel.findByIdAndDelete(req.params.uploadid);

        res.status(200).json({
            status: "Success",
            data: getPost
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        });
    }
};

module.exports = {
    uploadCon,
    getAllPost,
    getOnePost,
    updatePost,
    deletePost
};