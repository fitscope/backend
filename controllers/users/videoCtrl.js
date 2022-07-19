const { ObjectId } = require("mongodb");

const constant = require("../../utils/constant.js");

const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");
const ChapterModel = require("../../models/chapterModel.js");

const ChapterCommentModel = require("../../models/chapterCommentModel.js");
const ChapterCommentReplyModel = require("../../models/chapterCommentReplyModel.js");


const { body, check, oneOf, validationResult } = require("express-validator");
const { read } = require("fs");
const request = require("request");
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};
module.exports = {
  //=============================================state list=====================================//

  findVideoDetails: async (req, res) => {
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

    let data = await ChapterModel.aggregate([
      {
        $match: {
          id: Number(req.body.videoId),
        },
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
          from: "chaptersaddones",
          localField: "id",
          foreignField: "chapterId",
          as: "addOne",
        },
      },

      {
        $lookup: {
          from: "chapterfavorites",
          let: {
            chapterId: "$id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$chapterId", Number(req.body.videoId)] },
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
        $lookup: {
          from: "chaptersaves",
          let: {
            chapterId: "$id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$chapterId", Number(req.body.videoId)] },
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
        $lookup: {
          from: "chapterschedulesaves",
          let: {
            chapterId: "$id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$chapterId", Number(req.body.videoId)] },
                    { $eq: ["$userId", Number(userId)] },
                    { $eq: ["$type",'Schedule'] },
                  ],
                },
              },
            },
          ],
          as: "scheChapter",
        },
      },
      {
        $lookup: {
          from: "chapterschedulesaves",
          let: {
            chapterId: "$id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$chapterId", Number(req.body.videoId)] },
                    { $eq: ["$userId", Number(userId)] },
                    { $eq: ["$type",'Complete'] },
                  ],
                },
              },
            },
          ],
          as: "complChapter",
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
          path: "$favChapter",
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
        $unwind: {
          path: "$complChapter",
          preserveNullAndEmptyArrays: true,
        },
      },


      {
        $unwind: {
          path: "$scheChapter",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$addOne",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          trainer: 1,
          difficulty:1,
          goal: 1,
          music:1,
          lastsyncTime: 1,
          id: 1,
          type: 1,
          details_url: 1,
          enroll_image: 1,
          preview_image: 1,
          has_access: 1,
          available_at: 1,
          title: 1,
          duration: 1,
          categoryId: 1,
          categoryIdMongo: 1,
          categoryTitle: 1,
          programId: 1,
          programTitle: 1,
          programIdMongo: 1,
          searchKey: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          programs: 1,
          shortDescription:1,
          longDescription:1,
          authorDescription:1,
          videoDetails: 1,
          // "favChapter":1,
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

          isSchedule: {
            $cond: {
              if: {
                $and: [
                  {
                    $eq: ["$scheChapter.userId", Number(userId)],
                  },
                ],
              },
              then: true,
              else: false,
            },
          },

          isComplete: {
            $cond: {
              if: {
                $and: [
                  {
                    $eq: ["$complChapter.userId", Number(userId)],
                  },
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },

      { $sort: { _id: 1 } },
    ]);

    let checkMobile = data.length > 0 ? data[0] : null;
    if (!checkMobile) {
      response.log("Please check details");
      return response.responseHandlerWithMessage(
        res,
        statusCode.RESULTNOTFOUND,
        "Please check details"
      );
    }

    const options = {
      url: `https://www.uscreen.io/api/v1/chapters/videos/${req.body.videoId}`,
      headers: {
        "Content-Type": "application/json",
        "X-Store-Token": "+/0ykksCgV8f2w==",
        authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg0MzA4MDgsInN1YiI6MzAyNjQ0OX0.l2pY3YqMKWya8BbswFX_M_dwicFVbkbixwxzugV7qUY",
      },
    };

    request(options, async (error, responseReq, body) => {
      if (!error && responseReq.statusCode == 200) {
        console.log(body); // Show the HTML for the Google homepage.

        let dataValue = JSON.parse(body);

        checkMobile.videoDetails = dataValue;

        return response.responseHandlerWithData(
          res,
          200,
          "Video Details Find successfully",
          checkMobile
        );
      } else {
        return response.responseHandlerWithData(
          res,
          200,
          "Video Details Find successfully",
          checkMobile
        );
      }
    });
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
        user:user.user
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

      
      await body('chapterId').not().isEmpty().run(req);
      await body('comment').not().isEmpty().run(req);
      await body('commentId').not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }

      let reqData = {
        userId: userId,
        chapterId: req.body.chapterId,
        comment: req.body.comment,
        commentId: req.body.commentId,
        user:user.user
      }

      let commentCreate = new ChapterCommentReplyModel(reqData)
      let commentSave = await commentCreate.save()

      response.log("comment save", commentSave)
      return response.responseHandlerWithData(res, statusCode.SUCCESS, `comment save successfully`, commentSave);
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },

  getCommentList: async (req, res) => {
    try {
      await body('chapterId').not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }
      let query = []


      query.push({
        chapterId: Number(req.body.chapterId)
      })
      let checkMobile = await ChapterCommentModel.aggregate([
        {
          $match: { $and: query }
        },
        {
          $lookup: {
            from: "chaptercommentreplies",
            localField: "_id",
            foreignField: "commentId",
            as: "replies"
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "user.id",
            as: "userDetails"
          },
        },
        
      
        {
          $sort:{
            // "replies.createdAt":-1,
             createdAt:-1
          }
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
