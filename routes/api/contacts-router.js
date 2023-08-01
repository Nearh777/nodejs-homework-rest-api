import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody } from "../../middlewars/index.js";



const contactsRouter = express.Router();



contactsRouter.get("/", contactsController.listContacts);

// contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post("/", isEmptyBody, validateBody(contactsSchemas.contactsAddSchema),
contactsController.addContact);

// contactsRouter.put("/:id", isEmptyBody, validateBody(contactsSchemas.contactsAddSchema),
// contactsController.updateContact);

// contactsRouter.delete("/:id", contactsController.removeContact);

export default contactsRouter;
