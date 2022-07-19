let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let Filter = mongoose.Schema(
  {
    key: {
        type: String,
    },
    sort: {
      type: Number,
    },
    value: {
      type: Array,
    },
},
  {
    timestamps: true,
  }
);
Filter.plugin(mongoosePaginate);
Filter.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('filters', Filter);
