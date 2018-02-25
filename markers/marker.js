// Marker.js
var mongoose = require('mongoose');
var MarkerSchema = new mongoose.Schema({
    fb_id : {
        type: String,
        unique : true
    },
    telephone : String,
    mk_transport : String,
    comment : String,
    lat : String,
    lng : String,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 60 * 10 //ten minutes
    }
});

MarkerSchema.index({ createdAt: 1  }, { expireAfterSeconds: 60*10 });
mongoose.model('Marker', MarkerSchema);
module.exports = mongoose.model('Marker');