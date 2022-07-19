const { ObjectId } = require("mongodb");

const constant = require("../../utils/constant.js");
// const walletModel = require('../../models/walletModel.js')

const https = require("https");
// const PaytmChecksum = require('./PaytmChecksum');

const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");
const ChapterFavoritesModel = require("../../models/chapterFavoritesModel.js");
const ProgramFavoritesModel = require("../../models/programFavoritesModel.js");
const ChapterSaveModel = require("../../models/chapterSaveModel.js");
const ProgramSaveModel = require("../../models/programSaveModel.js");
const ChapterScheduleSaveMode = require("../../models/chapterScheduleSaveModel.js");

const CategoryModel = require("../../models/categoryModel.js");
const CategoeyProgramModel = require("../../models/categoeyProgramModel.js");
const ChapterModel = require("../../models/chapterModel.js");

const AuthorModel = require("../../models/authorModel.js");
const FilterModel = require("../../models/filterModel.js");



const DatabaseHelper = require('../../utils/databaseHelper.js');
const { body, check, oneOf, validationResult } = require("express-validator");

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};
const request = require("request");
module.exports = {


  searchList: async (req, res) => {
    try {
 

      await body("searchKey").not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }

      let programs = await CategoeyProgramModel.find({title: { $regex :new RegExp(req.body.searchKey,"i")}})
      let chapters = await ChapterModel.find({title:{ $regex :new RegExp(req.body.searchKey,"i")}})
      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `Data found successfully`,
        { programs: programs, chapters: chapters,totalLength:programs.length+chapters.length }
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

  filterList: async (req, res) => {
    let user = req.query.tokenUser;
    let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
    console.log(userId);
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

    var mathCondition = {};

    var mathConditionPro = {};

    if (req.body.fromTime) {
      mathCondition.duration ={ $gte:req.body.fromTime } ;
    }
    if (req.body.toTime) {
      mathCondition.duration ={ $lte:req.body.toTime } ;
    }
    if (req.body.authorTitle && req.body.authorTitle.length) {
      if(req.body.authorTitle[0]!='All'){
        mathCondition.authorTitle =  { $in:req.body.authorTitle } ;
        mathConditionPro.authorTitle =  { $in:req.body.authorTitle } ;
      }
      
    }
    if (req.body.difficulty && req.body.difficulty.length) {
      if(req.body.difficulty[0]!='All'){

        mathCondition.difficulty =  { $in:req.body.difficulty } ;
      }
    }

    if (req.body.trainer && req.body.trainer.length) {
      if(req.body.trainer[0]!='All'){
        mathCondition.trainer =  { $in:req.body.trainer } ;
      }
     
    }
    if (req.body.goal && req.body.goal.length) {
      if(req.body.goal[0]!='All'){
        mathCondition.goal =  { $in:req.body.goal } ;
      }
      
    }
    if (req.body.music && req.body.music.length) {
      if(req.body.music[0]!='All'){
        mathCondition.music =  { $in:req.body.music } ;
      }
      
    }
    let aggregate = await ChapterModel.aggregate([
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
    let programs = await CategoeyProgramModel.aggregate([
        {
          $match: mathConditionPro,
        },
      ])
    return response.responseHandlerWithData(
      res,
      200,
      "Video Details Find successfully",
      { programs: programs, chapters: aggregate, totalLength:programs.length+aggregate.length }
    );
  }
 

};
