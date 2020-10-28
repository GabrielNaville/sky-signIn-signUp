const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const confiq = require ('../config/config').get(process.env.NODE_ENV);
const salt = 10;
let mongoose = require ('mongoose');

const userSchema = mongoose.Schema ({
    name :{
        type: String,
        required: true,
        maxlength: 100
    },
    email :{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password : { 
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    phone :
        {
            number: {
                type: Number,
                required: true,
                maxlength: 9
            },
            ddd :{
                type: Number,
                required: true,
                maxlength: 2
            }
        },
    token: {
        type: String
    }
});

userSchema.pre ('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    
    next();
});


module.exports = mongoose.model ('User', userSchema);