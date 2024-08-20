const UserModel = require("../../model/user.model");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await UserModel.find(email);
  if (existingUser) {
    res.status(400).send({ message: "User already access" });
  }
  try {
    bcrypt.hash(password, 2, async (err, hash) => {
      if (err) {
        res
          .status(400)
          .send({ message: `Error in hashing password: ${err.message}` });
      }

      const newUser = new UserModel({ username, email, password: hash });
      await newUser.save();
      res.status(200).send({message:`${username} welcome you are Registered.`})
    });
  } catch (error) {
    res.status(500).send({ message: "Error in Registration." });
  }
};
