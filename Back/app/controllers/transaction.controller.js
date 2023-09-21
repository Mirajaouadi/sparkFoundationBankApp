const Transaction = require('../models/transaction.model.js');
 
// Create and Save a new transaction
exports.create = (req, res) => {
    // Validate request
    if(!req.body.sender) {
        return res.status(400).send({
            message: "transaction content can not be empty"
        });
    }

    // Create a transaction
    const transaction = new Transaction({
       
        sender : req.body. sender,
        receiver: req.body. receiver,
        amount: req.body. amount,
       
    });

    // Save transaction in the database
    transaction.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the transaction."
        });
    });
};

// Retrieve and return all transaction from the database.
exports.findAll = (req, res) => {
    Transaction.find()
    .then(transactions => {
        res.send(transactions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving transactions."
        });
    });
};

// Find a single transaction with a transactionId
exports.findOne = (req, res) => {
    Transaction.findById(req.params.transactionId)
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "transaction not found with id " + req.params.transactionId
            });            
        }
        res.send(transaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "transaction not found with id " + req.params.transactionId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving transaction with id " + req.params.transactionId
        });
    });
};

// Update a transaction identified by the transactionId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "transaction content can not be empty"
        });
    }

    // Find transaction and update it with the request body
    Transaction.findByIdAndUpdate(req.params.transactionId, {
       
       sender: req.body.sender,
       receiver: req.body.receiver ,
       amount: req.body.amount ,
       
    }, {new: true})
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "transaction not found with id " + req.params.transactionId
            });
        }
        res.send(transaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "transaction not found with id " + req.params.transactionId
            });                
        }
        return res.status(500).send({
            message: "Error updating transaction with id " + req.params.transactionId
        });
    });
};

// Delete a transaction with the specified transactionId in the request
exports.delete = (req, res) => {
    Transaction.findByIdAndRemove(req.params.transactionId)
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "transaction not found with id " + req.params.transactionId
            });
        }
        res.send({message: "transaction deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "transaction not found with id " + req.params.transactionId
            });                
        }
        return res.status(500).send({
            message: "Could not delete transaction with id " + req.params.transactionId
        });
    });
};
