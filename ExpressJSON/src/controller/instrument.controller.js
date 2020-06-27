const Instrument = require("../model/instrument.js");
const ExcelJS = require('exceljs');
const wb1 = new ExcelJS.Workbook();

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

exports.AddSteel = (req,res) => {
    var return_data = [];
    //Get sheets data into Database
    var Workbook = new ExcelJS.Workbook();
    Workbook.xlsx.readFile("./SteelDetails.xlsx").then(function () {
        
        var worksheet=Workbook.getWorksheet('Sheet1');
        worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
            
            if(rowNumber>=15 && row.getCell(1).value!=null)
            {
                
                var dimension = String(row.getCell(2).value).split(' x' );
                var dimen1 = dimension[0];
                dimension.splice(0,1);
                var dimen2 = dimension.join(' x ');
                var steel = new Instrument({
                    Name:row.getCell(1).value,
                    Dimension1:dimen1,
                    Dimension2:dimen2,
                    Length:row.getCell(3).value,
                    UnitWeight:row.getCell(5).value
                });
                //console.log(steel);
                Instrument.AddSteel(steel,(error,data)=>{
                    return_data.push(data);
                  
                });
            }
          });
    });
    res.json(return_data);
}

exports.getAllSteelData= (req,res)=>{
    console.log("Got into API");
    Instrument.getAllSteelData((err,data)=>{
        if(!err)
        {
            data = data.sort(function(a,b){
                a = a.Name.toLowerCase();
                b = b.Name.toLowerCase();
                return a<b?-1:a>b?1:0
            })
            console.log()
            res.json({
                status:'OK',
                results:data
            });
        }
        else
        {
            res.status(500).json({message:err.message || "Some error occured"});
        }
    })
}

