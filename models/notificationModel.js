let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let Notification = mongoose.Schema(
  {
    title: {
        type: String,
    },
    message: {
      type: String,
    }
},
  {
    timestamps: true,
  }
);
Notification.plugin(mongoosePaginate);
Notification.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('notifications', Notification);
