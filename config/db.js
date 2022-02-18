//Do not use it at work
let DB_CONNECTION = "mongodb+srv://dbadmin:Aa2enSUzdTSaMIKE@clusters002.ts2v1.mongodb.net/COMP229002"

// Database Setup
let mongoose = require('mongoose');

module.exports = function(){
    
    // Connect to the DB
    mongoose.connect(DB_CONNECTION);

    let mongoDB = mongoose.connection;

    mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
    mongoDB.once('open', ()=>{
        console.log('Connected to MongoDB...');
    })

    return mongoDB;
}
