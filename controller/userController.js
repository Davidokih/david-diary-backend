const userModel = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await userModel.findOne({ email });

        if (findUser) {
            const passCheck = await bcrypt.compare(password, findUser.password);

            if (passCheck) {
                const token = jwt.sign({
                    _id: findUser._id,
                    userName: findUser.userName,
                    email: findUser.email,
                }, "MYDiary", { expiresIn: "1d" });

                const { password, ...info } = findUser._doc;
                res.status(201).json({
                    status: `Welcome back ${findUser.userName}`,
                    data: { token, ...info }
                });
            } else {
                res.status(400).json({
                    status: "Incorrect password"
                });
            }
        } else {
            res.status(400).json({
                status: 'User does not exits'
            });
        }
    } catch (error) {
        res.status(404).json({
            status: 404,
            message: error.message
        });
        console.log(error);
    }
};
const getAllUser = async (req, res) => {
    try {
        const getUser = await userModel.find();
        res.status(200).json({
            status: 'Success',
            data: getUser
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error
        });
    }
};
const getOneUser = async (req, res) => {
    try {
        const getUser = await userModel.findById(req.params.userid);
        res.status(200).json({
            status: 'Success',
            data: getUser
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error
        });
    }
};

module.exports = {
    getAllUser,
    getOneUser,
    signInUser
};