import mongoose from 'mongoose';
let ObjectId = require('mongoose').Types.ObjectId;

// let healthAreaSchema = mongoose.Schema({
// 	_id: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		required: false
// 	}
// });

const Categories = mongoose.Schema({
		name : {
			 type: String,
	     	required: true
		},
    slug : {
		 type: String,
     	required: true
		},
		description:{
			type: String,
      required: true
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
		is_deleted: {
			type: Number, default: 0
		},
		parent_id:{type: mongoose.Schema.Types.ObjectId, ref: 'categories'}

});

Categories.statics.insertCategory = function(data, callBack){
  console.log("inside create function");

  let category = new this(data);
	console.log(category);

  category.save(function(err, res) {
    if(!res) callBack(err, null);
    callBack( null, res);
  });

}

Categories.statics.findCategory = function(cat_slug, callBack) {
	console.log("Inside find category method, slug: ", cat_slug);

	this.findOne({slug:cat_slug},function(err, category){
		if(err) return callBack(null, null);
		console.log("category data: ", category);
		if(category) return callBack(null, category);
		return callBack(null, null);
	});


}

Categories.statics.deleteCategory = function(id, callBack) {
	console.log("Inside delete category method, id: ", id);

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

Categories.statics.updateCategory = function(data, callBack) {
	console.log("inside Update function", data);

	let catId = data.id;

	data.modified = new Date();
	delete data._id;
	let category = new this(data);
	this.update({_id: catId}, {$set: data},function(err, res) {
		if(!res) callBack(err, null);

		callBack( null, res);
	});
}

Categories.statics.fetchParentCats = function(callBack) {
	console.log("inside fetch cat function");

	this.find( { parent_id: undefined }, {__v:0} ,function(err, allCats){
		if(err) return callBack(null, null);

		if(allCats) {
			return callBack(null, allCats);
		}
		return callBack(null, null);
	});
}




export default mongoose.model('categories', Categories);
