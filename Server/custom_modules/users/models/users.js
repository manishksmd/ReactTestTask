import mongoose from 'mongoose';
let ObjectId = require('mongoose').Types.ObjectId;
import fs from 'fs';


// let healthAreaSchema = mongoose.Schema({
// 	_id: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		required: false
// 	}
// });

const Users = mongoose.Schema({
		first_name : {
		 type: Object,
     required: true
		},
    last_name : {
		 type: Object,
     required: true
		},
		password:{
			type: Object,
      required: true
		},
    email : {
		 type: Object,
     //required: true
		},
		created: {
		    type: Date,
		    default : new Date()
		},
		createdBy: {
		    type: mongoose.Schema.Types.ObjectId,
		    required: false
		},
		modified: {
		    type: Date,
		    required: false
		},
		modifiedBy: {
		    type: mongoose.Schema.Types.ObjectId,
		    required: false
		},
		user_status: {
			type: Number
		}
		,
		del: {
			type: Number, default: 0
		}
});

var passportLocalMongoose = require('passport-local-mongoose');

Users.plugin(passportLocalMongoose);

Users.statics.insertUser = function(data, callBack){
  console.log("inside register function");

  let user = new this(data);
	console.log(data);

  user.save(function(err, res) {
    if(!res) callBack(err, null);
    callBack( null, res);
  });

}

Users.statics.findUser = function(email, callBack) {
	console.log("Inside find user method, email: ", email);

	this.findOne({email:email},function(err, user){
		if(err) return callBack(null, null);
		console.log("user data: ", user);

		if(user) return callBack(null, user);
		return callBack(null, null);
	});


}

Users.statics.findAllUsers = function(email,serverhost, callBack) {
	this.find({},{"email":1,"first_name": 1	},function(err, user){
		if(err) return callBack(null, null);

		if(user) {
			let userData = [];
			try{
				for (var i = user.length - 1; i >= 0; i--) {
					let data = {
						_id : user[i]._id,
						first_name : user[i].first_name,
						email : user[i].email
					};


					let image_path = __dirname + '/../../../public/images/user_images/' + user[i]._id + '.png';
					data.profile_image=  "http://" + serverhost + "/images/user_images/no_image.jpg";
					if (fs.existsSync(image_path)) {
						data.profile_image = "http://" + serverhost + "/images/user_images/" + user[i]._id + ".png"
					}

					userData.push(data);
				}

			} catch(e) {
				console.log(e);
			}
			return callBack(null, userData);
		}
		return callBack(null, null);
	});

}

Users.statics.authenticateUser = function({email, password}) {
	console.log("inside model data:" + email + ", password: " + password);

	this.findOne({email:email},function(err, user){
		if(err) return callBack(null, null);
		console.log("user data: ", user);
		if(user) return callBack(null, user);
		return callBack(null, null);
	});
}

Users.statics.deleteUser = function(id, callBack) {
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

Users.statics.fetchUserData = function(id, callBack) {
	console.log("Inside fetchUserData, id: ", id);

	this.findOne({_id:id},{password:0, __v:0},function(err, user){
		if(err) return callBack(null, null);
		console.log("user data: ", user);
		if(user) return callBack(null, user);
		return callBack(null, null);
	});
}

Users.statics.updateUserDetail = function(data, callBack) {
	console.log("Inside updateUserDetail, id: ", data.id);

	let userId = data.id;

	data.modified = new Date();
	delete data._id;
	let user = new this(data);
	this.update({_id: userId}, {$set: data},function(err, res) {
		if(!res) callBack(err, null);

		callBack( null, res);
	});
}



export default mongoose.model('users', Users);
