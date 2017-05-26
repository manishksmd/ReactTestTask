import Quotes from './models/quotes.js';
import mongoose from 'mongoose';
import fs from 'fs';
import request  from 'request';


module.exports = class User {
    constructor(req, res, next) {
       this.res = res;
       this.req = req;
       this.next = next;
    }

/*To add new questionnaire category*/
    insertSymbol() {
      console.log("inside controller");
      let _this = this;
      let data = this.req.body;
      console.log(data);
      //_this.res.status(200).send({res: 'done'});

      let symbolDetails = this.getSymbolDetails(data.symbol);


      Quotes.insertQuote(symbolDetails, function(err, data){
          console.log(err);
          if(err) _this.res.status(500).send(err.errmsg);

          return _this.res.status(200).send({message: "Symbol added successfully","status":"1"});
      });
    }

    getSymbolDetails(symbol) {
      console.log("inside getSymbolDetails = ", symbol);
      let url = 'http://momo-activetick.elasticbeanstalk.com/quoteData?symbol='+symbol+'&field=4+10+11';
      request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
      });

      let apiResponse = 'GOOGLE,1,5,1,7,153.4555,10,1,7,153.7111,11,1,7,152.3100,27,1,4,1921232';

      return this.parseResponse(apiResponse);
    }

    parseResponse(apiString) {
      
      var data = apiString.split(',');

      let quoteData = {
        symbol: data[0],
        last: data[5],
        high: data[9],
        low: data[13],
        volume: data[17]
      }
      return quoteData;
    }

    checkSymbolExists() {
      console.log("inside controller");
      let _this = this;
      let symbol = this.req.body.symbol;

      //_this.res.status(200).send({res: 'done'});

      Quotes.findSymbol(symbol, function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            console.log(symbol+ " already exists");
            _this.res.status(200).json({message: symbol+" already exists", status:"0"});
          } else {
            _this.next();
          }

      });
    }

    fetchQuotes() {
      console.log("Insde controller: fetchQuotes()");
      let email = this.req.body.email;

      let _this = this;
      Quotes.findAllQuotes(function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            _this.res.status(200).json({data:data, status:"1",adminLogin:true});
          }

      });

    }

    // loginUser() {
    //   console.log("Insde controller: loginUser()");
    //   let _this = this;
    //   let email = this.req.body.email;
    //   let password = this.req.body.password;

    //   let userObj = {email, password};

    //   Users.authenticateUser(userObj, function(err, data){
    //       if(err) _this.res.status(500).send();

    //       console.log("user data in controller: ", data);

    //       if(data) {
    //         _this.res.status(200).json({data:data, status:"1"});
    //       }

    //   });

    // }

    deleteQuote() {
      let _this = this;
      let quote_id = this.req.params.id;

      Quotes.deleteQuote(quote_id, function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            _this.res.status(200).json(data);
          }
      });
    }

    // fetchUser() {
    //   let _this = this;
    //   let user_id = this.req.params.id;

    //   Users.fetchUserData(user_id, function(err, data){
    //       if(err) _this.res.status(500).send();

    //       if(data) {
    //         _this.res.status(200).json(data);
    //       }
    //   });
    // }


    // updateUser() {
    //   console.log("Insde controller: updateUser()");
    //   let data = this.req.body;
    //   let _this = this;
    //   console.log(data);
    //   if("profile_image" in  data) {
    //     let image_name = __dirname + '/../../public/images/user_images/' + data.id + '.png';
    //     let buff = new Buffer(data.profile_image
    //         .replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');

    //     fs.writeFile(image_name, buff, function (err) {
    //         console.log('done');
    //     });
    //   }
      


    //   Users.updateUserDetail(data, function(err, data){
    //       if(err) _this.res.status(500).send(err);

    //       if(data.n==1) {
    //         return _this.res.status(200).send({message: "User updated successfully","status":"1"});
    //       } else {

    //       }

    //       return _this.res.status(200).send({message: "Data not updated","status":"0"});

    //   });
    // }

    // fetchUserByEmail() {
    //   console.log("inside controller");
    //   let _this = this;
    //   let email = this.req.body.email;

    //   //_this.res.status(200).send({res: 'done'});

    //   Users.findUser(email, function(err, data){
    //       if(err) _this.res.status(500).send();

    //       if(data) {
    //         console.log(email+ " already exists");
    //         return _this.res.status(200).json({message: email+" already exists", status:"0"});
    //       }

    //       return _this.res.status(200).send({message: "","status":"1"});

    //   });
    // }



}
