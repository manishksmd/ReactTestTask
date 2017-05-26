import express from 'express';
import User from '../index';
import Auth from '../authentication';

var passport = require('passport');
const userRoutes = express.Router();

/*Route for LIST Category*/
userRoutes.post('/add', (req, res, next) => {
  console.log("inside routes");
  	let usersCtrl = new User(req, res, next);

    usersCtrl.checkEmailExists();

}, function(req, res){
  let usersCtrl = new User(req, res);
  usersCtrl.insertUser();
});


userRoutes.get('/', (req, res, next) => {
  console.log("inside USER FETCH ROUTE");
  let usersCtrl = new User(req, res, next);

  usersCtrl.fetchUsers();
});

// userRoutes.post('/login', (req, res) => {
//   console.log("inside USER login Route");
//   let usersCtrl = new User(req, res);
//
//   usersCtrl.loginUser();
// });


userRoutes.post('/login', Auth.login, (req, res) => {
  console.log("inside after next function");

  let usersCtrl = new User(req, res);
  usersCtrl.fetchUsers();
});

userRoutes.delete('/:id', (req, res, next) => {
    console.log("inside delete user routes");
  	let usersCtrl = new User(req, res, next);
    usersCtrl.deleteUser();

});

userRoutes.get('/:id', (req, res, next) => {
    console.log("inside fetch user record routes");
    let usersCtrl = new User(req, res, next);
    usersCtrl.fetchUser();

});


userRoutes.put('/update', (req, res, next) => {
    console.log("inside update user routes");
    let usersCtrl = new User(req, res, next);
    usersCtrl.updateUser();

});

userRoutes.post('/getUser', (req, res, next) => {
  let usersCtrl = new User(req, res, next);
  usersCtrl.fetchUserByEmail();
});

export default userRoutes;
