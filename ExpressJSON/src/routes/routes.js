module.exports = app => {
    const instruments = require("../controller/instrument.controller.js");
  
    // Create a new Customer
    app.post("/customers", instruments.create);
  
    // Retrieve all Customers
    app.get("/customers", instruments.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/customers/:customerId", instruments.findOne);
  
    // Update a Customer with customerId
    app.put("/customers/:customerId", instruments.update);
  
    // Delete a Customer with customerId
    app.delete("/customers/:customerId", instruments.delete);
  
    // Create a new Customer
    app.delete("/customers", instruments.deleteAll);

    //Get Instruments
    app.get("/Instruments",instruments.getAllInstruments);
  };