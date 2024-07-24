import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    email:{type: String, uniaue: true, required: true},
    password:{type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type:String}
})

export default model('User', UserSchema);