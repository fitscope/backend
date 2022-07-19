let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let FitProgramsCategories = mongoose.Schema(
  {
    mainkey: {
      type: String,
    },
    categories: {
        type: Array,
    }
},
  {
    timestamps: true,
  }
);
FitProgramsCategories.plugin(mongoosePaginate);
FitProgramsCategories.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('fitprogramscategories', FitProgramsCategories);
