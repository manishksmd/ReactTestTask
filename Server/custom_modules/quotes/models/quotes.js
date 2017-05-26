import mongoose from 'mongoose';
let ObjectId = require('mongoose').Types.ObjectId;
import fs from 'fs';


// let healthAreaSchema = mongoose.Schema({
// 	_id: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		required: false
// 	}
// });

const Quotes = mongoose.Schema({
		symbol : {type: Object,required: true},
    	last : { type: Object, required: true },
    	high : { type: Object, required: true },
    	low : { type: Object, required: true },
    	volume: { type: Object, required: true },
		created: { type: Date,  default : new Date() },
		modified: { type: Date,  required: false },
		del: { type: Number, default: 0 }
});



Quotes.statics.insertQuote = function(data, callBack){
  console.log("inside register function");

  let quote = new this(data);
	console.log(data);

  quote.save(function(err, res) {
    if(!res) callBack(err, null);
    callBack( null, res);
  });

}

Quotes.statics.findSymbol = function(symbol, callBack) {
	console.log("Inside find user method, email: ", symbol);

	this.findOne({symbol:symbol},function(err, quote){
		if(err) return callBack(null, null);
		console.log("user data: ", quote);

		if(quote) return callBack(null, quote);
		return callBack(null, null);
	});


 }

Quotes.statics.findAllQuotes = function(callBack) {
	try{
		this.find( {del:0}, {"__v":0	},function(err, quotes){

			if(err) return callBack(null, null);

			if(quotes) {
				return callBack(null, quotes);
			}
			return callBack(null, null);
		});
	} catch(e) {
		console.log(e);
	}
	

}

// Users.statics.authenticateUser = function({email, password}) {
// 	console.log("inside model data:" + email + ", password: " + password);

// 	this.findOne({email:email},function(err, user){
// 		if(err) return callBack(null, null);
// 		console.log("user data: ", user);
// 		if(user) return callBack(null, user);
// 		return callBack(null, null);
// 	});
// }

Quotes.statics.deleteQuote = function(id, callBack) {
	console.log("Inside delete user method, id:", id);

	this.remove( { _id: { $eq: id } }).exec(function(err, response){
		
		if(err) {
			if(err) return callBack(null, null);
		}

		if(response.result.n == 0) {
			return callBack(null, {message:"No record deleted"});
		}

		return callBack(null, {message:"Data deleted"});
	});

}

// Users.statics.fetchUserData = function(id, callBack) {
// 	console.log("Inside fetchUserData, id: ", id);

// 	this.findOne({_id:id},{password:0, __v:0},function(err, user){
// 		if(err) return callBack(null, null);
// 		console.log("user data: ", user);
// 		if(user) return callBack(null, user);
// 		return callBack(null, null);
// 	});
// }

// Users.statics.updateUserDetail = function(data, callBack) {
// 	console.log("Inside updateUserDetail, id: ", data.id);

// 	let userId = data.id;

// 	data.modified = new Date();
// 	delete data._id;
// 	let user = new this(data);
// 	this.update({_id: userId}, {$set: data},function(err, res) {
// 		if(!res) callBack(err, null);

// 		callBack( null, res);
// 	});
// }



export default mongoose.model('quotes', Quotes);
