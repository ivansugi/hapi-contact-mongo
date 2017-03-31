var Joi = require('joi'),
    Boom = require('boom'),
    Contact = require('../models/contact').Contact;

exports.getAll = {
    handler: function(request, reply) {
        Contact.find({}, function(err, contact) {
            if (!err) {
                reply(contact);
            } else {
                console.log(err);
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
};

exports.getOne = {
    handler: function(request, reply) {
        Contact.findOne({
            '_id': request.params.contactId
        }, function(err, contact) {
            if (!err) {
                reply(contact);
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
};

exports.create = {
    validate: {
        payload: {
           name:  {    
                first: Joi.string().required(), 
                last: Joi.string().required()
            },
            email: Joi.string().required(),
            number: {
                home: Joi.string(), 
                work: Joi.string(),
                mobile: Joi.string()
            }
        }
    },
    handler: function(request, reply) {
        var contact = new Contact(request.payload);
        contact.save(function(err, contact) {
            if (!err) {
                reply(contact).created('/Contact/' + contact._id); // HTTP 201
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another Contact id, it already exist"));
                } else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
            }
        });
    }
};

exports.update = {
    validate: {
        payload: {
            name:  {    
                first: Joi.string().required() 
                
            },
            email: Joi.string().required()
        }
    },

    handler: function(request, reply) {
        Contact.findOne({
            '_id': ObjectId(request.params.contactId)
        }, function(err, Contact) {
            if (!err) {
               
                Contact.save(function(err, contact) {
                    if (!err) {
                        reply(contact).updated('/contact/' + contact._id); // HTTP 201
                    } else {
                        if (11000 === err.code || 11001 === err.code) {
                            reply(Boom.forbidden("please provide another Contact id, it already exist"));
                        } else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                    }
                });
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
};

exports.remove = {
    handler: function(request, reply) {
        Contact.findOne({
            '_id': ObjectId(request.params.contactId)
        }, function(err, contact) {
            if (!err && Contact) {
                Contact.remove();
                reply({
                    message: "Contact deleted successfully"
                });
            } else if (!err) {
                // Couldn't find the object.
                reply(Boom.notFound());
            } else {
                reply(Boom.badRequest("Could not delete Contact"));
            }
        });
    }
};