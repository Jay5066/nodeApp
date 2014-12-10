#!/usr/bin/env	node 

var http = require('http'),
	data = require("./data"),
	db = require('./db'),
	//repl = require('repl'),
	argv = require('optimist').argv,
	app = require('./app')(data,db);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});	

//var prompt = repl.start({prompt:'flights>'});

//prompt.context.data = data;
// console.log(argv);
// console.log(process.argv);

if (argv.flight && argv.destination) {
	data[argv.flight].data.destination = argv.destination;
};