let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let UserToken = mongoose.Schema(
  {
    token: {
        type: Array,
    },
},
  {
    timestamps: true,
  }
);
UserToken.plugin(mongoosePaginate);
UserToken.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('usertokens', UserToken);
