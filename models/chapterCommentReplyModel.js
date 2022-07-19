let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let ChapterCommentReply = mongoose.Schema(
  {
    commentId:{ type :Schema.Types.ObjectId,ref:"chaptercomments"},
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
ChapterCommentReply.plugin(mongoosePaginate);
ChapterCommentReply.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('chaptercommentreplies', ChapterCommentReply);
