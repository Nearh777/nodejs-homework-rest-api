import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, isEmptyBodyFavorite, isValidId, authenticate } from "../../middlewars/index.js";





const contactsRouter = express.Router();



contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post("/", isEmptyBody, validateBody(contactsSchemas.contactsAddSchema),
contactsController.addContact);

contactsRouter.put("/:id", isValidId, isEmptyBody, validateBody(contactsSchemas.contactsAddSchema),
contactsController.updateContact);

contactsRouter.patch("/:id/favorite", isValidId, isEmptyBodyFavorite, validateBody(contactsSchemas.contactUpdateFavoriteSchema),
contactsController.updateContact);

contactsRouter.delete("/:id", isValidId, contactsController.removeContact);

export default contactsRouter;
