import Users from './models/users.js';
import mongoose from 'mongoose';
import fs from 'fs';

module.exports = class User {
    constructor(req, res, next) {
       this.res = res;
       this.req = req;
       this.next = next;
    }

/*To add new questionnaire category*/
    insertUser() {
      console.log("inside controller");
      let _this = this;
      let data = this.req.body;

      //_this.res.status(200).send({res: 'done'});

      Users.insertUser(data, function(err, data){
          console.log(err);
          if(err) _this.res.status(500).send(err.errmsg);

          return _this.res.status(200).send({message: "User added successfully","status":"1"});
      });
    }

    checkEmailExists() {
      console.log("inside controller");
      let _this = this;
      let email = this.req.body.email;

      //_this.res.status(200).send({res: 'done'});

      Users.findUser(email, function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            console.log(email+ " already exists");
            _this.res.status(200).json({message: email+" already exists", status:"0"});
          } else {
            _this.next();
          }

      });
    }

    fetchUsers() {
      console.log("Insde controller: fetchUsers()");
      let email = this.req.body.email;

      let _this = this;
      Users.findAllUsers(email,this.req.headers.host, function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            _this.res.status(200).json({data:data, status:"1",adminLogin:true});
          }

      });

    }

    loginUser() {
      console.log("Insde controller: loginUser()");
      let _this = this;
      let email = this.req.body.email;
      let password = this.req.body.password;

      let userObj = {email, password};

      Users.authenticateUser(userObj, function(err, data){
          if(err) _this.res.status(500).send();

          console.log("user data in controller: ", data);

          if(data) {
            _this.res.status(200).json({data:data, status:"1"});
          }

      });

    }

    deleteUser() {
      let _this = this;
      let user_id = this.req.params.id;

      Users.deleteUser(user_id, function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            _this.res.status(200).json(data);
          }
      });
    }

    fetchUser() {
      let _this = this;
      let user_id = this.req.params.id;

      Users.fetchUserData(user_id, function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            _this.res.status(200).json(data);
          }
      });
    }


    updateUser() {
      console.log("Insde controller: updateUser()");
      let data = this.req.body;
      let _this = this;
      console.log(data);
      if("profile_image" in  data) {
        let image_name = __dirname + '/../../public/images/user_images/' + data.id + '.png';
        let buff = new Buffer(data.profile_image
            .replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');

        fs.writeFile(image_name, buff, function (err) {
            console.log('done');
        });
      }
      


      Users.updateUserDetail(data, function(err, data){
          if(err) _this.res.status(500).send(err);

          if(data.n==1) {
            return _this.res.status(200).send({message: "User updated successfully","status":"1"});
          } else {

          }

          return _this.res.status(200).send({message: "Data not updated","status":"0"});

      });
    }

    fetchUserByEmail() {
      console.log("inside controller");
      let _this = this;
      let email = this.req.body.email;

      //_this.res.status(200).send({res: 'done'});

      Users.findUser(email, function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            console.log(email+ " already exists");
            return _this.res.status(200).json({message: email+" already exists", status:"0"});
          }

          return _this.res.status(200).send({message: "","status":"1"});

      });
    }



}
