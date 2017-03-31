var Contact = require('./routes/contacts');

exports.endpoints = [

  { method: 'POST', path: '/contact', config:Contact.create},
  { method: 'GET', path: '/contact', config: Contact.getAll}, 
  { method: 'GET', path: '/contact/{contactId}', config: Contact.getOne}, 
  { method: 'PUT', path: '/contact/{contactId}', config: Contact.update}, 
  { method: 'DELETE', path: '/contact/{contactId}', config: Contact.remove}];