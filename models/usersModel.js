const { boolean } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const usersSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

const Users = mongoose.model("Users", usersSchema);

const insertsUser = (firstName, lastName, email, password, isAdmin) => {
  const user = new Users({ firstName, lastName, email, password, isAdmin });
  return user.save();
};

const selectUserByMail = (email) => {
  return Users.find({ email });
};

const getAllUsers = () => {
  const allUsers = Users.find();
  return allUsers;
};

const editUser = async (id, firstName, lastName, email, password) => {
  const userToEdit = await Users.findByIdAndUpdate(id, {
    firstName,
    lastName,
    email,
    password,
  });
  return userToEdit;
};

const deleteUser = async (id) => {
  const userToRemove = await Users.findByIdAndDelete(id);
  return userToRemove;
};

module.exports = {
  insertsUser,
  selectUserByMail,
  getAllUsers,
  editUser,
  deleteUser,
};
