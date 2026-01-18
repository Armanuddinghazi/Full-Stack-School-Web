const mongoose = require('mongoose');

const FooterSchema = new mongoose.Schema({
     logo: { type: String }, 
    aboutContent: { type: String, default: '' },
    
    contact: {
        phone: String,
        address: String,
        email: String
    },
    menuColumns: [
        {
            title: { type: String }, 
            columnClass: { type: String, default: "col-lg-2" }, 
            links: [
                {
                    label: String, 
                    url: String,   
                    icon: String   
                }
            ]
        }
    ],

    // Newsletter Section
    newsletter: {
        title: { type: String, default: "Newsletter" },
        text: { type: String, default: "Subscribe Our Newsletter..." },
        placeholder: { type: String, default: "Your Email" }
    },

    // Copyright & Social
    copyrightText: { type: String },
    socialLinks: [
        {
            platform: String, 
            icon: String,     
            url: String
        }
    ]
});

module.exports = mongoose.model('Footer', FooterSchema);