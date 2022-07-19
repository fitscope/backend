let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let ChapterFavorites = mongoose.Schema(
  {
    userName: {
        type: String,
    },
    userId: {
      type: Number,
    },
    chapterId: {
      type: Number,
    }
},
  {
    timestamps: true,
  }
);
ChapterFavorites.plugin(mongoosePaginate);
ChapterFavorites.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('chapterfavorites', ChapterFavorites);
