const passport = require('passport');

module.exports = function(){
    const User = require('../models/login');

    // When a user is authenticated, passport will
    // save its _id property to the session.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //Later on, then the user object is neede,
    // Passport will use the _id property to grab
    // the user object from the database.
    passport.deserializeUser((id, done) => {
        User.findOne(
            { _id: id},
            '-password -salt',
            (err, user) => {
                done(err, user);
            }
        )
    });

    require('./local')();
};
