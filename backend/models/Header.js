const mongoose = require('mongoose');

const HeaderSchema = new mongoose.Schema({
    // Logo Path
    logo: { type: String }, 
    
    // Contact Info
    contact: {
        phone: String,
        email: String,
        address: String
    },

    // Dynamic Social Links (Array allow add/remove)
    socialLinks: [
        {
            icon: String, // ex: "fa-brands fa-facebook-f"
            url: String
        }
    ],

    // Dynamic Menus (Recursive/Nested)
    menuItems: [
        {
            label: String, // ex: "Home"
            path: String,  // ex: "/"
            children: [    // For Dropdown
                {
                    label: String,
                    path: String
                }
            ]
        }
    ],

    // Apply Button
    actionButton: {
        text: String,
        url: String,
        show: { type: Boolean, default: true }
    }
});

module.exports = mongoose.model('Header', HeaderSchema);