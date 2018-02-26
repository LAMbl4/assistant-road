// User.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
    name: String,
    fb_id : {
    type: String,
    unique : true
    },
    telephone : String,
    mk_transport : String,
    region : String,
    lat : String,
    lng : String
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
