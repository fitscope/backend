let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let scheduleChapters = mongoose.Schema(
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
    date: {
        type: Date,
    },
    dateValue:{
        type: String,
    },
    time: {
        type: String,
    },
    timeInMint: {
        type: Number,
    },
    type: {
        type: String,
        enum:['Complete','Schedule']
    },
},
  {
    timestamps: true,
  }
);
scheduleChapters.plugin(mongoosePaginate);
scheduleChapters.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('schedulechapters', scheduleChapters);
