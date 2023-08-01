import Contact from "../models/contact.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const listContacts = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
}

// const getById = async (req, res) => {
//     const { id } = req.params;
//     const result = await contactsService.getContactById(id);
//     if (!result) {
//         throw HttpError(404, `Not found`);
//     }
//     res.json(result);
// }

// const addContact = async (req, res) => {
//     const result = await contactsService.add(req.body);
//     res.status(201).json(result);
// }



// const updateContact = async (req, res) => {
//     const { id } = req.params;
//     const result = await contactsService.updeteContactById(id, req.body);
//     if (!result) {
//         throw HttpError(404, `Not found`);
//     }
//     res.json(result);
// }

// const removeContact = async (req, res) => {
//     const { id } = req.params;
//     const result = await contactsService.deleteContact(id);
//     if (!result) {
//         throw HttpError(404, `Not found`);
//     }

//     res.json({
//         message: "contact deleted"
//     })
// }

export default {
    listContacts: ctrlWrapper(listContacts),
    // getById: ctrlWrapper(getById),
    // addContact: ctrlWrapper(addContact),
    // updateContact: ctrlWrapper(updateContact),
    // removeContact: ctrlWrapper(removeContact),
}