let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let ChapterScheduleSave = mongoose.Schema(
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
    date:{
        type: Date
    },
    time:{
        type:String
    },
    timeInMint:{
        type:Number
    },
    type:{
        type:String,
        enum : ['Schedule','Complete'],
    },
    dateValue:{
        type:String,
    }
},
  {
    timestamps: true,
  }
);
ChapterScheduleSave.plugin(mongoosePaginate);
ChapterScheduleSave.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('chapterschedulesaves', ChapterScheduleSave);
