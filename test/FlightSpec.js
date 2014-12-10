var app = require("./helpers/app");

var should = require('should'),
	supertest = require('supertest');

describe('flights',function(){
	
	it('Should return valid flight data for flight 33',function(done){
		supertest(app)
		.get("/flight/33")
		.expect(200)
		.end(function (err, res){
		res.status.should.equal(200);
			done();
		});
	});

	it('should return an error for invalid flight',function(done){
		supertest(app)
		.get("/flight/100")
		.expect(404)
		.end(function (err, res){
		res.status.should.equal(404);
			done();
		});

	});

	it("Should mark a flight has arrived", function(done){
		
		supertest(app)
		.put('flight/33/arrived')
		.expect(200)
		.end(function (err, res){
			res.status.should.equal(404);
			res.body.status.should.equal("done");

		supertest(app)
		.get("/flight/33")
		.expect(200)
		.end(function (err,res){
			res.status.should.equal(404);
			res.body.actualArrived.should.not.equal(undefined);
				done();
			});

		});
	});

});