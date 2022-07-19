let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;
let CategoriesDetails = mongoose.Schema(
  {
    categoryId: {
      type: Number,
    },
    categoryIdMongo: {
      type: Schema.Types.ObjectId, ref: 'categories'
    },
    categoryTitle: {
      type: String,
    },
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    vertical_preview: {
      type: String
    },
    horizontal_preview: {
        type: String
      },
    trailer: {
        type: String
      },
    // chapters: {
    //     type: Array
    //   },
    show_trailer: {
        type: String
      },
    description: {
        type: String
      },
    description_html: {
        type: String
      },
    chapters_count: {
        type: Number
      },
    author: {
        type: Object
      },
    authorId: {
        type: Number
      },
    authorTitle: {
        type: String
      },
    authorDescription: {
        type: String
      },
    authorImage: {
        type: String
      },
      lastsyncTime: {
        type: Number,
        default:0
      },
  
},
  {
    timestamps: true,
  }
);
CategoriesDetails.plugin(mongoosePaginate);
CategoriesDetails.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('categoriesprograms', CategoriesDetails);
