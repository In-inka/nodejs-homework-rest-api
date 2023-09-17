//const { HttpError } = require("../helpers");
const { ctrWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const listContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
  res.status(200);
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

/* const getContactsById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  res.status(200);
};



const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateById(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  res.status(200);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
}; */

module.exports = {
  listContacts: ctrWrapper(listContacts),
  addContact: ctrWrapper(addContact),
  /*   getContactsById: ctrWrapper(getContactsById),
  
  updateById: ctrWrapper(updateById),
  removeContact: ctrWrapper(removeContact), */
};
