let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let FitCategories = mongoose.Schema(
  {
    id: {
      type: Number,
    },
    title: {
        type: String,
    },

    featured: {
      type: Boolean,
    },

    image: {
      type: String,
    }
},
  {
    timestamps: true,
  }
);
FitCategories.plugin(mongoosePaginate);
FitCategories.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('fitcategories', FitCategories);
