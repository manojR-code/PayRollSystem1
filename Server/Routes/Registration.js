const Express = require('express');
const Router = Express.Router();
const User = require('../Model/UserModel');
const { Encryption } = require("../Encryption/Encryption");
Router.post("/CreateUser", async (req, res) => {
    try {
        const { Name, Email, PassWord, Pno, Address, BaseSalary, Role } = req.body;
        const HashPassword = await Encryption(PassWord);
        const Userss = await User.create({
            Name,
            Email,
            PassWord: HashPassword,
            Pno,
            Address,
            BaseSalary,
            Role,
            Status:"hold"
        });
        res.status(200).json({ message: "Success", users: Userss });
    } catch (error) {
        res.status(500).json({ message: "Error Accured on Server", error });
    }
});
module.exports = Router;