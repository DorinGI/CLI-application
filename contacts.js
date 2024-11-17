const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Eroare la citirea fișierului contacts.json:', err.message);
    return [];
  }
}

async function addContact({ id, name, email, phone }) {
  try {
    const contacts = await listContacts();
    const contactExists = contacts.some(contact => contact.id === id);
    if (contactExists) {
      console.log(`Contactul cu ID-ul ${id} există deja.`);
      return;
    }
    const newContact = {
      id: id || uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('Contact adăugat cu succes:', newContact);
  } catch (err) {
    console.error('Eroare la adăugarea unui contact:', err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactExists = contacts.some(contact => contact.id == contactId);
    if (!contactExists) {
      console.log(`Contactul cu ID-ul ${contactId} nu există.`);
      return;
    }

    const updatedContacts = contacts.filter(contact => contact.id != contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    console.log(`Contactul cu ID-ul ${contactId} a fost șters.`);
  } catch (err) {
    console.error('Eroare la ștergerea unui contact:', err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id == contactId) || null;
  } catch (err) {
    console.error('Eroare la găsirea unui contact:', err.message);
    return null;
  }
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};
