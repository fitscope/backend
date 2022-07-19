const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
let Schema = mongoose.Schema;
var func = require('../utils/commonFun.js');
const Admin = mongoose.Schema({

    name: {
        type: String       
    },
    contact: {
        type: String       
    },
    adddedBy:{
        type:String
    },
    adddedById:{
          type: Schema.Types.ObjectId,
          ref: "admins"
    },

    updatedBy:{
        type:String
    },
     updatedById:{
         type: Schema.Types.ObjectId,
         ref: "admins"
    },
    userType:{
        type:String,
        enum:['Admin','SubAdmin'],
        default:'Admin'    
    },
    permission:{
        type:Array,
        default:['All'] 
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    plainPassword: {
        type: String
    },
    profilePic: {
        type: String,
        default:"https://res.cloudinary.com/a2karya80559188/image/upload/v1584446275/admin_nke1cg.jpg"
    },
    username:{
        type:String
    },
    forgotPassMilisec: {
        type: String,
    },
    forgotPassToken: {
        type: String,
        trim:true
    },
    jwtToken:{
        type:String
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active'
    },
    emailOtp:{
        type:String
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: "states"
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "cities"
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "roles"
    }


}, {
        timestamps: true
    })

Admin.plugin(mongoosePaginate);
const AdminModel = mongoose.model('admins', Admin, 'admins');
module.exports = AdminModel
AdminModel.findOne({}, (error, success) => {
    if (error) {
        console.log(error)
    } else {
        if (!success) {
            func.bcrypt("admin123", (err, password) => {
                if (err)
                    console.log("Error is=============>",err)
                else {                    
                    new AdminModel({
                        email: "demo@mailinator.com",
                        password: password,
                        plainPassword:"admin123",
                        username:"admin1234",
                        name: "Admin",
                        profilePic: "https://res.cloudinary.com/a2karya80559188/image/upload/v1584446275/admin_nke1cg.jpg"
                    }).save((error, success) => {
                        if(error){
                            console.log("Error in creating admin");
                        }
                        else{
                            console.log("Admin created successfully");
                            console.log("Admin data is==========>",success);
                        }                       
                    })
                }
            })
        }
    }
})
