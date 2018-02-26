// UserController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Marker = require('./Marker');

// ADD THIS PART
// CREATES A NEW Marker
router.post('/', function (req, res) {
    Marker.create({
            fb_id : req.body.fb_id,
            telephone : req.body.telephone,
            mk_transport : req.body.mk_transport,
            comment : req.body.comment,
            lat : req.body.lat,
            lng : req.body.lng
        },
        function (err, marker) {
            if (err) {
				if (err.code === 11000) {
					// Duplicate marker
					return res.status(500).send({ succes: false, message: 'Marker already exist!' });
				} 
				else 
				{					
					return res.status(500).send(err);
				}
			}
            res.status(200).send(marker);
        });
});

// RETURNS ALL THE Markers IN THE DATABASE
router.get('/', function (req, res) {
    Marker.find({}, function (err, markers) {
        if (err) return res.status(500).send("There was a problem finding the Markers.");
        res.status(200).send(markers);
    });
});

// GETS A SINGLE MARKER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Marker.findById(req.params.id, function (err, marker) {
        if (err) return res.status(500).send("There was a problem finding the marker.");
        if (!marker) return res.status(404).send("No Marker found.");
        res.status(200).send(marker);
    });
});

// DELETES A MARKER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Marker.findByIdAndRemove(req.params.id, function (err, marker) {
        if (err) return res.status(500).send("There was a problem deleting the marker.");
        res.status(200).send("Marker "+ Marker.fb_id +" was deleted.");
    });
});

// UPDATES A SINGLE MARKER IN THE DATABASE
router.put('/:id', function (req, res) {

    Marker.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, marker) {
        if (err) return res.status(500).send("There was a problem updating the Marker.");
        res.status(200).send(marker);
    });
});

module.exports = router;