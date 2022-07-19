let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let Users = mongoose.Schema(
  {
    user: {
        id: { type: Number },
        name:{ type: String},
        email:{ type: String},
        avatar_url:{ type: String},
        custom_fields:{ type: Array},
        subscribed:{ type: Boolean},
    },
    auth: {
        
        token:{ type: String}
    },
    fcmToken:{ type: String},
    deviceType:{ type: String},
},
  {
    timestamps: true,
  }
);
Users.plugin(mongoosePaginate);
Users.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('users', Users);
