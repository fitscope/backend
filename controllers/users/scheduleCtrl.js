const { ObjectId } = require("mongodb");

const constant = require("../../utils/constant.js");

const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");
const ChapterModel = require("../../models/chapterModel.js");


const scheduleChapterModel = require('../../models/scheduleChapterModel.js');

const { body, check, oneOf, validationResult } = require("express-validator");
const { read } = require("fs");
const request = require("request");
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};
module.exports = {
  //=============================================state list=====================================//

  addToScheduleCompleteChapter: async (req, res) => {

    try {
      await body('userId').not().isEmpty().run(req);
      await body('chapterId').not().isEmpty().run(req);
      await body('date').not().isEmpty().run(req);
      await body('time').not().isEmpty().run(req);
      await body('timeInMint').not().isEmpty().run(req);
      await body('type').not().isEmpty().run(req);


      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }

      
        let reqData = {
            userId: req.body.userId,
            chapterId: req.body.chapterId,
            date:req.body.date,
            time:req.body.time,
            timeInMint:req.body.timeInMint,
            type:req.body.type,
            dateValue:req.body.date,

        }

          let commentCreate = new scheduleChapterModel(reqData)
          let commentSave = await commentCreate.save()

          response.log("comment save", commentSave)
          return response.responseHandlerWithData(res, statusCode.SUCCESS, `schedule save successfully`, commentSave);

        
      
    
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },

  getScheduleList: async (req, res) => {
    try {
      await body('userId').not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }
      let query = []


      query.push({
        userId: req.body.userId
      })
      let checkMobile = await scheduleChapterModel.aggregate([
        {
          $match: { $and: query }
        },
      ])

      if (checkMobile && checkMobile.length > 0) {
        return response.responseHandlerWithData(res, statusCode.SUCCESS, `Data found successfully`, checkMobile);
      }
      return response.responseHandlerWithMessage(res, statusCode.INVALIDREQUEST, "No data found");

    }
    catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },
};
