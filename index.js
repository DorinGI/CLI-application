const contacts = require('./contacts.js');
const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts().then(contactsList => console.table(contactsList));
      break;

    case 'get':
      contacts.getContactById(id).then(contact => console.log(contact));
      break;

    case 'add':
      contacts.addContact({ id, name, email, phone });
      break;

    case 'remove':
      contacts.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
