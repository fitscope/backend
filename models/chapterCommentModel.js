let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let ChapterComment = mongoose.Schema(
  {
    userName: {
        type: String,
    },
    userId: {
      type: Number,
    },
    chapterId: {
      type: Number,
    },
    comment:{
        type:String
    },
    user: {
      id: { type: Number },
      name:{ type: String},
      email:{ type: String},
      avatar_url:{ type: String},
  },
},
  {
    timestamps: true,
  }
);
ChapterComment.plugin(mongoosePaginate);
ChapterComment.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('chaptercomments', ChapterComment);
