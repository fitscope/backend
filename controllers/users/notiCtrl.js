const { ObjectId } = require("mongodb");

const constant = require("../../utils/constant.js");
// const walletModel = require('../../models/walletModel.js')

const https = require("https");
// const PaytmChecksum = require('./PaytmChecksum');

const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");

const NotificationModel = require("../../models/notificationModel.js");


const DatabaseHelper = require('../../utils/databaseHelper.js');
const { body, check, oneOf, validationResult } = require("express-validator");

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};
const request = require("request");
module.exports = {
    //=============================================state list=====================================//
  
    notificationList: async (req, res) => {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      console.log(userId);
  
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
  
      var mathCondition = {};
  
      if (req.body.categoryName) {
        mathCondition.categoryTitle ={ $regex : new RegExp(req.body.categoryName, "i") } ;
      }
      if (req.body.trainer) {
        mathCondition.trainer =  { $regex : new RegExp(req.body.trainer, "i") } ;
      }
      if (req.body.difficulty) {
        mathCondition.difficulty ={ $regex : new RegExp(req.body.difficulty, "i") }  ;
      }
  
      if (req.body.goal) {
        mathCondition.goal = { $regex : new RegExp(req.body.goal, "i") } ;
      }
      if (req.body.music) {
        mathCondition.music = req.body.music;
      }
  
      let aggregate = NotificationModel.aggregate([
        {
          $match: mathCondition,
        },
        { $sort: { _id: -1 } },
      ]);
      let options = { page: req.body.page, limit: 10 };
  
      let data = await NotificationModel.aggregatePaginate(aggregate, options);
  
      return response.responseHandlerWithData(
        res,
        200,
        "Notification List Find successfully",
        data
      );
    },
  
 
  };