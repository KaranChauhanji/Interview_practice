const UserModel = require("../../model/user.model");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const {username,email,password} = req.body
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already access" });
    }
    bcrypt.hash(password, 2, async (err, hash) => {
      if (err) {
        return res
          .status(400)
          .send({ message: `Error in hashing password: ${err.message}` });
      }
if(hash){

  const newUser = new UserModel({ username, email, password: hash });
  await newUser.save();
  res
  .status(200)
  .send({ message: `${username} welcome you are Registered.` });
}
});
} catch (error) {
    res.status(500).send({ message: "Error in Registration." });
  }
};

module.exports = userRegister;
