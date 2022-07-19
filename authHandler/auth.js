var jwt = require('jsonwebtoken');
const response = require("../utils/httpResponseMessage");
const  statusCode = require("../utils/httpResponseCode");

const userModel=require('../models/usersModel')
const Admin = require('../models/adminModel.js')
module.exports = {
    authAdmin: async (req, res, next) => {

        try {
            response.log("Token is admin==========>", req.headers.authorization)
            if (!req.headers.authorization) {
                response.log("Token is missing")
                return response.responseHandlerWithMessage(res, statusCode.DATAMISSING, "Something went wrong");
            }
            jwt.verify(req.headers.authorization,  `sUpER@SecReT`, async (error, result) => {
                if (error) {
                    response.log("Invalid Token1")
                    return response.responseHandlerWithMessage(res, statusCode.TOKENEXPIRE, "Invalid Token");
                }
                console.log({result})
                let checkAdmin = await Admin.findOne({ _id: result._id })
                if (!checkAdmin) {
                    response.log("Invalid Token2")
                    return response.responseHandlerWithMessage(res, statusCode.TOKENEXPIRE, "Invalid Token");
                }
                checkAdmin.userType='Admin'
                // req.query = Object.assign(req.query,checkAdmin)
                req.query.tokenUser=checkAdmin
                response.log("Request is==========>", req.user) 
                next();
            })
        } catch (error) {
            response.log("Error is============>", error)
            return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
        }
    },
    authUser: async (req, res, next) => {

        try {
            response.log("Token is admin==========>", req.headers)
            // if (!req.headers.userId) {
            //     response.log("Token is missing")
            //     return response.responseHandlerWithMessage(res, statusCode.DATAMISSING, "Please send userId");
            // }
            if(!req.headers.userid){
                req.query.tokenUser=null
                next();
                return
            }
            let checkUser = await userModel.findOne({ "user.id": req.headers.userid})
            if (!checkUser) {
                response.log("Invalid Token2")
                return response.responseHandlerWithMessage(res, statusCode.TOKENEXPIRE, "Invalid Token");
            }
            // req.query = Object.assign(req.query,checkUser)
            req.query.tokenUser=checkUser
            response.log("Request is==========>", req.user) 
            next();
        } catch (error) {
            response.log("Error is============>", error)
            return response.responseHandlerWithMessage(res, statusCode.ERROR, "Internal server error");
        }
    },




 

   


  

  


}