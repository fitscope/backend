let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let ChapterSave = mongoose.Schema(
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
ChapterSave.plugin(mongoosePaginate);
ChapterSave.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('chaptersaves', ChapterSave);
