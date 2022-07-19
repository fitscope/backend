let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let Categories = mongoose.Schema(
  {
    id: {
      type: Number,
    },
    title: {
        type: String,
    },
    featured: {
      type: Boolean,
    },
    image: {
      type: String,
    },
    lastsyncTime: {
      type: Number,
      default:0
    },
    videoIds:{
      type:Array
    },
    allProgramIds:{
      type:Array
    },
  
},
  {
    timestamps: true,
  }
);
Categories.plugin(mongoosePaginate);
Categories.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('categories', Categories);
