const Admin1 = require('../models/admin1.model.js');

// Create and Save a new admin1
exports.create = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "admin1 content can not be empty"
        });
    }

    // Create a admin1
    const admin1 = new Admin1({
        username: req.body.username || "Untitled Admin1", 
       password: req.body.password,
    });

    // Save admin1 in the database
    admin1.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the admin1."
        });
    });
};

// Retrieve and return all admin1 from the database.
exports.findAll = (req, res) => {
    Admin1.find()
    .then(admin1s => {
        res.send(admin1s);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving admin1s."
        });
    });
};

// Find a single admin1 with a admin1Id
exports.findOne = (req, res) => {
    Admin1.findById(req.params.admin1Id)
    .then(admin1 => {
        if(!admin1) {
            return res.status(404).send({
                message: "admin1 not found with id " + req.params.admin1Id
            });            
        }
        res.send(admin1);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin1 not found with id " + req.params.admin1Id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin1 with id " + req.params.admin1Id
        });
    });
};

// Update a admin1 identified by the admin1Id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "admin1 content can not be empty"
        });
    }

    // Find admin1 and update it with the request body
    Admin1.findByIdAndUpdate(req.params.admin1Id, {
        username: req.body.username || "Untitled admin1", 
        password: req.body.password ,
    }, {new: true})
    .then(admin1 => {
        if(!admin1) {
            return res.status(404).send({
                message: "admin1 not found with id " + req.params.admin1Id
            });
        }
        res.send(admin1);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin1 not found with id " + req.params.admin1Id
            });                
        }
        return res.status(500).send({
            message: "Error updating admin1 with id " + req.params.admin1Id
        });
    });
};

// Delete a admin1 with the specified admin1Id in the request
exports.delete = (req, res) => {
    Admin1.findByIdAndRemove(req.params.admin1Id)
    .then(admin1 => {
        if(!admin1) {
            return res.status(404).send({
                message: "admin1 not found with id " + req.params.admin1Id
            });
        }
        res.send({message: "admin1 deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "admin1 not found with id " + req.params.admin1Id
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin1 with id " + req.params.admin1Id
        });
    });
};
