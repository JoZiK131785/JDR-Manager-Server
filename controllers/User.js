const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = (req, res) => {
    bcrypt
    // hash the password
    .hash(req.body.password, 10)
    // if password was hashed successfully
    .then((hashedPassword) => {
        // create a new user
        const user = new User({
        email: req.body.email,
        password: hashedPassword,
        });

        // save the user
        user
        .save()
        // if user was saved successfully
        .then((result) => {
            res.status(201).send({
            message: "User Created Successfully",
            result,
            });
        })
        // catch error if user was not saved successfully
        .catch((error) => {
            res.status(500).send({
            message: "Error creating user",
            error,
            });
        });
    })
    // catch error if password was not hashed successfully
    .catch((e) => {
        res.status(500).send({
        message: "Password was not hashed successfully",
        e,
        });
    });
};

const loginUser = (req, res) => {
    // check if email exists
    User.findOne({ email: req.body.email })
    
    // if email exists
    .then((user) => {
        // compare the password entered and the hashed password found
        bcrypt
        .compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

            // check if password matches
            if(!passwordCheck) {
            return res.status(400).send({
                message: "Passwords does not match",
                error,
            });
            }

            //   create JWT token
            const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
            );

            //   return success response
            res.status(200).send({
            message: "Login Successful",
            email: user.email,
            id: user._id,
            token,
            });
        })
        // catch error if password does not match
        .catch((error) => {
            res.status(400).send({
            message: "Passwords does not match",
            error,
            });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
        res.status(404).send({
        message: "Email not found",
        e,
        });
    });
};

module.exports = {
    registerUser,
    loginUser,
};