let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");
let mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
let Schema = mongoose.Schema;
let ChaptersAddOnes = mongoose.Schema(
  {
  
    chapterId: {
      type: Number,
    },
   
    trainer: {
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
    lastsyncTime: {
        type: Number,
        default:0
      },
  },
  {
    timestamps: true,
  }
);
ChaptersAddOnes.plugin(mongoosePaginate);
ChaptersAddOnes.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("chaptersaddones", ChaptersAddOnes);
