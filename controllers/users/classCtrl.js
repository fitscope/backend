
const constant = require("../../utils/constant.js");
const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");
const DatabaseHelper = require('../../utils/databaseHelper.js');
const settingsModel = require("../../models/settingsModel.js");
const evnForData="Database"
// settingCategory:any=[
//   {
//      type:'homeSettings',
//      value:'Home Settings',
//      level:1,
//      id:1
//   },
//   {
//      type:'homeBike',
//      value:'Home Bike',
//      level:2,
//      id:2
//   },
//   {
//      type:'homeEllipticals',
//      value:'Home Elliptical',
//      level:2,
//      id:3
//   },
//   {
//      type:'homeRower',
//      value:'Home Rower',
//      level:2,
//      id:4
//   },
//   {
//      type:'homeTreadmill',
//      value:'Home Tread mill',
//      level:2,
//      id:5
//   },
//   {
//      type:'homeOnTheFloor',
//      value:'Home On The Floor',
//      level:2,
//      id:6
//   },
//   {
//      type:'weightLossProgram',
//      value:'Weight Loss Program',
//      level:1,
//      id:7
//   },
//   {
//      type:'prenatalProgram',
//      value:'Prenatal Program',
//      level:1,
//      id:8
//   },
//   {
//      type:'bootcampsProgram',
//      value:'Bootcamps Program',
//      level:1,
//      id:9
//   },
//   {
//      type:'seniorWorkoutProgram',
//      value:'Senior Workout Program',
//      level:2,
//      id:10
//   },
//  ]
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};

module.exports = {

  getClassHomeNew: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      let settingData= await settingsModel.findOne({type:'homeSettings'})
      
      console.log(settingData)
      if(!settingData || !settingData.settings){
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Settings Not Available"
        );
      }
      let settings=evnForData=='Database'?settingData.settings:constant.homeSettingsNew
      settings.sort(function(a, b){return a.sort - b.sort});


      const dataValue = await DatabaseHelper.getDataWithoutCategory({
        filterValue: settings,
        userId: userId,
      });
      return response.responseHandlerWithData(
        res,
        200,
        "Category list find successfully successfully",
        dataValue
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
  getClassBike: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;

      let settingData= await settingsModel.findOne({type:'homeBike'})
      
      console.log(settingData)
      if(!settingData || !settingData.settings){
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Settings Not Available"
        );
      }
      let settings=evnForData=='Database'?settingData.settings:constant.homeBike
      settings.sort(function(a, b){return a.sort - b.sort});



      const dataValue = await  DatabaseHelper.getDataWithCategory({
        filterValue: settings,
        userId: userId,
      });
      return response.responseHandlerWithData(
        res,
        200,
        "Category list find successfully successfully",
        dataValue
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
  getClassEllipticals: async (req, res) => {

    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;

      let settingData= await settingsModel.findOne({type:'homeEllipticals'})
      
      console.log(settingData)
      if(!settingData || !settingData.settings){
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Settings Not Available"
        );
      }
      let settings=evnForData=='Database'?settingData.settings:constant.homeEllipticals
      settings.sort(function(a, b){return a.sort - b.sort});


      const dataValue = await  DatabaseHelper.getDataWithCategory({
        filterValue: settings,
        userId: userId,
      });
      return response.responseHandlerWithData(
        res,
        200,
        "Category list find successfully successfully",
        dataValue
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
  getClassRower: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;

      let settingData= await settingsModel.findOne({type:'homeRower'})
      
      console.log(settingData)
      if(!settingData || !settingData.settings){
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Settings Not Available"
        );
      }
      let settings=evnForData=='Database'?settingData.settings:constant.homeRower
      settings.sort(function(a, b){return a.sort - b.sort});



      const dataValue = await  DatabaseHelper.getDataWithCategory({
        filterValue: settings,
        userId: userId,
      });


      return response.responseHandlerWithData(
        res,
        200,
        "Category list find successfully successfully",
        dataValue
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

  getClassTreadmill: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;

      let settingData= await settingsModel.findOne({type:'homeTreadmill'})
      
      console.log(settingData)
      if(!settingData || !settingData.settings){
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Settings Not Available"
        );
      }
      let settings=evnForData=='Database'?settingData.settings:constant.homeTreadmill
      settings.sort(function(a, b){return a.sort - b.sort});



      const dataValue = await  DatabaseHelper.getDataWithCategory({
        filterValue: settings,
        userId: userId,
      });
      return response.responseHandlerWithData(
        res,
        200,
        "Category list find successfully successfully",
        dataValue
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
  getClassOnTheFloor: async (req, res) => {
    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;
      let settingData= await settingsModel.findOne({type:'homeOnTheFloor'})
      
      console.log(settingData)
      if(!settingData || !settingData.settings){
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Settings Not Available"
        );
      }
      let settings=evnForData=='Database'?settingData.settings:constant.homeOnTheFloor
      settings.sort(function(a, b){return a.sort - b.sort});



      const dataValue = await  DatabaseHelper.getDataWithCategory({
        filterValue: settings,
        userId: userId,
      });
      return response.responseHandlerWithData(
        res,
        200,
        "Category list find successfully successfully",
        dataValue
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

