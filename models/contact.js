var Mongoose = require('../database').Mongoose;

//create the schema
var contactSchema = new Mongoose.Schema({  
    name:  {    
        first: { type: String, required: true} ,
        last: { type: String, required: true } 
    },
    
    email:     {    type: String,   required: true },
    number:  {    
        home: String,
        work: String,
        mobile: String
    },
   
    
});

//create the model
var Contact = Mongoose.model('Contact', contactSchema, 'Contact');

exports.Contact = Contact;  