const PurchaseModel = require('../models/purchase')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.productName && !req.body.cost && !req.body.color && !req.body.description) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const purchase = new PurchaseModel({
        productName: req.body.productName,
        cost: req.body.cost,
        color: req.body.color,
        description: req.body.description
    });

    await purchase.save().then(data => {
        res.send({
            message:"Product created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating purchase"
        });
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const purchase = await PurchaseModel.find();
        res.status(200).json(purchase);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await PurchaseModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await PurchaseModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Product not found.`
            });
        }else{
            res.send({ message: "Product updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await PurchaseModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Product not found.`
            });
        } else {
            res.send({
                message: "Product deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};