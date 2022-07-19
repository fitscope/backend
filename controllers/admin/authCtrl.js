
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/adminModel.js')
const response = require("../../utils/httpResponseMessage");
const  statusCode = require("../../utils/httpResponseCode");
const {body, check, oneOf, validationResult } = require('express-validator');
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return `${location}[${param}]: ${msg}`;
  };
module.exports = {

    //========================================Admin Login=================================================//
  
    adminLogin: async (req, res) => {

        console.log(req.body)
        try {
            await body('email').isEmail().run(req);
            await body('password').not().isEmpty().run(req);
          
            const errors = validationResult(req).formatWith(errorFormatter);;
            if (!errors.isEmpty()) {
                return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
            }
            req.body.email = req.body.email.toLowerCase();
            let checkAdmin = await Admin.findOne({ email: req.body.email })
            if (!checkAdmin) {
                response.log("Invalid Credentials")
                return response.responseHandlerWithMessage(res, statusCode.RESULTNOTFOUND, "Invalid Credentails");
            }
            response.log("Bcrypt Password is=======>", checkAdmin.password)
            let passVerify = await bcrypt.compareSync(req.body.password, checkAdmin.password);
            if (!passVerify) {
                response.log("Invalid Credentails")
                return response.responseHandlerWithMessage(res, statusCode.RESULTNOTFOUND, "Invalid Credentails");
            }
            req.body.password = checkAdmin.password
            let query = { $and: [{ _id: checkAdmin._id }, { password: req.body.password }] }
            let checkPassword = await Admin.findOne(query)
            if (!checkPassword) {
                response.log("Invalid Credentails")
                return response.responseHandlerWithMessage(res, statusCode.RESULTNOTFOUND, "Invalid Credentails");
            }
            var jwtToken = jwt.sign({ "_id": checkPassword._id }, `sUpER@SecReT`);
            response.log("Jwt Token is=========>", jwtToken)
            let result = await Admin.findByIdAndUpdate({ _id: checkAdmin._id }, { $set: { jwtToken: jwtToken } }, { new: true })
            response.log("Admin have successfully logged in", result)
            return response.responseHandlerWithData(res, statusCode.SUCCESS, "You have successfully logged in ", result);
        } catch (error) {
            response.log("Error is============>", error)
            return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
        }
    },

    adminDetails: async (req, res) => {
        try {
          

            response.log("query is===>",req.query)
            let result = await Admin.findOne({ _id: req.query.tokenUser._id })
            response.log("Admin have successfully logged in", result)
            return response.responseHandlerWithData(res, statusCode.SUCCESS, "Data found successfully", result);
        } catch (error) {
            response.log("Error is============>", error)
            return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
        }
    },



       //==========================================Password change==========================================//

       passwordChange: async (req, res) => {

        try {
           
            await body('newPassword').not().isEmpty().run(req);
            await body('oldPassword').not().isEmpty().run(req);

            await body('adminId').not().isEmpty().run(req);

            let checkAdmin = await Admin.findOne({ _id: req.body.adminId })
            const errors = validationResult(req).formatWith(errorFormatter);;
            if (!errors.isEmpty()) {
                return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
            }

            
            else if (!(bcrypt.compareSync(req.body.oldPassword, checkAdmin.password))) {
                response.log("Old password is incorrect")
                return response.responseHandlerWithMessage(res, 500, 'Old password is incorrect');
            }
            req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10)
            let result = await Admin.findByIdAndUpdate({ _id: req.body.adminId }, { $set: { password: req.body.newPassword } }, { new: true })
            response.log("Password reset successfully", result)
            return response.responseHandlerWithMessage(res, 200, 'Password reset successfully');
        } catch (error) {
            response.log("Error  is============>", error);
            return response.responseHandlerWithMessage(res, 500, "Internal server error");
        }
    },

    //=========================================Update admin detail======================================//

    updateAdminDetail: async (req, res) => {

        try {
            response.log("Rerquest for update admin detail is==========>", req.body)
           
            // req.checkBody('adminId', 'Something went wrong.').notEmpty();
            await body('adminId').not().isEmpty().run(req);
            const errors = validationResult(req).formatWith(errorFormatter);;
            if (!errors.isEmpty()) {
                return response.responseHandlerWithData(res, statusCode.DATAMISSING, "Please check your request", errors.array());
            }
            let updateDetail = await Admin.findByIdAndUpdate({ _id: req.body.adminId }, { $set:  req.body}, { new: true })
            response.log("Profile updated successfully", updateDetail)
            response.responseHandlerWithData(res, 200, 'Profile updated successfully', updateDetail);
           
        } catch (error) {
            response.log("Error  is============>", error);
            return response.responseHandlerWithMessage(res, 500, "Internal server error");
        }
    },


 
    
 

}
