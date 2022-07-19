var express = require('express');
var router = express.Router();
// var commnonCtrl=require('../controllers/common/commnonCtrl');
var fitController=require('../controllers/fit/fitController');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/getCategory',fitController.getCategory);
router.get('/getCategoryDetails',fitController.getCategoryDetails);
router.get('/getCategoryList',fitController.getCategoryList);
router.post('/getProgramType',fitController.getProgramType);
router.post('/getProgramTypeById',fitController.getProgramTypeById);
router.post('/addCommments',fitController.addCommments)
router.post('/addCommmentReply',fitController.addCommmentReply)
router.post('/getCommentList',fitController.getCommentList)


router.post('/addToFavChapter',fitController.addToFavChapter)
router.post('/getFavChapterList',fitController.getFavChapterList)
router.post('/removeChapterFromFav',fitController.removeChapterFromFav)


router.post('/addToFavProgram',fitController.addToFavProgram)
router.post('/getFavProgramList',fitController.getFavProgramList)
router.post('/removeProgramFromFav',fitController.removeProgramFromFav)

router.post('/getFavList',fitController.getFavList)





router.post('/addToSaveChapter',fitController.addToSaveChapter)
router.post('/getSaveChapterList',fitController.getSaveChapterList)
router.post('/removeChapterFromSave',fitController.removeChapterFromSave)


router.post('/addToSaveProgram',fitController.addToSaveProgram)
router.post('/getSaveProgramList',fitController.getSaveProgramList)
router.post('/removeProgramFromSave',fitController.removeProgramFromSave)

router.post('/getSaveList',fitController.getSaveList)
router.post('/addToScheduleCompleteChapter',fitController.addToScheduleCompleteChapter)

router.post('/getScheduleList',fitController.getScheduleList)
router.post('/getChapterDetails',fitController.getChapterDetails)
router.post('/getProgramDetails',fitController.getProgramDetails)

// router.post('/getProgramCategoriesType',fitController.getProgramCategoriesType);
module.exports = router;
