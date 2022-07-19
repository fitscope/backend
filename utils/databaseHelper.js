const { ObjectId } = require("mongodb");

// const constant = require("../../utils/constant.js");
// const walletModel = require('../../models/walletModel.js')

const https = require("https");
// const PaytmChecksum = require('./PaytmChecksum');

// const response = require("../../utils/httpResponseMessage");
// const statusCode = require("../../utils/httpResponseCode");

const CategoryModel = require("../models/categoryModel.js");
const CategoeyProgramModel = require("../models/categoeyProgramModel.js");
const ChapterModel = require("../models/chapterModel.js");

// const CategoryModel = require("../models/categoryModel.js");
// const CategoeyProgramModel = require("../models/categoeyProgramModel.js");
// const ChapterModel = require("../models/chapterModel.js");
const { body, check, oneOf, validationResult } = require("express-validator");

/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};

const mid = "nAnchc36350120301482";
const miKey = "M%JRR1dLs6yP2mNx";

const midTest = "omcPpR86995998468160";
const miKeyTest = "DZV7fZ0WUApY0_1v";
const request = require("request");
exports.getDataWithoutCategory= async (reqValue, callback)=> {
    try {
      const { filterValue, userId } = reqValue;
  
      var dataValue = [];
      for (let index = 0; index < filterValue.length; index++) {
        let element = filterValue[index];
        let data = await ChapterModel.aggregate([
          {
            $match: { searchKey: element.type },
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
            $lookup: {
              from: "programsaves",
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
              path: "$favProgram",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $unwind: {
              path: "$saveProgram",
              preserveNullAndEmptyArrays: true,
            },
          },
  
          {
            $project: {
              _id: 1,
              trainer: 1,
              difficulty: 1,
              goal: 1,
              music: 1,
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
              videoDetails: 1,
              // favProgram:1,
              // "favChapter":1,
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
          {
            $group: {
              _id: "$searchKey",
              categoryId: { $first: "$categoryId" },
              categoryTitle: { $first: "$categoryTitle" },
              programId: { $first: "$programId" },
              programTitle: { $first: "$programTitle" },
              isFav: { $first: "$isFav" },
              isSave: { $first: "$isSave" },
              chapters: { $push: "$$ROOT" },
            },
          },
          { $sort: { _id: 1 } },
          {
            $project: {
              _id: 1,
              categoryId: 1,
              categoryTitle: 1,
              programId: 1,
              programTitle: 1,
              isFav: 1,
              isSave: 1,
              chapters: 1,
            },
          },
        ]);
  
        let dataValueForPush = data.length ? data[0] : null;
        if (dataValueForPush) {
          dataValueForPush.sort = element.sort;
          dataValue.push(dataValueForPush);
        }
  
        if (filterValue.length - 1 == index) {
          return dataValue;
        }
      }
    } catch (error) {
      throw error;
    }
  }


exports.getDataWithCategory=async (reqValue,callback)=>{

    try {
      const { filterValue, userId } = reqValue;
    var dataValue=[]
       for (let index = 0; index < filterValue.length; index++) {
          const element = filterValue[index];
  
          let category = await CategoryModel.findOne({ title: element.category });
          let mainData = [];
          for (let index = 0; index < element.programs.length; index++) {
            const elementProgram = element.programs[index];
       
            let data = await ChapterModel.aggregate([
              {
                $match: {
                  categoryTitle: element.category,
                  programTitle: elementProgram.type,
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
                $lookup: {
                  from: "programsaves",
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
                  path: "$favProgram",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $unwind: {
                  path: "$saveProgram",
                  preserveNullAndEmptyArrays: true,
                },
              },
      
              {
                $project: {
                  _id: 1,
                  trainer: 1,
                  difficulty: 1,
                  goal: 1,
                  music: 1,
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
                  programImage:1,
                  searchKey: 1,
                  createdAt: 1,
                  updatedAt: 1,
                  __v: 1,
                  programs: 1,
                  videoDetails: 1,
                  // favProgram:1,
                  // "favChapter":1,
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
              {
                $group: {
                  _id: "$programTitle",
                  categoryId: { $first: "$categoryId" },
                  categoryTitle: { $first: "$categoryTitle" },
                  programId: { $first: "$programId" },
                  programTitle: { $first: "$programTitle" },
                  programId:{$first:"$programId"},
                  programTitle:{$first:"$programTitle"},
                  programImage:{$first:"$programImage"},
                  isFav: { $first: "$isFav" },
                  isSave: { $first: "$isSave" },
                  chapters: { $push: "$$ROOT" },
                },
              },
              { $sort: { _id: 1 } },
              {
                $project: {
                  _id: 1,
                  categoryId: 1,
                  categoryTitle: 1,
                  programId: 1,
                  programTitle: 1,
                  programImage:1,
                  isFav: 1,
                  isSave: 1,
                  chapters: 1,
                },
              },
            ]);
            let dataValueForPush = data.length ? data[0] : undefined;
        if (dataValueForPush) {
          dataValueForPush.sort = elementProgram.sort;
          mainData.push(dataValueForPush);
        }
  
           
           
          }
  
          dataValue.push({
            category: element.category,
            cateImage: category.image,
            categoryData: mainData,
          });
  
          if (filterValue.length - 1 == index) {
            return dataValue
          }
        }
    } catch (error) {
      throw error;
    }
    
  }

  exports.getChapters= async (reqValue, callback)=> {
    try {
      const { searchKey, userId } = reqValue;
  
      var dataValue = [];
      // for (let index = 0; index < filterValue.length; index++) {
      //   let element = filterValue[index];
        let data = await ChapterModel.aggregate([
          {
            $match: { searchKey:searchKey },
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
            $lookup: {
              from: "programsaves",
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
              path: "$favProgram",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $unwind: {
              path: "$saveProgram",
              preserveNullAndEmptyArrays: true,
            },
          },
  
          {
            $project: {
              _id: 1,
              trainer: 1,
              difficulty: 1,
              goal: 1,
              music: 1,
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
              videoDetails: 1,
              // favProgram:1,
              // "favChapter":1,
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
          {
            $group: {
              _id: "$searchKey",
              categoryId: { $first: "$categoryId" },
              categoryTitle: { $first: "$categoryTitle" },
              programId: { $first: "$programId" },
              programTitle: { $first: "$programTitle" },
              isFav: { $first: "$isFav" },
              isSave: { $first: "$isSave" },
              chapters: { $push: "$$ROOT" },
            },
          },
          { $sort: { _id: 1 } },
          {
            $project: {
              _id: 1,
              categoryId: 1,
              categoryTitle: 1,
              programId: 1,
              programTitle: 1,
              isFav: 1,
              isSave: 1,
              chapters: 1,
            },
          },
        ]);
  
        // let dataValueForPush = data.length ? data[0] : null;
        // if (dataValueForPush) {
        //   dataValueForPush.sort = element.sort;
        //   dataValue.push(dataValueForPush);
        // }
  
        // if (filterValue.length - 1 == index) {
         
        // }
      // }
      console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  }

