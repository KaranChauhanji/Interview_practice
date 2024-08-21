require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../../model/user.model");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        res
          .status(400)
          .send({ message: `Error in Comparing password ${err.message}` });
      }

      if (result) {
        const token = jwt.sign(
          { username: user.username, email: user.email, userId: user._id },
          process.env.JWT_SECRET
        );

        res.status(200).send({ message: "Login Successful.", token: token });
      }
    });
  } catch (error) {
    res.status(500).send({ message: `Error in login: ${error.message}` });
  }
};

module.exports = login