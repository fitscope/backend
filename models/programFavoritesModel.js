let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let ProgramsFavorites = mongoose.Schema(
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
ProgramsFavorites.plugin(mongoosePaginate);
ProgramsFavorites.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('programsfavorites', ProgramsFavorites);
