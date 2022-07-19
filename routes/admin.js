var express = require('express');
var router = express.Router();
var authCtrl=require('../controllers/admin/authCtrl.js');
var videoCtrl=require('../controllers/admin/videoCtrl.js');
var uscreenCtrl=require('../controllers/admin/uscreenCtrl.js');

var settingController=require('../controllers/admin/settingController.js');

var notificationCtrl=require('../controllers/admin/notificationCtrl.js');



var authHandler=require('../authHandler/auth.js');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();


//const paymentCtrl  = require('../controllers/admin/paymentCtrl.js');


router.post('/getSettings',settingController.getSettings);
router.post('/updateSettings',settingController.updateSettings);
router.get('/getAllCategory',settingController.getAllCategory);
router.get('/getAllProgram',settingController.getAllProgram);

router.post('/adminLogin',authCtrl.adminLogin);
router.post('/updateAdminDetail',authCtrl.updateAdminDetail);
router.post('/passwordChange',authCtrl.passwordChange);


router.post('/videoList',videoCtrl.findVideoList);
router.post('/deletedVideo',videoCtrl.deletedVideo);
router.post('/updateVideo',videoCtrl.updateVideo);
router.get('/getCommentList',videoCtrl.getCommentList);
router.post('/addCommmentReply',videoCtrl.addCommmentReply);
router.post('/getCommentDetails',videoCtrl.getCommentDetails);
router.post('/deletedComment',videoCtrl.deletedComment);
router.get('/getFileterParameters',videoCtrl.getFileterParameters);

router.get('/getCategory',uscreenCtrl.getCategory);
router.get('/getCategoryDetail',uscreenCtrl.getCategoryDetail);
router.get('/getAuthor',uscreenCtrl.getAuthor);
router.get('/setSyncDefault',uscreenCtrl.setSyncDefault);
router.post('/filterOutData',uscreenCtrl.filterOutData);
router.get('/updateAuthorChapter',uscreenCtrl.updateAuthorChapter);
router.get('/updateLongdescriptionChapter',uscreenCtrl.updateLongdescriptionChapter);
router.get('/updateAuthorProgram',uscreenCtrl.updateAuthorProgram);


router.post('/findNotification',notificationCtrl.findNotification);
router.post('/addNotification',notificationCtrl.addNotification);

router.post('/deletedNotification',notificationCtrl.deletedNotification);




router.use(authHandler.authAdmin);
//router.get('/adminDetails',authCtrl.adminDetails);





//router.post('/uploadKeyaccountmanager',keymanagerCtrl.uploadKeyaccountmanager);
//router.post('/uploadKeyaccountmanager',multipartMiddleware,keymanagerCtrl.uploadKeyaccountmanager);


module.exports = router;
