const mongoose = require('mongoose');

const ThingSchema = new mongoose.Schema({
    name:{ 
        type: String, 
        required:[true, "Thing name is required"],
        unique: true,  
        minlength: [3, "*Thing name must be at least 3 charachters long"],
        validate: {  
            validator: function(value) {
                return !value.toLowerCase().includes("cake");
            },
            message: "Things cannot contain the word 'cake'"
            }
        },

    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

const Thing = mongoose.model('Thing', ThingSchema);

module.exports = Thing;
