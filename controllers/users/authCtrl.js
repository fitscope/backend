const { ObjectId } = require("mongodb");

const constant = require("../../utils/constant.js");
// const walletModel = require('../../models/walletModel.js')

const https = require("https");
// const PaytmChecksum = require('./PaytmChecksum');

const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");

const CategoryModel = require("../../models/categoryModel.js");
const CategoeyProgramModel = require("../../models/categoeyProgramModel.js");
const ChapterModel = require("../../models/chapterModel.js");
const UsersModel = require("../../models/usersModel.js");

const userTokenModel = require("../../models/userTokenModel.js");

const { body, check, oneOf, validationResult } = require("express-validator");
const { read } = require("fs");
const request = require("request");
const axios = require("axios").default;
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};

module.exports = {
  //=============================================state list=====================================//
  userLogin: async (req, res) => {
    try {
      await body("email").not().isEmpty().run(req);
      await body("password").not().isEmpty().run(req);

      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
      axios({
        method: "post",
        url: "https://www.uscreen.io/api/v1/sessions",
        data: {
          email: req.body.email,
          password: req.body.password,
        },

        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w==",
        },
      }).then(
        async (responsee) => {
          console.log(responsee);
          let data = responsee.data;

          if(req.body.fcmToken){
            data.fcmToken=req.body.fcmToken
            let mongoUserToken = await userTokenModel.findOne();
            let token=[]
            if(mongoUserToken){
              token=mongoUserToken.token

              if(token.indexOf(req.body.fcmToken)==-1){
                token.push(req.body.fcmToken)
                let result = await userTokenModel.findByIdAndUpdate(
                  { _id: mongoUserToken._id },
                  { $set: {token:token} },
                  { new: true, lean: true }
                );
              }

            }else{
              token.push(req.body.fcmToken)
              let mongoUserTokenCreate = await userTokenModel.create({
                token:token
              });
            }

          }

          if(req.body.deviceType){
            data.deviceType=req.body.deviceType
          }
          let mongoUser = await UsersModel.findOne({
            "user.email": data.user.email,
            "user.id": data.user.id,
          });

          



          if (mongoUser) {
            let updateToken = await UsersModel.findByIdAndUpdate(
              { _id: mongoUser._id },
              { $set: data },
              { new: true, lean: true }
            );

            return response.responseHandlerWithData(
              res,
              200,
              "Login Successfully",
              updateToken
            );
          } else {
            let createuser = await UsersModel.create(data);
            return response.responseHandlerWithData(
              res,
              200,
              "Login Successfully",
              createuser
            );
          }
        },
        (error) => {
          console.log(error)
          return response.responseHandlerWithMessage(
            res,
            statusCode.ERROR,
            "Internal server error"
          );
        }
      );
    } catch (error) {
      response.log("Error is============>", error);
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Internal server error"
      );
    }
  },

  userSignup: async (req, res) => {
    try {
      await body("email").not().isEmpty().run(req);
      await body("password").not().isEmpty().run(req);
      await body("name").not().isEmpty().run(req);

      console.log(JSON.stringify(req.body))
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }

      let reqData = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      };

      if(req.body.field_1){
        reqData.field_1=req.body.field_1
      }
      if(req.body.field_2){
        reqData.field_2=req.body.field_2
      }
      if(req.body.field_3){
        reqData.field_3=req.body.field_3
      }

      axios({
        method: "post",
        url: "https://www.uscreen.io/api/v1//registrations",
        data: reqData,

        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w==",
        },
      }).then(
        async (responsee) => {
          // console.log(responsee);
          let data = responsee.data;
          if(req.body.fcmToken){
            data.fcmToken=req.body.fcmToken
          } 
          let mongoUser = await UsersModel.findOne({
            "user.email": data.user.email,
            "user.id": data.user.id,
          });

          if (mongoUser) {
            let updateToken = await UsersModel.findByIdAndUpdate(
              { _id: mongoUser._id },
              { $set: data },
              { new: true, lean: true }
            );

            return response.responseHandlerWithData(
              res,
              200,
              "Login Successfully",
              updateToken
            );
          } else {
            let createuser = await UsersModel.create(data);
            return response.responseHandlerWithData(
              res,
              200,
              "Login Successfully",
              createuser
            );
          }
        },
        (error) => {
          console.log('eeror start')
          console.log(error)
          console.log(error?.response?.data?.message)
          // let data= JSON.stringify(error)
          // let datavalue=JSON.parse(data)
          let {data}=error
          return response.responseHandlerWithMessage(
            res,
            statusCode.ERROR,
            error && error.response &&  error.response.data && error.response.data.message ? error.response.data.message:'Error occured from usescreen'
          );
        }
      );
    } catch (error) {
      response.log("Error is============>", error);
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Internal server error"
      );
    }
  },
};
