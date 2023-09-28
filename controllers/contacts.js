const { HttpError } = require("../helpers");
const { ctrWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const filter = { owner };
  const { favorite = false, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    filter.favorite = true;
  }
  const result = await Contact.find(filter, "-createdAt -updateAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(result);
  res.status(200);
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const getContactsById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result.favorite);
  res.status(200);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  res.status(200);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  res.status(200);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  listContacts: ctrWrapper(listContacts),
  addContact: ctrWrapper(addContact),
  getContactsById: ctrWrapper(getContactsById),

  updateById: ctrWrapper(updateById),
  removeContact: ctrWrapper(removeContact),
  updateStatusContact: ctrWrapper(updateStatusContact),
};
