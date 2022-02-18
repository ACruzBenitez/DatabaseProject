let mongoose = require('mongoose');
let crypto = require('crypto');
// Create a model class
let loginModel = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        password:{
            type:  String,
            validate: [(password) => {
                return password && password.length > 6;
            }, 'password must be larger than 6 digits']
        },
        email: {
            type: String,
            match: [/.+\@.+\..+/, "Please provide a valid email address"]
        },
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        salt: String,
        created: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "user"
    }
);

loginModel.virtual('fullName')
    .get(function(){
        return this.firstName + ' ' + this.lastName;
    })
    .set(function(fullName){
        let splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
    });

// Middleware pre
loginModel.pre('save', function(next){
    if(this.password){
        this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64') 
        this.password = this.hashPassword(this.password);
    }
    next();
});

//Middleware post
loginModel.post('save', function(next){
    console.log('The user "' + this.username + '" details were saved');
});

loginModel.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

loginModel.methods.authenticate = function(password){
  return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('user', loginModel);