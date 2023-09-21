const User1 = require("../models/user1.model.js");

// Create and Save a new user1
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "user1 content can not be empty",
    });
  }

  // Create a user1
  const user1 = new User1({
    name: req.body.name || "Untitled User1",
    email: req.body.email,
    balance: req.body.balance,
    num: req.body.num,
  });

  // Save user1in the database
  user1
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user1.",
      });
    });
};

// Retrieve and return all user1 from the database.
exports.findAll = (req, res) => {
  User1.find()
    .then((user1s) => {
      res.send(user1s);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user1s.",
      });
    });
};

// Find a single user1 with a user1Id
exports.findOne = (req, res) => {
  User1.findById(req.params.user1Id)
    .then(user1 => {
      if (!user1) {
        return res.status(404).send({
          message: "user1 not found with id " + req.params.user1Id,
        });
      }
      res.send(user1);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user1 not found with id " + req.params.user1Id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user1 with id " + req.params.user1Id,
      });
    });
};

// Update a user1 identified by the user1Id in the request
exports.update = (req, res) => {

  // Find user1 and update it with the request body
  User1.findByIdAndUpdate(
    req.params.user1Id,
    { $set: req.body },
    { new: true }
  )
    .then((user1) => {
      if (!user1) {
        return res.status(404).send({
          message: "user1 not found with id " + req.params.user1Id,
        });
      }
      res.send(user1);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user1 not found with id " + req.params.user1Id,
        });
      }
      return res.status(500).send({
        message: "Error updating user1 with id " + req.params.user1Id,
      });
    });
};

// Delete a user1 with the specified user1Id in the request
exports.delete = (req, res) => {
  User1.findByIdAndRemove(req.params.user1Id)
    .then((user1) => {
      if (!user1) {
        return res.status(404).send({
          message: "user1 not found with id " + req.params.user1Id,
        });
      }
      res.send({ message: "user1deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "user1 not found with id " + req.params.user1Id,
        });
      }
      return res.status(500).send({
        message: "Could not delete user1 with id " + req.params.user1Id,
      });
    });
};
