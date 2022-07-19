let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let FitCategoriesDetails = mongoose.Schema(
  {
    id: {
      type: Number,
    },
    title: {
        type: String,
    },

    vertical_preview: {
      type: Boolean,
    },

    horizontal_preview: {
      type: String,
    },
    trailer: {
        type: String,
    },
    chapters:{
        type:Array
    },
    has_access: {
        type: String,
    },
    show_trailer: {
        type: String,
    },
    description: {
        type: String,
    },
    description_html: {
        type: String,
    },
    chapters_count: {
        type: String,
    },
    author: {
        type: String,
    },
    in_favorites: {
        type: Boolean,
      },
},
  {
    timestamps: true,
  }
);
FitCategoriesDetails.plugin(mongoosePaginate);
FitCategoriesDetails.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('fitcategoriesdetails', FitCategoriesDetails);
