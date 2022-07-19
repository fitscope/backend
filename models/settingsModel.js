let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let Settings = mongoose.Schema(
  {
    
    type:{ type: String},
    settings:{ type: Array},
},
  {
    timestamps: true,
  }
);
Settings.plugin(mongoosePaginate);
Settings.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('settings', Settings);
