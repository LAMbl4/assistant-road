// UserController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// ADD THIS PART
// CREATES A NEW USER
router.post('/', function (req, res) {
    User.create({
            name : req.body.name,
            fb_id : req.body.fb_id,
            telephone : req.body.telephone,
            mk_transport : req.body.mk_transport,
            region : req.body.region,
            lat : req.body.lat,
            lng : req.body.lng
        },
        function (err, user) {
            if (err) {
				if (err.code === 11000) {
					// Duplicate username
					return res.status(500).send({ success: 'false', message: 'User already exist!' });
				} 
				else 
				{					
					return res.status(500).send({ success: 'false', message: 'err' });
				}
			}
            res.status(200).send({ success: 'true', message: 'return users.', result: user });
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
		if (err) return res.status(500).send({ succes: false, message: 'There was a problem finding the users.' });
        res.status(200).send({ succes: true, message: 'return users.', result: users });
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:fb_id', function (req, res) {
    User.findOne({ 'fb_id': req.params.fb_id }, req.body, function (err, user) {
		if (err) return res.status(500).send({ succes: false, message: 'There was a problem finding the user.' });
		if (!user) return res.status(404).send({ succes: false, message: 'No user found.' });
        res.status(200).send({ succes: true, message: 'return user.', result: user });
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.fb_id +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:fb_id', function (req, res) {

    User.findOneAndUpdate({ 'fb_id': req.params.fb_id }, req.body, function (err, user) {
		if (err) return res.status(500).send({ succes: false, message: 'There was a problem updating the user.' });
        res.status(200).send({ succes: true, message: 'User '+ user.name +' was update.' });
    });
});



module.exports = router;