
/*
 * GET home page.
 */

var FlightSchema = require('../schemas/flights');
var Emitter = require('events').EventEmitter;
var flightEmitter = new Emitter();

flightEmitter.on('arrival',function(flight){
  var record = new FlightSchema(
           flight.getInformation()
        );
        //Mongo save 
        record.save(function(err){
            if(err){
              console.log(err);
              res.status(500).json({status:"failuer"})
            }
        });
});

flightEmitter.on('arrival',function(flight){
  console.log("Flight Arrived :" + flight.data.number); 
});

module.exports = function (data) {
  
  var flight = require("../flight");
  for(var number in data){
    data[number] = flight(data[number]);
  };

  var functions = {};

  functions.index = function(req, res){
     var number = req.param('number');
     req.session.lastNumber = number;
     if(typeof data[number]==="undefined"){
        res.status(404).json({status:'error'});
     }else{
        res.json(data[number].getInformation());
     }
      
  };

  functions.arrived = function(req, res){
     var number = req.param('number')
      // res.json(data[number].getInformation());
      if(typeof data[number]==="undefined"){
          res.status(404).json({status:'error'});
       }else{
        data[number].triggerArrive();
        flightEmitter.emit('arrival',data [number]);
        res.json({status:"Success"});
        // res.json({status:'done'});
      }
  };

  functions.list = function(req, res){
     res.render('list',{
         title:'All Flights',
         flights:data});
  };

  functions.listjson = function(req, res){
    var nval = [];
      for(var val in data){
        nval.push(data[val].getInformation());
      }
      return res.json(nval);
  };

  functions.arrivals = function (req,res){
      FlightSchema.find()
      .setOptions({sort:'actualArrive'})
      .exec(function(err, arrivals){
        if(err){
            console.log(err);
            res.status(500).json({status:"failure"});
        }else{
           res.render('arrived',{
           title:'Arrived',
           arrivals:arrivals,
           lastNumber:req.session.lastNumber
         });
        }
      });
  }

  functions.login = function (req,res){
    res.render('login',{title:'Welcome to login page'});
  }


  functions.user = function (req,res){
    if(req.session.passport.user === undefined){
        res.redirect('/login');
    }else {
      res.render('user',{title: 'Welcome!',
        user: req.user
      })
    }

  };


  return functions;
}
