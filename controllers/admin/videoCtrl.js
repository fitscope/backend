const { ObjectId } = require("mongodb");

const constant = require("../../utils/constant.js");

const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");
const ChapterModel = require("../../models/chapterModel.js");
const ChapterAddOnesModel = require("../../models/chapterAddOnesModel.js");

const ChapterCommentModel = require("../../models/chapterCommentModel.js");
const ChapterCommentReplyModel = require("../../models/chapterCommentReplyModel.js");

const AuthorModel = require("../../models/authorModel.js");
const FilterModel = require("../../models/filterModel.js");

const { body, check, oneOf, validationResult } = require("express-validator");
var escapere = require('escape-regexp');

const { read } = require("fs");
const request = require("request");
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};
module.exports = {
  //=============================================state list=====================================//

  findVideoList: async (req, res) => {
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
      mathCondition.categoryTitle ={ $regex : new RegExp(req.body.categoryName.trim(), "i") } ;
    }

    if (req.body.collectionName) {
      mathCondition.programTitle ={ "$regex": escapere(req.body.collectionName.trim()), "$options": "i" }// /req.body.collectionName.trim()/i//{ $regex : new RegExp(req.body.collectionName.trim(), "i") } ;
    }

    if (req.body.title) {
      mathCondition.title ={ "$regex": escapere(req.body.title.trim()), "$options": "i" }//{ $regex : new RegExp(req.body.title.trim(), "i") } ;
      // mathCondition.title=mathCondition.title.toString()
    }


    if (req.body.trainer) {
      mathCondition.trainer =  { $regex : new RegExp(req.body.trainer.trim(), "i") } ;
    }
    if (req.body.difficulty) {
      mathCondition.difficulty ={ $regex : new RegExp(req.body.difficulty.trim(), "i") }  ;
    }

    if (req.body.goal) {
      mathCondition.goal = { $regex : new RegExp(req.body.goal.trim(), "i") } ;
    }
    if (req.body.music) {
      mathCondition.music = req.body.music.trim();
    }


    console.log(mathCondition)
    let aggregate = ChapterModel.aggregate([
      {
        $match: mathCondition,
      },
      {
        $lookup: {
          from: "categoriesprograms",
          localField: "programId",
          foreignField: "id",
          as: "programs",
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "id",
          as: "category",
        },
      },

      {
        $unwind: {
          path: "$programs",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $sort: { _id: 1 } },
    ]);
    let options = { page: req.body.page, limit: 15 };

    let data = await ChapterModel.aggregatePaginate(aggregate, options);

    return response.responseHandlerWithData(
      res,
      200,
      "Video Details Find successfully",
      data
    );
  },

  updateVideo: async (req, res) => {
    let user = req.query.tokenUser;
    let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
    console.log(userId);

    await body("videoId").not().isEmpty().run(req);
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(
        res,
        statusCode.DATAMISSING,
        "Please check your request",
        errors.array()
      );
    }

    let extistinng = await ChapterAddOnesModel.findOne({
      chapterId: req.body.chapterId,
    });

    let dataupdate;
    let data = await ChapterModel.findByIdAndUpdate(
      { _id: req.body.videoId },
      {
        $set: req.body,
      }
    );
    if (extistinng) {
      dataupdate = await ChapterAddOnesModel.findByIdAndUpdate(
        { chapterId: req.body.chapterId },
        {
          $set: req.body,
        }
      );
    } else {
      dataupdate = await ChapterAddOnesModel.create();
    }

    return response.responseHandlerWithData(
      res,
      200,
      "Video Details updated successfully",
      data
    );
  },

  addCommments: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      console.log(userId);
      if (!userId) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Please send userid in header"
        );
      }

      await body("chapterId").not().isEmpty().run(req);
      await body("comment").not().isEmpty().run(req);

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
        userId: userId,
        chapterId: req.body.chapterId,
        comment: req.body.comment,
        user: user.user,
      };

      let commentCreate = new ChapterCommentModel(reqData);
      let commentSave = await commentCreate.save();

      response.log("comment save", commentSave);
      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `comment save successfully`,
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

  addCommmentReply: async (req, res) => {
    try {


      await body("chapterId").not().isEmpty().run(req);
      await body("comment").not().isEmpty().run(req);
      await body("commentId").not().isEmpty().run(req);
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
        userId: -1,
        chapterId: req.body.chapterId,
        comment: req.body.comment,
        commentId: req.body.commentId,
        user: {name:"FITSCOPE"},
      };

      let commentCreate = new ChapterCommentReplyModel(reqData);
      let commentSave = await commentCreate.save();

      response.log("comment save", commentSave);
      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `comment save successfully`,
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

  getCommentList: async (req, res) => {
    try {
      // await body("chapterId").not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
      let query = [];

      // query.push({
      //   chapterId: Number(req.body.chapterId),
      // });
      let checkMobile = await ChapterCommentModel.aggregate([
        // {
        //   $match: { $and: query },
        // },
        {
          $lookup: {
            from: "chapters",
            localField: "chapterId",
            foreignField: "id",
            as: "chapter",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "user.id",
            as: "userDetails",
          },
        },
        {
          $unwind: {
            path: "$userDetails",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $unwind: {
            path: "$chapter",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            // "replies.createdAt":-1,
            createdAt: -1,
          },
        },
      ]);

      if (checkMobile && checkMobile.length > 0) {
        return response.responseHandlerWithData(
          res,
          statusCode.SUCCESS,
          `Data found successfully`,
          checkMobile
        );
      }
      return response.responseHandlerWithMessage(
        res,
        statusCode.INVALIDREQUEST,
        "No data found"
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

  getCommentDetails: async (req, res) => {
    try {
      await body("commentId").not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
      let query = [];
      let checkMobile = await ChapterCommentModel.aggregate([
        {
          $match:{
             _id:ObjectId(req.body.commentId)
          }
        },
        {
          $lookup: {
            from: "chapters",
            localField: "chapterId",
            foreignField: "id",
            as: "chapter",
          },
        },
        {
          $lookup: {
            from: "chaptercommentreplies",
            localField: "_id",
            foreignField: "commentId",
            as: "replyoncomment",
          },
        },
        {
          $unwind: {
            path: "$chapter",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            // "replies.createdAt":-1,
            createdAt: -1,
          },
        },
      ]);

      
        return response.responseHandlerWithData(
          res,
          statusCode.SUCCESS,
          `Data found successfully`,
          checkMobile
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

  deletedVideo: async (req, res) => {
    let user = req.query.tokenUser;
    let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
    console.log(userId);

    await body("videoId").not().isEmpty().run(req);
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(
        res,
        statusCode.DATAMISSING,
        "Please check your request",
        errors.array()
      );
    }

    let data = await ChapterModel.remove({ _id: req.body.videoId });

    return response.responseHandlerWithData(
      res,
      200,
      "Video deleted  successfully",
      data
    );
  },


  deletedComment: async (req, res) => {
    let user = req.query.tokenUser;
    let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
    console.log(userId);

    await body("commentId").not().isEmpty().run(req);
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(
        res,
        statusCode.DATAMISSING,
        "Please check your request",
        errors.array()
      );
    }

    let data = await ChapterCommentModel.remove({ _id: req.body.commentId });

    return response.responseHandlerWithData(
      res,
      200,
      "Comment deleted  successfully",
      data
    );
  },

  getFileterParameters: async (req,res)=>{
    try {
   
      let author= await AuthorModel.find()
      let filter= await FilterModel.find()

      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `Data found successfully`,
        { author: author, filter: filter }
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
