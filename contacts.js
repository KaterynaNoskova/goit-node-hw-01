const fs = require("fs").promises;
const { error } = require("console");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function getContacts() {
  try {
    const getArrayCont = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(getArrayCont);
  } catch (err) {
    console.error("Error get array contacts");
    throw err;
  }
}
async function listContacts() {
  try {
    const arrayCont = await getContacts();
    console.log(arrayCont);
    return arrayCont;
  } catch (err) {
    console.error("Error list contacts");
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getContacts();
    const contact = contacts.find((contact) => {
      return contact.id === contactId.toString();
    });
    if (contact) {
      console.log(contact);
    } else {
      console.log(`null`);
      return null;
    }
  } catch (err) {
    console.error(`Error get contacts by ID: ${error.message}`);
    throw err;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getContacts();
    const filterContacts = contacts.filter(
      ({ id }) => id !== contactId.toString()
    );
    const removeContacts = contacts.find((contact) =>
      contact.id === contactId.toString() ? contact : null
    );
    const contactToString = JSON.stringify(filterContacts);
    if (!removeContacts) {
      console.log("null");
    } else {
      console.log(removeContacts);
    }
    fs.writeFile(contactsPath, stringifiedContacts, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Contacts is removed.");
      }
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: crypto.randomBytes(16).toString("hex"),
    name,
    email,
    phone,
  };

  const contacts = await getContacts();

  const newArray = [...contacts, newContact];
  console.log(newContact);

  const updatedArray = JSON.stringify(newArray);

  fs.writeFile(contactsPath, updatedArray, "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Contacts is added.");
    }
  });
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
