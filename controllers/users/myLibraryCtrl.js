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

const DatabaseHelper = require('../../utils/databaseHelper.js');
const { body, check, oneOf, validationResult } = require("express-validator");

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};
module.exports = {

  addToFavChapter: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      if (!userId) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Please send userid in header"
        );
      }
      await body("chapterId").not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
      const chapterone = await ChapterFavoritesModel.findOne({
        userId: userId,
        chapterId: req.body.chapterId,
      });

      if (chapterone) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Already add in Favorites"
        );
      }
      let reqData = {
        userId: userId,
        chapterId: req.body.chapterId,
      };

      let commentCreate = new ChapterFavoritesModel(reqData);
      let commentSave = await commentCreate.save();
      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `Added to Favorites`,
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
  removeChapterFromFav: async (req, res) => {
    let user = req.query.tokenUser;
    let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
    if (!userId) {
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Please send userid in header"
      );
    }
    await body("chapterId").not().isEmpty().run(req);
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(
        res,
        statusCode.DATAMISSING,
        "Please check your request",
        errors.array()
      );
    }
    const chapterone = await ChapterFavoritesModel.remove({
      userId: userId,
      chapterId: req.body.chapterId,
    });

    return response.responseHandlerWithData(
      res,
      statusCode.SUCCESS,
      `Removed from Favorites`,
      chapterone
    );
  },

  addToSaveChapter: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      if (!userId) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Please send userid in header"
        );
      }
      await body("chapterId").not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
      const chapterone = await ChapterSaveModel.findOne({
        userId: userId,
        chapterId: req.body.chapterId,
      });

      if (chapterone) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Already add in My List"
        );
      }
      let reqData = {
        userId: userId,
        chapterId: req.body.chapterId,
      };

      let commentCreate = new ChapterSaveModel(reqData);
      let commentSave = await commentCreate.save();
      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `Added to My List`,
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
  removeChapterFromSave: async (req, res) => {
    let user = req.query.tokenUser;
    let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
    if (!userId) {
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Please send userid in header"
      );
    }
    await body("chapterId").not().isEmpty().run(req);
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(
        res,
        statusCode.DATAMISSING,
        "Please check your request",
        errors.array()
      );
    }
    const chapterone = await ChapterSaveModel.remove({
      userId: userId,
      chapterId: req.body.chapterId,
    });

    return response.responseHandlerWithData(
      res,
      statusCode.SUCCESS,
      `Removed from My List`,
      chapterone
    );
  },

  addToScheduleCompleteChapter: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      if (!userId) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Please send userid in header"
        );
      }
      await body("chapterId").not().isEmpty().run(req);

      await body("date").not().isEmpty().run(req);
      await body("time").not().isEmpty().run(req);
      await body("timeInMint").not().isEmpty().run(req);
      await body("type").not().isEmpty().run(req);

      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
      // const chapterone = await saveChapterModel.findOne({

      let reqData = {
        userId: userId,
        chapterId: req.body.chapterId,
        date: req.body.date,
        time: req.body.time,
        timeInMint: req.body.timeInMint,
        type: req.body.type,
        dateValue: req.body.date,
      };

      let commentCreate = new ChapterScheduleSaveMode(reqData);
      let commentSave = await commentCreate.save();

      response.log("comment save", commentSave);
      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `schedule save successfully`,
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


  updateToScheduleCompleteChapter: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      if (!userId) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Please send userid in header"
        );
      }
      await body("scheduleId").not().isEmpty().run(req);
 
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
     
      let reqData = req.body
      if(req.body.date){
        reqData.date=req.body.date
        reqData.dateValue=req.body.date
      }
      let result = await ChapterScheduleSaveMode.findByIdAndUpdate({ _id: req.body.scheduleId }, { $set: reqData }, { new: true, lean: true })
      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `schedule update successfully`,
        result
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


  getScheduleList: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      if (!userId) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Please send userid in header"
        );
      }
   
      let query = []

      query.push({
        userId: userId
      })
      let checkMobile = await ChapterScheduleSaveMode.aggregate([
        {
          $match: { $and: query }
        },
        {
          $lookup: {
            from: "chapters",
            localField: "chapterId",
            foreignField: "id",
            as: "chapterDetails",
          },
        },
        {
          $unwind: {
            path: "$chapterDetails",
            preserveNullAndEmptyArrays: false,
          },
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

  removeFromSchedule: async (req, res) => {
    let user = req.query.tokenUser;
    let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
    if (!userId) {
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Please send userid in header"
      );
    }
    await body("scheduleId").not().isEmpty().run(req);
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(
        res,
        statusCode.DATAMISSING,
        "Please check your request",
        errors.array()
      );
    }
    const chapterone = await ChapterScheduleSaveMode.remove({
      userId: userId,
      _id: req.body.scheduleId,
    });

    return response.responseHandlerWithData(
      res,
      statusCode.SUCCESS,
      `Removed from List`,
      chapterone
    );
  },

  addToFavProgram: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      if (!userId) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Please send userid in header"
        );
      }
      // await body("programId").not().isEmpty().run(req);

      let reqest = {
        userId: userId,
      };

      if (req.body.categoryId) {
        reqest.categoryId = req.body.categoryId;
      }
      if (req.body.programId) {
        reqest.programId = req.body.programId;
      }
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
      const chapterone = await ProgramFavoritesModel.findOne(reqest);

      if (chapterone) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Already add in Favorites"
        );
      }

      let commentCreate = new ProgramFavoritesModel(reqest);
      let commentSave = await commentCreate.save();
      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `Added to Favorites`,
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
  removeProgramFromFav: async (req, res) => {
    let user = req.query.tokenUser;
    let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
    if (!userId) {
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Please send userid in header"
      );
    }
    // await body("programId").not().isEmpty().run(req);
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(
        res,
        statusCode.DATAMISSING,
        "Please check your request",
        errors.array()
      );
    }

    let reqest = {
      userId: userId,
    };

    if (req.body.categoryId) {
      reqest.categoryId = req.body.categoryId;
    }
    if (req.body.programId) {
      reqest.programId = req.body.programId;
    }
    const chapterone = await ProgramFavoritesModel.remove(reqest);

    return response.responseHandlerWithData(
      res,
      statusCode.SUCCESS,
      `Removed from Favorites`,
      chapterone
    );
  },

  addToSaveProgram: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      if (!userId) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Please send userid in header"
        );
      }
      // await body("programId").not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }

      let reqest = {
        userId: userId,
      };

      if (req.body.categoryId) {
        reqest.categoryId = req.body.categoryId;
      }
      if (req.body.programId) {
        reqest.programId = req.body.programId;
      }
      const chapterone = await ProgramSaveModel.findOne(reqest);

      if (chapterone) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Already add in My List"
        );
      }

      let commentCreate = new ProgramSaveModel(reqest);
      let commentSave = await commentCreate.save();
      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `Added to My List`,
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
  removeProgramsFromSave: async (req, res) => {
    let user = req.query.tokenUser;
    let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
    if (!userId) {
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Please send userid in header"
      );
    }
    // await body("programId").not().isEmpty().run(req);

    let reqest = {
      userId: userId,
    };

    if (req.body.categoryId) {
      reqest.categoryId = req.body.categoryId;
    }
    if (req.body.programId) {
      reqest.programId = req.body.programId;
    }
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(
        res,
        statusCode.DATAMISSING,
        "Please check your request",
        errors.array()
      );
    }
    const chapterone = await ProgramSaveModel.remove(reqest);

    return response.responseHandlerWithData(
      res,
      statusCode.SUCCESS,
      `Removed from My List`,
      chapterone
    );
  },

  getFavList: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      if (!userId) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Please send userid in header"
        );
      }
      let query = [];
      query.push({
        userId: userId,
      });
      let favPrograms = await ProgramFavoritesModel.aggregate([
        {
          $match: { $and: query },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "id",
            as: "categoryDetails",
          },
        },
        {
          $lookup: {
            from: "categoriesprograms",
            localField: "programId",
            foreignField: "id",
            as: "programDetails",
          },
        },
        {
          $lookup: {
            from: "chaptersaves",
            let: {
              programId: "$programId",
              categoryId: "$categoryId",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $or: [
                          { $eq: ["$programId", "$$programId"] },
                          { $eq: ["$categoryId", "$$categoryId"] },
                        ],
                      },
                      {
                        $eq: ["$userId", Number(userId)],
                      },
                    ],
                  },
                },
              },
            ],
            as: "saveProgram",
          },
        },
        {
          $unwind: {
            path: "$saveProgram",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$categoryDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$programDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
             "isFav": true
          }
       },
        {
          $project: {
            _id: 1,
            userId: 1,
            programId: 1,
            categoryId:1,
            createdAt: 1,
            updatedAt: 1,
            programDetails: 1,
            categoryDetails:1,
            isFav:1,
            isSave: {
              $cond: {
                if: {
                  $and: [
                    {
                      $eq: ["$saveProgram.userId", Number(userId)],
                    },
                  ],
                },
                then: true,
                else: false,
              },
            },
          },
        },
      ]);

      let favChapters = await ChapterFavoritesModel.aggregate([
        {
          $match: { $and: query },
        },
        {
          $lookup: {
            from: "chapters",
            localField: "chapterId",
            foreignField: "id",
            as: "chapterDetails",
          },
        },
        {
          $lookup: {
            from: "chaptersaves",
            let: {
              chapterId: "$chapterId",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$chapterId", "$$chapterId"] },
                      { $eq: ["$userId", Number(userId)] },
                    ],
                  },
                },
              },
            ],
            as: "saveChapter",
          },
        },
        {
          $addFields: {
             "isFav": true
          }
       },
        {
          $unwind: {
            path: "$chapterDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$saveChapter",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            chapterId: 1,
            createdAt: 1,
            updatedAt: 1,
            chapterDetails: 1,
            isFav:1,
            isSave: {
              $cond: {
                if: {
                  $and: [
                    {
                      $eq: ["$saveChapter.userId", Number(userId)],
                    },
                  ],
                },
                then: true,
                else: false,
              },
            },
          },
        },
      ]);

      let data =JSON.stringify(favPrograms)
      let jsonData=JSON.parse(data)
      let uniqueChars = jsonData.filter((c, index) => {
        return jsonData.indexOf(c) === index;
    });

    let datavalue=[]
    for (let index = 0; index < uniqueChars.length; index++) {
      const element = uniqueChars[index];
      let indexvalue=datavalue.map(it=>{return it._id}).indexOf(element._id)
      if(indexvalue==-1){
        datavalue.push(element)
      }
      
    }
      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `Data found successfully`,
        { favPrograms: [...new Set(datavalue)], favChapters: favChapters }
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

  getSaveList: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      if (!userId) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Please send userid in header"
        );
      }
      let query = [];
      query.push({
        userId: userId,
      });
      let savePrograms = await ProgramSaveModel.aggregate([
        {
          $match: { $and: query },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "id",
            as: "categoryDetails",
          },
        },
        {
          $lookup: {
            from: "categoriesprograms",
            localField: "programId",
            foreignField: "id",
            as: "programDetails",
          },
        },
        {
          $lookup: {
            from: "programsfavorites",
            let: {
              programId: "$programId",
              categoryId: "$categoryId",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $or: [
                          { $eq: ["$programId", "$$programId"] },
                          { $eq: ["$categoryId", "$$categoryId"] },
                        ],
                      },
                      {
                        $eq: ["$userId", Number(userId)],
                      },
                    ],
                  },
                },
              },
            ],
            as: "favProgram",
          },
        },
        {
          $addFields: {
             "isSave": true
          }
       },
        {
          $unwind: {
            path: "$favProgram",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$categoryDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$programDetails",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            _id: 1,
            userId: 1,
            programId: 1,
            categoryId:1,
            createdAt: 1,
            updatedAt: 1,
            programDetails: 1,
            categoryDetails:1,
            isSave:1,
            isFav: {
              $cond: {
                if: {
                  $and: [
                    {
                      $eq: ["$favProgram.userId", Number(userId)],
                    },
                  ],
                },
                then: true,
                else: false,
              },
            },
          },
        },
      ]);



      let saveChapters = await ChapterSaveModel.aggregate([
        {
          $match: { $and: query },
        },
        {
          $lookup: {
            from: "chapters",
            localField: "chapterId",
            foreignField: "id",
            as: "chapterDetails",
          },
        },
        {
          $lookup: {
            from: "chapterfavorites",
            let: {
              chapterId: "$chapterId",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$chapterId", "$$chapterId"] },
                      { $eq: ["$userId", Number(userId)] },
                    ],
                  },
                },
              },
            ],
            as: "favChapter",
          },
        },
        {
          $addFields: {
             "isSave": true
          }
       },
        {
          $unwind: {
            path: "$favChapter",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$chapterDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            chapterId: 1,
            createdAt: 1,
            updatedAt: 1,
            chapterDetails: 1,
            isSave:1,
            isFav: {
              $cond: {
                if: {
                  $and: [
                    {
                      $eq: ["$favChapter.userId", Number(userId)],
                    },
                  ],
                },
                then: true,
                else: false,
              },
            },
          },
        },
      ]);

      let data =JSON.stringify(savePrograms)
      let jsonData=JSON.parse(data)
      let uniqueChars = jsonData.filter((c, index) => {
        return jsonData.indexOf(c) === index;
    });

    let datavalue=[]
    for (let index = 0; index < uniqueChars.length; index++) {
      const element = uniqueChars[index];
      let indexvalue=datavalue.map(it=>{return it._id}).indexOf(element._id)
      if(indexvalue==-1){
        datavalue.push(element)
      }
      
    }
      return response.responseHandlerWithData(
        res,
        statusCode.SUCCESS,
        `Data found successfully`,
        { savePrograms: datavalue, saveChapters: saveChapters }
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


  getChapterList: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;

      if(req.body.categoryId){
        let category =await CategoryModel.findOne({id:req.body.categoryId})

        const dataValue = await DatabaseHelper.getChapters({
          searchKey: category.title,
          userId: userId,
        });
        return response.responseHandlerWithData(
          res,
          200,
          "Category list find successfully successfully",
          dataValue
        );
      }

      if(req.body.programId){
        let program =await CategoeyProgramModel.findOne({id:req.body.programId})
        const dataValue = await DatabaseHelper.getChapters({
          searchKey: program.title,
          userId: userId,
        });
        return response.responseHandlerWithData(
          res,
          200,
          "Program list find successfully successfully",
          dataValue
        );
      }
     
    } catch (error) {
      response.log("Error is============>", error);
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Internal server error"
      );
    }
  },


  getScheduleUpcomingHistoryList: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;

      // await body("type").not().isEmpty().run(req);

      // const errors = validationResult(req).formatWith(errorFormatter);
      // if (!errors.isEmpty()) {
      //   return response.responseHandlerWithData(
      //     res,
      //     statusCode.DATAMISSING,
      //     "Please check your request",
      //     errors.array()
      //   );
      // }
      if (!userId) {
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Please send userid in header"
        );
      }
   



      let query = []

      query.push({
        userId: userId
      })

      let date = new Date()
      let todayDate = new Date()

      todayDate.setDate(date.getDate() - 1)

      todayDate.setHours(23, 59, 59, 999);
      console.log({ todayDate })


      if(req.body.type=='Upcoming'){
        let localCondition=[]
     

        query.push({
          type: 'Schedule'
        })
        query.push({
          date: { $gte: todayDate }
        })
        // query.push({
        //   $or:localCondition
        // })
      }

      if(req.body.type=='History'){
        let localCondition=[]
        localCondition.push({
          type: 'Complete'
        })
        localCondition.push({
          date: { $lt: todayDate }
        })

        query.push({
          $or:localCondition
        })
      }

      if(req.body.date){
        query.push({
          dateValue: req.body.date
        })
      }
      console.log(JSON.stringify(query))
      let checkMobile = await ChapterScheduleSaveMode.aggregate([
        {
          $match: { $and: query }
        },
        {
          $lookup: {
            from: "chapters",
            localField: "chapterId",
            foreignField: "id",
            as: "chapterDetails",
          },
        },
        {
          $unwind: {
            path: "$chapterDetails",
            preserveNullAndEmptyArrays: false,
          },
        },
      ])

     
         return response.responseHandlerWithData(res, statusCode.SUCCESS, `Data found successfully`, checkMobile);
    
     
    }
    catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },
};
