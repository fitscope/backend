let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let Author = mongoose.Schema(
  {
    title: {
        type: String,
    },
    id: {
      type: Number,
    },
    description: {
      type: String,
    },
    image:{
        type:String
    }
},
  {
    timestamps: true,
  }
);
Author.plugin(mongoosePaginate);
Author.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('authors', Author);
