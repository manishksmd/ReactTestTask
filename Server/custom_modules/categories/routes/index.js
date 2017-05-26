import express from 'express';
import Category from '../index';

const catRoutes = express.Router();

/*Route for LIST Category*/
catRoutes.post('/add', (req, res, next) => {
  console.log("inside routes");
  	let categoryCtrl = new Category(req, res, next);
    categoryCtrl.checkCategoryExists();

}, function(req, res){
  let categoryCtrl = new Category(req, res);
  categoryCtrl.insertCat();
});


catRoutes.delete('/:id', (req, res, next) => {
    console.log("inside delete category routes");
  	let categoryCtrl = new Category(req, res, next);
    categoryCtrl.deleteCategory();

});

catRoutes.put('/update', (req, res, next) => {
    console.log("inside update category routes");
  	let categoryCtrl = new Category(req, res, next);
    categoryCtrl.updateCategory();

});

catRoutes.get('/parent_cats', (req, res, next) => {
  console.log("inside fetch category routes");
  let categoryCtrl = new Category(req, res, next);
  categoryCtrl.getAllParentCats();

});


export default catRoutes;
