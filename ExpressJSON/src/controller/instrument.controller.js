const Instrument = require("../model/instrument.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const instrument = new Instrument({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Customer in the database
  Instrument.create(instrument, (err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.json(data);
  });
  
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Instrument.getAll((err,data)=>{
        if(err)
        {
            res.status(500).json({message:err.message || "Some error occured"});
        }
        else
        {
            res.json(data);
        }
    })
  
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  var id = req.params.customerId;
  Instrument.findById(id,(err,data)=>{
    if(err)
    {
        res.status(500).json({message:err.message || "Some error occured"});
    }
    else
    {
        res.json(data);
    }
  })
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    if(!req.body)
    {
        res.status(400).json({
            message: "Content can not be empty!"
          });
    }
  Instrument.updateById(req.params.customerId,new Instrument(req.body),(err,data)=>{
    if(err)
    {
        res.status(500).json({message:err.message || "Some error occured"});
    }
    else
    {
        res.json(data);
    }
  });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Instrument.remove(req.params.customerId,(err,data)=>{
    if(err)
    {
        res.status(500).json({message:err.message || "Some error occured"});
    }
    else
    {
        res.json(data);
    }
  })
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Instrument.removeAll((err,data)=>{
    if(err)
    {
        res.status(500).json({message:err.message || "Some error occured"});
    }
    else
    {
        res.json(data);
    }
  })
};

exports.getAllInstruments = (req,res) =>{
    Instrument.getAllInstruments((data)=>{
        res.json(data);
    })
}