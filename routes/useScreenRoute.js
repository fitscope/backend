var express = require('express');
var router = express.Router();
// var commnonCtrl=require('../controllers/common/commnonCtrl');
var useScreen=require('../controllers/useScreen/useScreenCtrl');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/getCategory',useScreen.getCategory);
router.get('/getCategoryDetail',useScreen.getCategoryDetail);
router.get('/getAuthor',useScreen.getAuthor);
router.get('/setFilter',useScreen.setFilter);

// router.post('/getProgramCategoriesType',fitController.getProgramCategoriesType);
module.exports = router;
