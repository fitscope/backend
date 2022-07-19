
const { ObjectId } = require('mongodb');

const fitCategoriesModel = require('../../models/fitCategoryModel.js')
const fitCategoryDetailsModel = require('../../models/fitCategoryDetailsModel.js')
const fitProgramModel = require('../../models/fitProgramModel.js')
// const walletModel = require('../../models/walletModel.js')


const https = require('https');
// const PaytmChecksum = require('./PaytmChecksum');

const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");





const commentModel = require('../../models/commentModel.js');
const commentReplyModel = require('../../models/commentReplyModel.js');
const favChapterModel = require('../../models/favChapterModel.js');
const favProgramsModel = require('../../models/favProgramsModel.js');



const saveChapterModel = require('../../models/saveChapterModel.js');
const saveProgramsModel = require('../../models/saveProgramsModel.js');


const scheduleChapterModel = require('../../models/scheduleChapterModel.js');

const { body, check, oneOf, validationResult } = require('express-validator');

/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};

const mid = 'nAnchc36350120301482'
const miKey = 'M%JRR1dLs6yP2mNx'

const midTest = 'omcPpR86995998468160'
const miKeyTest = 'DZV7fZ0WUApY0_1v'
const request = require('request');
module.exports = {

  //=============================================state list=====================================//
  getCategory: async (req, res) => {
    try {

      let data = await fitCategoriesModel.remove({})
      const options = {
        url: 'https://www.uscreen.io/api/v1/categories',
        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w=="
        }
      };

      request(options, (error, responseReq, body) => {
        if (!error && responseReq.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage. 


          let data = ''
          fitCategoriesModel.insertMany(JSON.parse(body)).then(() => {

            console.log("Users data have been saved")
            return response.responseHandlerWithData(
              res,
              200,
              'member has been updated successfully',
              JSON.parse(body)
            );
          });

        }
        else {
          console.log("Error " + responseReq.statusCode)
        }
      })

    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },



  //=============================================state list=====================================//
  getCategoryDetails: async (req, res) => {
    try {


      let categoryList = await fitCategoriesModel.find()


      let datavalue = await fitCategoryDetailsModel.remove({})
      for (let index = 0; index < categoryList.length; index++) {
        const element = categoryList[index];
        const options = {
          url: `https://www.uscreen.io/api/v1/categories/${element.id}/programs`,
          headers: {
            "Content-Type": "application/json",
            "X-Store-Token": "+/0ykksCgV8f2w=="
          }
        };

        request(options, async (error, responseReq, body) => {
          if (!error && responseReq.statusCode == 200) {

            let categoryDetails = JSON.parse(body)
            // fitCategoryDetailsModel.insertMany(categoryDetails)


            for (let index = 0; index < categoryDetails.length; index++) {
              let elementCategory = categoryDetails[index];

              elementCategory.author = JSON.stringify(elementCategory.author)
              console.log({ title: elementCategory.title })

              let checkIndex = await fitProgramModel.findOne({ id: elementCategory.id })

              if (!checkIndex) {
                if (elementCategory.title == 'Cycling Calorie Burners' || elementCategory.title == 'Recumbent Calorie Burners' || elementCategory.title == 'Elliptical Calorie Burners' || elementCategory.title == 'Running Calorie Burners' || elementCategory.title == 'Walking Calorie Burners') {
                  elementCategory.type = 'Weight loss'
                  let saveValue = new fitProgramModel(elementCategory)
                  saveValue.save()
                }

                if (elementCategory.title == 'Prenatal Cycling'
                  || elementCategory.title == 'Prenatal Elliptical'
                  || elementCategory.title == 'Prenatal Walking'
                  || elementCategory.title == 'Prenatal Rowing'
                  || elementCategory.title == 'Prenatal Strength Training') {
                  elementCategory.type = 'Prenatal'
                  let saveValue = new fitProgramModel(elementCategory)
                  saveValue.save()
                }

                if (elementCategory.title == 'Beginner Elliptical'
                  || elementCategory.title == 'Recumbent'
                  || elementCategory.title == 'Power walking') {
                  elementCategory.type = 'Senior Workouts'
                  let saveValue = new fitProgramModel(elementCategory)
                  saveValue.save()
                }


                if (elementCategory.title == 'Cycling Bootcamp'
                  || elementCategory.title == 'Elliptical Bootcamp'
                  || elementCategory.title == 'Rowing Bootcamp'
                  || elementCategory.title == 'Running Bootcamp'
                  || elementCategory.title == 'Recumbent Cross Training'

                  || elementCategory.title == 'Airbike Bootcamp'
                  || elementCategory.title == 'Walking Bootcamp'
                  || elementCategory.title == 'Running Bootcamp'
                  || elementCategory.title == 'Recumbent Cross Training'

                ) {
                  elementCategory.type = 'Bootcamps'
                  let saveValue = new fitProgramModel(elementCategory)
                  saveValue.save()
                }


                let saveValueCategory = new fitCategoryDetailsModel(elementCategory)
                saveValueCategory.save()



              }
            }

            console.log(body) // Show the HTML for the Google homepage. 
            // return response.responseHandlerWithData(
            //   res,
            //   200,
            //   'member has been updated successfully',
            //   JSON.parse(body)
            // );
          }
          else {
            console.log("Error " + responseReq.statusCode)
          }
        })


      }
      return response.responseHandlerWithData(
        res,
        200,
        'member has been updated successfully',
        categoryList
      );
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },

  //=============================================state list=====================================//
  getCategoryList: async (req, res) => {
    try {



      const categoryList = await fitCategoryDetailsModel.find()


      return response.responseHandlerWithData(
        res,
        200,
        'member has been updated successfully',
        categoryList
      );
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },

  //=============================================state list=====================================//
  getProgramType: async (req, res) => {
    try {



      let sort = 1

      // if(req.body.type=='Bootcamps'){
      //    sort=-1
      // }
      let programData = []
      if (req.body.type == 'Senior Workouts') {
        const categoryList = await fitProgramModel.find({
          type: req.body.type
        }).sort({ id: sort })



        for (let index = 0; index < categoryList.length; index++) {
          const element = categoryList[index];

          let indexData = programData.map(it => { return it.id }).indexOf(element.id)
          if (indexData == -1) {
            programData.push(element)
          }

        }

        // const options1 = {
        //   url: `https://www.uscreen.io/api/v1/categories/97794/programs`,
        //   headers: {
        //     "Content-Type": "application/json",
        //     "X-Store-Token": "+/0ykksCgV8f2w=="
        //   }
        // };

        // request(options1, async (error, responseReq, body) => {
        //   let categoryDetails = JSON.parse(body)
        //   console.log({categoryDetails})
        //   programData.push(categoryDetails)
        // })

        // const options2 = {
        //   url: `https://www.uscreen.io/api/v1/categories/78413/programs`,
        //   headers: {
        //     "Content-Type": "application/json",
        //     "X-Store-Token": "+/0ykksCgV8f2w=="
        //   }
        // };

        // request(options2, async (error, responseReq, body) => {
        //   let categoryDetails = JSON.parse(body)
        //   programData.push(categoryDetails)
        // })


        // const options3 = {
        //   url: `https://www.uscreen.io/api/v1/categories/96082/programs`,
        //   headers: {
        //     "Content-Type": "application/json",
        //     "X-Store-Token": "+/0ykksCgV8f2w=="
        //   }
        // };

        // request(options3, async (error, responseReq, body) => {
        //   let categoryDetails = JSON.parse(body)
        //   programData.push(categoryDetails)
        // })

      } else {
        const categoryList = await fitProgramModel.find({
          type: req.body.type
        }).sort({ id: sort })



        for (let index = 0; index < categoryList.length; index++) {
          const element = categoryList[index];

          let indexData = programData.map(it => { return it.id }).indexOf(element.id)
          if (indexData == -1) {
            programData.push(element)
          }

        }

      }

      return response.responseHandlerWithData(
        res,
        200,
        'member has been updated successfully',
        programData
      );
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },

  getProgramTypeById: async (req, res) => {
    try {



      let sort = 1

      // if(req.body.type=='Bootcamps'){
      //    sort=-1
      // }
      let programData = []


      let ids = req.body.id
      const options1 = {
        url: `https://www.uscreen.io/api/v1/categories/${ids}/programs`,
        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w=="
        }
      };

      request(options1, async (error, responseReq, body) => {
        let categoryDetails = JSON.parse(body)
        console.log({ categoryDetails })
        programData.push(categoryDetails)
        if (!error && responseReq.statusCode == 200) {
          let categoryDetails = JSON.parse(body)
          return response.responseHandlerWithData(
            res,
            200,
            'member has been updated successfully',
            categoryDetails
          );

        } else {
          console.log("Error " + responseReq.statusCode)
        }
      })






    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },
  addCommments: async (req, res) => {

    try {
      await body('userName').not().isEmpty().run(req);
      await body('userId').not().isEmpty().run(req);
      await body('chapterId').not().isEmpty().run(req);
      await body('comment').not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }

      let reqData = {
        userName: req.body.userName,
        userId: req.body.userId,
        chapterId: req.body.chapterId,
        comment: req.body.comment,
      }

      let commentCreate = new commentModel(reqData)
      let commentSave = await commentCreate.save()

      response.log("comment save", commentSave)
      return response.responseHandlerWithData(res, statusCode.SUCCESS, `comment save successfully`, commentSave);
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },
  addCommmentReply: async (req, res) => {

    try {
      await body('userName').not().isEmpty().run(req);
      await body('userId').not().isEmpty().run(req);
      await body('chapterId').not().isEmpty().run(req);
      await body('comment').not().isEmpty().run(req);
      await body('commentId').not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }

      let reqData = {
        userName: req.body.userName,
        userId: req.body.userId,
        chapterId: req.body.chapterId,
        comment: req.body.comment,
        commentId: req.body.commentId
      }

      let commentCreate = new commentReplyModel(reqData)
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
        chapterId: parseInt(req.body.chapterId)
      })
      let checkMobile = await commentModel.aggregate([
        {
          $match: { $and: query }
        },
        {
          $lookup: {
            from: "commentsreplies",
            localField: "_id",
            foreignField: "commentId",
            as: "replies"
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

  addToFavChapter: async (req, res) => {

    try {
      await body('userName').not().isEmpty().run(req);
      await body('userId').not().isEmpty().run(req);
      await body('chapterId').not().isEmpty().run(req);
      await body('authorizationToken').not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }
      const chapterone = await favChapterModel.findOne({
        userId: req.body.userId,
        chapterId: req.body.chapterId
      })

      if(chapterone){
        return response.responseHandlerWithMessage(res, statusCode.ERROR, "Already add in Favorites");
      }

      const options = {
        url: `https://www.uscreen.io/api/v1/chapters/videos/${req.body.chapterId}`,
        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w==",
          "authorization": req.body.authorizationToken
        }
      };

      request(options, async (error, responseReq, body) => {
        if (!error && responseReq.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage. 


          let data = JSON.parse(body)
          let reqData = {
            title:req.body.title,
            userName: req.body.userName,
            userId: req.body.userId,
            chapterId: req.body.chapterId,
            fitScopeData: data,
          }

          let commentCreate = new favChapterModel(reqData)
          let commentSave = await commentCreate.save()

          response.log("comment save", commentSave)
          return response.responseHandlerWithData(res, statusCode.SUCCESS, `Added to Favorites`, commentSave);

        }
        else {
          console.log("Error " + responseReq.statusCode)
        }
      })
      // let reqData = {
      //   userName: req.body.userName,
      //   userId: req.body.userId,
      //   chapterId: req.body.chapterId,
      //   // comment: req.body.comment,
      // }

      // let commentCreate = new commentModel(reqData)
      // let commentSave = await commentCreate.save()

      // response.log("comment save", commentSave)
      // return response.responseHandlerWithData(res, statusCode.SUCCESS, `comment save successfully`, commentSave);
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },

  getFavChapterList: async (req, res) => {
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
      let checkMobile = await favChapterModel.aggregate([
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

  removeChapterFromFav : async (req,res)=>{
    await body('userId').not().isEmpty().run(req);
    await body('chapterId').not().isEmpty().run(req);
    const errors = validationResult(req).formatWith(errorFormatter);;
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
    }
    const chapterone = await favChapterModel.remove({
      userId: req.body.userId,
      chapterId: req.body.chapterId
    })

    return response.responseHandlerWithData(res, statusCode.SUCCESS, `Removed from Favorites`, chapterone);

  },
  addToFavProgram: async (req, res) => {

    try {
      await body('userName').not().isEmpty().run(req);
      await body('userId').not().isEmpty().run(req);
      await body('programId').not().isEmpty().run(req);
      await body('authorizationToken').not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }


      const chapterone = await favChapterModel.findOne({
        userId: req.body.userId,
        programId: req.body.programId
      })

      if(chapterone){
        return response.responseHandlerWithMessage(res, statusCode.ERROR, "Already add in Favorites");
      }

      const options = {
        url: `https://www.uscreen.io/api/v1/programs/${req.body.programId}`,
        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w==",
          "authorization": req.body.authorizationToken
        }
      };

      request(options, async (error, responseReq, body) => {
        if (!error && responseReq.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage. 


          let data = JSON.parse(body)
          let reqData = {
            title:req.body.title,
            userName: req.body.userName,
            userId: req.body.userId,
            programId: req.body.programId,
            fitScopeData: data,
          }

          let commentCreate = new favProgramsModel(reqData)
          let commentSave = await commentCreate.save()

          response.log("comment save", commentSave)
          return response.responseHandlerWithData(res, statusCode.SUCCESS, `Added to Favorites`, commentSave);

        }
        else {
          console.log("Error " + responseReq.statusCode)
        }
      })
      // let reqData = {
      //   userName: req.body.userName,
      //   userId: req.body.userId,
      //   chapterId: req.body.chapterId,
      //   // comment: req.body.comment,
      // }

      // let commentCreate = new commentModel(reqData)
      // let commentSave = await commentCreate.save()

      // response.log("comment save", commentSave)
      // return response.responseHandlerWithData(res, statusCode.SUCCESS, `comment save successfully`, commentSave);
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },

  getFavProgramList: async (req, res) => {
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
      let checkMobile = await favProgramsModel.aggregate([
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
  removeProgramFromFav : async (req,res)=>{
    await body('userId').not().isEmpty().run(req);
    await body('programId').not().isEmpty().run(req);
    const errors = validationResult(req).formatWith(errorFormatter);;
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
    }
    const chapterone = await favProgramsModel.remove({
      userId: req.body.userId,
      programId: req.body.programId
    })

    return response.responseHandlerWithData(res, statusCode.SUCCESS, `Removed from Favorites`, chapterone);

  },
  getFavList: async (req, res) => {
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
      let checkMobile = await favProgramsModel.aggregate([
        {
          $match: { $and: query }
        },
      ])

      let checkMobileChapter = await favChapterModel.aggregate([
        {
          $match: { $and: query }
        },
      ])

     
      return response.responseHandlerWithData(res, statusCode.SUCCESS, `Data found successfully`, {program:checkMobile,chapter:checkMobileChapter});
    
    }
    catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },



  addToSaveChapter: async (req, res) => {

    try {
      await body('userName').not().isEmpty().run(req);
      await body('userId').not().isEmpty().run(req);
      await body('chapterId').not().isEmpty().run(req);
      await body('authorizationToken').not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }
      const chapterone = await saveChapterModel.findOne({
        userId: req.body.userId,
        chapterId: req.body.chapterId
      })

      if(chapterone){
        return response.responseHandlerWithMessage(res, statusCode.ERROR, "Already add in favourite");
      }

      const options = {
        url: `https://www.uscreen.io/api/v1/chapters/videos/${req.body.chapterId}`,
        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w==",
          "authorization": req.body.authorizationToken
        }
      };

      request(options, async (error, responseReq, body) => {
        if (!error && responseReq.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage. 


          let data = JSON.parse(body)
          let reqData = {
            title:req.body.title,
            userName: req.body.userName,
            userId: req.body.userId,
            chapterId: req.body.chapterId,
            fitScopeData: data,
          }

          let commentCreate = new saveChapterModel(reqData)
          let commentSave = await commentCreate.save()

          response.log("comment save", commentSave)
          return response.responseHandlerWithData(res, statusCode.SUCCESS, `Added to My List`, commentSave);

        }
        else {
          console.log("Error " + responseReq.statusCode)
        }
      })
      // let reqData = {
      //   userName: req.body.userName,
      //   userId: req.body.userId,
      //   chapterId: req.body.chapterId,
      //   // comment: req.body.comment,
      // }

      // let commentCreate = new commentModel(reqData)
      // let commentSave = await commentCreate.save()

      // response.log("comment save", commentSave)
      // return response.responseHandlerWithData(res, statusCode.SUCCESS, `comment save successfully`, commentSave);
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },

  getSaveChapterList: async (req, res) => {
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
      let checkMobile = await saveChapterModel.aggregate([
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

  removeChapterFromSave : async (req,res)=>{
    await body('userId').not().isEmpty().run(req);
    await body('chapterId').not().isEmpty().run(req);
    const errors = validationResult(req).formatWith(errorFormatter);;
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
    }
    const chapterone = await saveChapterModel.remove({
      userId: req.body.userId,
      chapterId: req.body.chapterId
    })

    return response.responseHandlerWithData(res, statusCode.SUCCESS, `Removed from My List`, chapterone);

  },
  addToSaveProgram: async (req, res) => {

    try {
      await body('userName').not().isEmpty().run(req);
      await body('userId').not().isEmpty().run(req);
      await body('programId').not().isEmpty().run(req);
      await body('authorizationToken').not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }


      const chapterone = await saveChapterModel.findOne({
        userId: req.body.userId,
        programId: req.body.programId
      })

      if(chapterone){
        return response.responseHandlerWithMessage(res, statusCode.ERROR, "Already add in favourite");
      }

      const options = {
        url: `https://www.uscreen.io/api/v1/programs/${req.body.programId}`,
        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w==",
          "authorization": req.body.authorizationToken
        }
      };

      request(options, async (error, responseReq, body) => {
        if (!error && responseReq.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage. 


          let data = JSON.parse(body)
          let reqData = {
            title:req.body.title,
            userName: req.body.userName,
            userId: req.body.userId,
            programId: req.body.programId,
            fitScopeData: data,
          }

          let commentCreate = new saveProgramsModel(reqData)
          let commentSave = await commentCreate.save()

          response.log("comment save", commentSave)
          return response.responseHandlerWithData(res, statusCode.SUCCESS, `comment save successfully`, commentSave);

        }
        else {
          console.log("Error " + responseReq.statusCode)
        }
      })
      // let reqData = {
      //   userName: req.body.userName,
      //   userId: req.body.userId,
      //   chapterId: req.body.chapterId,
      //   // comment: req.body.comment,
      // }

      // let commentCreate = new commentModel(reqData)
      // let commentSave = await commentCreate.save()

      // response.log("comment save", commentSave)
      // return response.responseHandlerWithData(res, statusCode.SUCCESS, `comment save successfully`, commentSave);
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },

  getSaveProgramList: async (req, res) => {
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
      let checkMobile = await saveProgramsModel.aggregate([
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
  removeProgramFromSave : async (req,res)=>{
    await body('userId').not().isEmpty().run(req);
    await body('programId').not().isEmpty().run(req);
    const errors = validationResult(req).formatWith(errorFormatter);;
    if (!errors.isEmpty()) {
      return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
    }
    const chapterone = await saveProgramsModel.remove({
      userId: req.body.userId,
      programId: req.body.programId
    })

    return response.responseHandlerWithData(res, statusCode.SUCCESS, `chapter removed successfully`, chapterone);

  },
  getSaveList: async (req, res) => {
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
      let checkMobile = await saveProgramsModel.aggregate([
        {
          $match: { $and: query }
        },
      ])

      let checkMobileChapter = await saveChapterModel.aggregate([
        {
          $match: { $and: query }
        },
      ])

     
      return response.responseHandlerWithData(res, statusCode.SUCCESS, `Data found successfully`, {program:checkMobile,chapter:checkMobileChapter});
    
    }
    catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },


  addToScheduleCompleteChapter: async (req, res) => {

    try {
      await body('userName').not().isEmpty().run(req);
      await body('userId').not().isEmpty().run(req);
      await body('chapterId').not().isEmpty().run(req);
      await body('authorizationToken').not().isEmpty().run(req);

      await body('date').not().isEmpty().run(req);
      await body('time').not().isEmpty().run(req);
      await body('timeInMint').not().isEmpty().run(req);
      await body('type').not().isEmpty().run(req);


      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }
      // const chapterone = await saveChapterModel.findOne({
      //   userId: req.body.userId,
      //   chapterId: req.body.chapterId
      // })

      // if(chapterone){
      //   return response.responseHandlerWithMessage(res, statusCode.ERROR, "Already add in favourite");
      // }

      const options = {
        url: `https://www.uscreen.io/api/v1/chapters/videos/${req.body.chapterId}`,
        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w==",
          "authorization": req.body.authorizationToken
        }
      };

      request(options, async (error, responseReq, body) => {
        if (!error && responseReq.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage. 


          let data = JSON.parse(body)
          let reqData = {
            title:req.body.title,
            userName: req.body.userName,
            userId: req.body.userId,
            chapterId: req.body.chapterId,
            fitScopeData: data,
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

        }
        else {
          return response.responseHandlerWithMessage(res, statusCode.ERROR, "Data not found");
        }
      })
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

  getChapterDetails: async (req, res) => {

    try {
      await body('userName').not().isEmpty().run(req);
      await body('userId').not().isEmpty().run(req);
      await body('chapterId').not().isEmpty().run(req);
      await body('authorizationToken').not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }
      const chapteroneFav = await favChapterModel.findOne({
        userId: req.body.userId,
        chapterId: req.body.chapterId
      })

      const chapteroneSave = await saveChapterModel.findOne({
        userId: req.body.userId,
        chapterId: req.body.chapterId
      })
      const chapteroneComplete = await scheduleChapterModel.findOne({
           userId: req.body.userId,
           chapterId: req.body.chapterId,
           type:'Complete'
     })
     const chapteroneSchedule = await scheduleChapterModel.findOne({
      userId: req.body.userId,
      chapterId: req.body.chapterId,
      type:'Schedule'
})

      const options = {
        url: `https://www.uscreen.io/api/v1/chapters/videos/${req.body.chapterId}`,
        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w==",
          "authorization": req.body.authorizationToken
        }
      };

      request(options, async (error, responseReq, body) => {
        if (!error && responseReq.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage. 


          let data = JSON.parse(body)
          data.isFav=chapteroneFav?true:false
          data.isSave=chapteroneSave?true:false
          data.isComplete=chapteroneComplete?true:false
          data.isSchedule=chapteroneSchedule?true:false
         
          return response.responseHandlerWithData(res, statusCode.SUCCESS, `details found  successfully`, data);

        }
        else {
          console.log("Error " + responseReq.statusCode)
        }
      })
      // let reqData = {
      //   userName: req.body.userName,
      //   userId: req.body.userId,
      //   chapterId: req.body.chapterId,
      //   // comment: req.body.comment,
      // }

      // let commentCreate = new commentModel(reqData)
      // let commentSave = await commentCreate.save()

      // response.log("comment save", commentSave)
      // return response.responseHandlerWithData(res, statusCode.SUCCESS, `comment save successfully`, commentSave);
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },

  getProgramDetails: async (req, res) => {

    try {
      await body('userName').not().isEmpty().run(req);
      await body('userId').not().isEmpty().run(req);
      await body('programId').not().isEmpty().run(req);
      await body('authorizationToken').not().isEmpty().run(req);
      const errors = validationResult(req).formatWith(errorFormatter);;
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
      }
      const chapteroneFav = await saveChapterModel.findOne({
        userId: req.body.userId,
        programId: req.body.programId
      })

      const chapteroneSave = await saveProgramsModel.findOne({
        userId: req.body.userId,
        programId: req.body.programId
      })
    //   const chapteroneSchedule = await scheduleChapterModel.findOne({
    //        userId: req.body.userId,
    //        chapterId: req.body.chapterId
    //  })

     const options = {
      url: `https://www.uscreen.io/api/v1/programs/${req.body.programId}`,
      headers: {
        "Content-Type": "application/json",
        "X-Store-Token": "+/0ykksCgV8f2w==",
        "authorization": req.body.authorizationToken
      }
    };

      request(options, async (error, responseReq, body) => {
        if (!error && responseReq.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage. 


          let data = JSON.parse(body)
          data.isFav=chapteroneFav?true:false
          data.isSave=chapteroneSave?true:false
          // data.isScheduleOrComplete=chapteroneSchedule?true:false
         
          return response.responseHandlerWithData(res, statusCode.SUCCESS, `programs found  successfully`, data);

        }
        else {
          console.log("Error " + responseReq.statusCode)
          return response.responseHandlerWithMessage(res, statusCode.ERROR, "Data not found");
        }
      })
      // let reqData = {
      //   userName: req.body.userName,
      //   userId: req.body.userId,
      //   chapterId: req.body.chapterId,
      //   // comment: req.body.comment,
      // }

      // let commentCreate = new commentModel(reqData)
      // let commentSave = await commentCreate.save()

      // response.log("comment save", commentSave)
      // return response.responseHandlerWithData(res, statusCode.SUCCESS, `comment save successfully`, commentSave);
    } catch (error) {
      response.log("Error is============>", error)
      return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
    }
  },
}
