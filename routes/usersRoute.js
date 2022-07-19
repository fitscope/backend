var express = require('express');
var router = express.Router();
// var commnonCtrl=require('../controllers/common/commnonCtrl');
var classCtrl=require('../controllers/users/classCtrl');
var programCtrl=require('../controllers/users/programCtrl');
var videoCtrl=require('../controllers/users/videoCtrl');
var authCtrl=require('../controllers/users/authCtrl');
var myLibraryCtrl=require('../controllers/users/myLibraryCtrl');
var searchCtrl=require('../controllers/users/searchCtrl');
var notiCtrl=require('../controllers/users/notiCtrl');



var authHandler=require('../authHandler/auth.js');
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use(authHandler.authUser);
router.get('/getClassHome',classCtrl.getClassHomeNew);
router.get('/getClassHomeNew',classCtrl.getClassHomeNew);
router.get('/getClassBike',classCtrl.getClassBike);
router.get('/getClassEllipticals',classCtrl.getClassEllipticals);
router.get('/getClassRower',classCtrl.getClassRower);
router.get('/getClassTreadmill',classCtrl.getClassTreadmill);
router.get('/getClassOnTheFloor',classCtrl.getClassOnTheFloor);

router.get('/getWaitLoss',programCtrl.getWaitLossNew);
router.get('/getPrenatalProgram',programCtrl.getPrenatalProgram);
router.get('/getBootcampsProgram',programCtrl.getBootcampsProgram);
router.get('/getSeniorProgram',programCtrl.getSeniorProgram);

router.post('/findVideoDetails',videoCtrl.findVideoDetails);
router.post('/userLogin',authCtrl.userLogin);
router.post('/userSignup',authCtrl.userSignup);

router.post('/addToFavChapter',myLibraryCtrl.addToFavChapter);
router.post('/removeChapterFromFav',myLibraryCtrl.removeChapterFromFav);

router.post('/addToFavProgram',myLibraryCtrl.addToFavProgram);
router.post('/removeProgramFromFav',myLibraryCtrl.removeProgramFromFav);


router.post('/addToSaveProgram',myLibraryCtrl.addToSaveProgram);
router.post('/removeProgramsFromSave',myLibraryCtrl.removeProgramsFromSave);
router.post('/updateToScheduleCompleteChapter',myLibraryCtrl.updateToScheduleCompleteChapter);


router.post('/addToSaveChapter',myLibraryCtrl.addToSaveChapter);
router.post('/removeChapterFromSave',myLibraryCtrl.removeChapterFromSave);

router.post('/addToScheduleCompleteChapter',myLibraryCtrl.addToScheduleCompleteChapter);
router.post('/getScheduleList',myLibraryCtrl.getScheduleList);
router.post('/getScheduleUpcomingHistoryList',myLibraryCtrl.getScheduleUpcomingHistoryList);
router.post('/removeFromSchedule',myLibraryCtrl.removeFromSchedule);




router.get('/getFavList',myLibraryCtrl.getFavList);
router.get('/getSaveList',myLibraryCtrl.getSaveList);
router.post('/getChapterList',myLibraryCtrl.getChapterList);

router.post('/addCommments',videoCtrl.addCommments);
router.post('/addCommmentReply',videoCtrl.addCommmentReply);
router.post('/getCommentList',videoCtrl.getCommentList);

router.post('/searchList',searchCtrl.searchList);
router.get('/getFileterParameters',searchCtrl.getFileterParameters);
router.post('/filterList',searchCtrl.filterList);


router.get('/notificationList',notiCtrl.notificationList);



module.exports = router;
