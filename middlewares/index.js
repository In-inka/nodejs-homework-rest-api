const validateBodyCreate = require("./validateBodyCreate");
const validateBodyUpdate = require("./validateBodyUpdate");
const isValidId = require("./isvalidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validateBodyCreate,
  validateBodyUpdate,
  isValidId,
  authenticate,
  upload,
};
