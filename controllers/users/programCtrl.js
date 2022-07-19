const constant = require("../../utils/constant.js");
const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");
const DatabaseHelper = require('../../utils/databaseHelper.js');
const settingsModel = require("../../models/settingsModel.js");
const evnForData="Database"

module.exports = {

  getWaitLossNew: async (req, res) => {
    

    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;

      let settingData= await settingsModel.findOne({type:'weightLossProgram'})
      
      console.log(settingData)
      if(!settingData || !settingData.settings){
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Settings Not Available"
        );
      }
      let settings=evnForData=='Database'?settingData.settings:constant.weightLossProgram
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
  getPrenatalProgram: async (req, res) => {
   

    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;

      let settingData= await settingsModel.findOne({type:'weightLossProgram'})
      
      console.log(settingData)
      if(!settingData || !settingData.settings){
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Settings Not Available"
        );
      }
      let settings=evnForData=='Database'?settingData.settings:constant.prenatalProgram
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
  getBootcampsProgram: async (req, res) => {
   

    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;

      let settingData= await settingsModel.findOne({type:'weightLossProgram'})
      
      console.log(settingData)
      if(!settingData || !settingData.settings){
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Settings Not Available"
        );
      }
      let settings=evnForData=='Database'?settingData.settings:constant.bootcampsProgram
      settings.sort(function(a, b){return a.sort - b.sort});


      const dataValue = await DatabaseHelper.getDataWithoutCategory({
        filterValue:settings,
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

  getSeniorProgram: async (req, res) => {

    try {
      let user = req.query.tokenUser;
      let userId = req.query.tokenUser ? req.query.tokenUser.user.id : null;

      let settingData= await settingsModel.findOne({type:'weightLossProgram'})
      
      console.log(settingData)
      if(!settingData || !settingData.settings){
        return response.responseHandlerWithMessage(
          res,
          statusCode.ERROR,
          "Settings Not Available"
        );
      }
      let settings=evnForData=='Database'?settingData.settings:constant.seniorWorkoutProgram
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


