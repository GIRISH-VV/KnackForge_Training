import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true,unique: true},
    password: {type: String},
    userOrder: {type: Object, default: {test: 'testValue'}} //when name,email,age given and userOrder not provided still it will create document with empty object
}, {timestamps: true,minimize: false}) //timestamps will add createdAt and updatedAt fields automatically

const Person = mongoose.model('Person', personSchema);

export default Person;

//default: {} -> not creates in document
//default: {test: 'testValue'} -> creates in document with test key and testValue value
//default: {},minimize: false} -> creates one key value in document