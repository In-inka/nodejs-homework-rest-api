const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBodyCreate } = require("../../middlewares");
const { addSchemaCreate } = require("../../models/contact");

router.get("/", ctrl.listContacts);
router.post("/", validateBodyCreate(addSchemaCreate), ctrl.addContact);
/* router.get("/:contactId", ctrl.getContactsById);
router.put("/:contactId", validateBodyUpdate(addSchemaUpdate), ctrl.updateById);
router.delete("/:contactId", ctrl.removeContact); */

module.exports = router;
