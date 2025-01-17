const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { ctrWrapper, HttpError } = require("../helpers");
const gravatar = require("gravatar");
const path = require("path");

const fs = require("fs/promises");
const Jimp = require("jimp");
const { SECRET_KEY } = process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: " " });

  res.status(204);
};

const getUpdate = async (req, res) => {
  const { subscription } = req.body;

  const user = await User.updateOne({ subscription: subscription });
  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  res.json({
    subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}${originalname}`;

  const resultUpload = path.join(avatarDir, filename);

  Jimp.read(tempUpload, (err, originalname) => {
    if (err) throw err;
    originalname.resize(250, 250).quality(60).write(resultUpload);
  });

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register: ctrWrapper(register),
  login: ctrWrapper(login),
  getCurrent: ctrWrapper(getCurrent),
  logout: ctrWrapper(logout),
  getUpdate: ctrWrapper(getUpdate),
  updateAvatar: ctrWrapper(updateAvatar),
};
