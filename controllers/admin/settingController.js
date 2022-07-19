const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const settingsModel = require("../../models/settingsModel.js");
const categoryModel = require("../../models/categoryModel.js");
const categoeyProgramModel = require("../../models/categoeyProgramModel.js");

const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");
const { body, check, oneOf, validationResult } = require("express-validator");
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};
module.exports = {
  updateSettings: async (req, res) => {
    try {
      await body("type").not().isEmpty().run(req);
      await body("settings").not().isEmpty().run(req);

      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
      let settingsData = await settingsModel.findOne({ type: req.body.type });

      let settings = req.body.settings;
      let resSend;
      let type = req.body.type;
      if (settingsData) {
        resSend = await settingsModel.findByIdAndUpdate(
          { _id: settingsData._id },
          { $set: { settings: settings } }
        );
      } else {
        resSend = await settingsModel.create({
          type: type,
          settings: settings,
        });
      }
      return response.responseHandlerWithData(
        res,
        200,
        "Settings update successfully",
        resSend
      );
    } catch (error) {
      console.log(error);
    }
  },

  getSettings: async (req, res) => {
    try {
      await body("type").not().isEmpty().run(req);
      // await body("settings").not().isEmpty().run(req);

      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return response.responseHandlerWithData(
          res,
          statusCode.DATAMISSING,
          "Please check your request",
          errors.array()
        );
      }
      let settingsData = await settingsModel.findOne({ type: req.body.type });
      return response.responseHandlerWithData(
        res,
        200,
        "Settings update successfully",
        settingsData
      );
    } catch (error) {
      console.log(error);
    }
  },

  getAllCategory: async (req, res) => {
    let category = [];
    let data = await categoryModel.find();

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      if (category.indexOf(element.title) == -1) {
        category.push(element.title.trim());
      }
    }
    return response.responseHandlerWithData(
      res,
      200,
      "Category listed successfully",
      category
    );
  },

  getAllProgram: async (req, res) => {
    let category = [];
    let data = await categoeyProgramModel.find();

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      if (category.indexOf(element.title) == -1) {
        category.push(element.title.trim());
      }
    }
    return response.responseHandlerWithData(
      res,
      200,
      "Program listed successfully",
      category.sort()
    );
  },
};
