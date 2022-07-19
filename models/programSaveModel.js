let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let ProgramSave = mongoose.Schema(
  {
    userName: {
        type: String,
    },
    userId: {
      type: Number,
    },
    programId: {
      type: Number,
    },
    categoryId: {
      type: Number,
    }
},
  {
    timestamps: true,
  }
);
ProgramSave.plugin(mongoosePaginate);
ProgramSave.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('programsaves', ProgramSave);
