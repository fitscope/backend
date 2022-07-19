let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");
let mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
let Schema = mongoose.Schema;
let Chapters = mongoose.Schema(
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
    searchKey: {
      type: String,
    },
    programId: {
      type: Number,
    },
    programIdMongo: {
        type: Schema.Types.ObjectId, ref: 'categoriesprograms'
      },
    programTitle: {
      type: String,
    },

    programImage: {
      type: String,
    },
    id: {
      type: Number,
    },
    type: {
      type: String,
    },
    details_url: {
      type: String,
    },
    enroll_image: {
      type: String,
    },
    preview_image: {
      type: String,
    },
    has_access: {
      type: Boolean,
    },
    available_at: {
      type: String,
    },
    title: {
      type: String,
    },
    trainer: {
      type: String,
      default:''
    },
    shortDescription: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    authorDescription: {
      type: String,
    },
    videoData: {
      type: String,
      default:''
    },
    difficulty: {
      type: String,
      default:''
    },
    goal: {
      type: String,
      default:''
    },
    music: {
      type: String,
      default:''
    },
    duration: {
      type: Number,
    },
    authorTitle:{
      type: String,
    },
    authorId:{
      type: Number,
    },
    videoIds:{
      type:Array
    },
    videoIds:{
      type:Array
    },
    allProgramIds:{
      type:Array
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
Chapters.plugin(mongoosePaginate);
Chapters.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("chapters", Chapters);
