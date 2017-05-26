import express from 'express';
import Quote from '../index';

var passport = require('passport');
const quoteRoutes = express.Router();

/*Route for LIST Category*/
quoteRoutes.post('/', (req, res, next) => {
  console.log("inside routes");
  	let quotesCtrl = new Quote(req, res, next);

    quotesCtrl.checkSymbolExists();
    

}, function(req, res){
  let quotesCtrl = new Quote(req, res);
  quotesCtrl.insertSymbol();
});


quoteRoutes.get('/', (req, res, next) => {
  console.log("inside USER FETCH ROUTE");
  let quotesCtrl = new Quote(req, res, next);

  quotesCtrl.fetchQuotes();
});

// // userRoutes.post('/login', (req, res) => {
// //   console.log("inside USER login Route");
// //   let usersCtrl = new User(req, res);
// //
// //   usersCtrl.loginUser();
// // });


// userRoutes.post('/login', Auth.login, (req, res) => {
//   console.log("inside after next function");

//   let usersCtrl = new User(req, res);
//   usersCtrl.fetchUsers();
// });

quoteRoutes.delete('/:id', (req, res, next) => {
    console.log("inside delete quote routes");
  	let quotesCtrl = new Quote(req, res, next);
    quotesCtrl.deleteQuote();

});

// userRoutes.get('/:id', (req, res, next) => {
//     console.log("inside fetch user record routes");
//     let usersCtrl = new User(req, res, next);
//     usersCtrl.fetchUser();

// });


// userRoutes.put('/update', (req, res, next) => {
//     console.log("inside update user routes");
//     let usersCtrl = new User(req, res, next);
//     usersCtrl.updateUser();

// });

// userRoutes.post('/getUser', (req, res, next) => {
//   let usersCtrl = new User(req, res, next);
//   usersCtrl.fetchUserByEmail();
// });

export default quoteRoutes;
