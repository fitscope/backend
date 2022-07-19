const { ObjectId } = require("mongodb");

const constant = require("../../utils/constant.js");

const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");
const ChapterModel = require("../../models/chapterModel.js");
const ChapterAddOnesModel = require("../../models/chapterAddOnesModel.js");

const ChapterCommentModel = require("../../models/chapterCommentModel.js");
const ChapterCommentReplyModel = require("../../models/chapterCommentReplyModel.js");
const NotificationModel = require("../../models/notificationModel.js");

const userTokenModel = require("../../models/userTokenModel.js");
const SendNotification = require('../../utils/notification.js');

const { body, check, oneOf, validationResult } = require("express-validator");
const { read } = require("fs");
const request = require("request");
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};

module.exports = {
    //=============================================state list=====================================//
  
    findNotification: async (req, res) => {
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
  
  
    addNotification: async (req, res) => {
      try {
        let user = req.query.tokenUser;
        let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
        console.log(userId);
        
        await body("title").not().isEmpty().run(req);
        await body("message").not().isEmpty().run(req);
  
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
            title: req.body.title,
            message: req.body.message,
        };
  
        let commentCreate = new NotificationModel(reqData);
        let commentSave = await commentCreate.save();
  
        let mongoUserToken = await userTokenModel.findOne();
            let token=[]
            if(mongoUserToken){
              token=mongoUserToken.token

              SendNotification.sendNotificationWithFireBase(
                token,
                req.body.title,
                req.body.message,
                'admin',
                reqData,
                (error, sent) => {
                  console.log('Mail send');
                }
              );

            }
        response.log("comment save", commentSave);
        return response.responseHandlerWithData(
          res,
          statusCode.SUCCESS,
          `Notification save successfully`,
          commentSave
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

  
    deletedNotification: async (req, res) => {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      console.log(userId);
  
      await body("notificationId").not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
  
      let data = await NotificationModel.remove({ _id: req.body.notificationId });
  
      return response.responseHandlerWithData(
        res,
        200,
        "Comment deleted  successfully",
        data
      );
    },
  };