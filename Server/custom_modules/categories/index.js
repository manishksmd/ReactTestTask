import Categories from './models/categories.js';

module.exports = class Category {
    constructor(req, res, next) {
       this.res = res;
       this.req = req;
       this.next = next;
    }

/*To add new questionnaire category*/
    insertCat() {
      console.log("inside controller");
      let _this = this;
      let data = this.req.body;

      Categories.insertCategory(data, function(err, data){
          if(err) _this.res.status(500).send(err);

          return _this.res.status(200).send({message: "Category added successfully","status":"1"});
      });
    }

    checkCategoryExists() {
      console.log("inside controller");
      let _this = this;
      let cat_slug = this.req.body.slug;

      //_this.res.status(200).send({res: 'done'});

      Categories.findCategory(cat_slug, function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            console.log(cat_slug+ " already exists");
            _this.res.status(200).json({message: cat_slug+" already exists", status:"0"});
          } else {
            _this.next();
          }

      });
    }

    deleteCategory() {
      let _this = this;
      let cat_id = this.req.params.id;

      Categories.deleteCategory(cat_id, function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            _this.res.status(200).json(data);
          }
      });
    }

    fetchUsers() {
      console.log("Insde controller: fetchUsers()");
      let email = this.req.body.email;
      let _this = this;
      Users.findAllUsers(email, function(err, data){
          if(err) _this.res.status(500).send();

          console.log("user data in controller: ", data);

          if(data) {
            _this.res.status(200).json({data:data, status:"1",adminLogin:true});
          }

      });

    }

    updateCategory() {
      console.log("Insde controller: updateCategory()");
      let data = this.req.body;
      let _this = this;

      Categories.updateCategory(data, function(err, data){
          if(err) _this.res.status(500).send(err);

          if(data.n==1) {
            return _this.res.status(200).send({message: "Category updated successfully","status":"1"});
          } else {

          }

          return _this.res.status(200).send({message: "Data not updated","status":"0"});

      });
    }

    getAllParentCats() {
      console.log("Insde controller: getAllParentCats()");
      let _this = this;

      Categories.fetchParentCats(function(err, data){
          if(err) _this.res.status(500).send(err);

          console.log("category data in controller: ", data);

          if(data) {
            _this.res.status(200).json({data:data, status:"1"});
          }
        console.log("categorydfdsfdsf");
          //return _this.res.status(500).send({message: "Error occured","status":"0"});

      });
    }




}
