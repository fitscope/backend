const { ObjectId } = require("mongodb");

const CategoryModel = require("../../models/categoryModel.js");
const CategoeyProgramModel = require("../../models/categoeyProgramModel.js");
const ChapterModel = require("../../models/chapterModel.js");
const ChapterAddOnesModel = require("../../models/chapterAddOnesModel.js");
const AuthorModel = require("../../models/authorModel.js");


const https = require("https");
// const PaytmChecksum = require('./PaytmChecksum');

const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");

const { body, check, oneOf, validationResult } = require("express-validator");

/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};

const request = require("request");
module.exports = {
  //=============================================state list=====================================//
  getCategory: async (req, res) => {
    try {
      const options = {
        url: "https://www.uscreen.io/api/v1/categories",
        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w==",
        },
      };

      request(options, async (error, responseReq, body) => {
        if (!error && responseReq.statusCode == 200) {
          // console.log(body); // Show the HTML for the Google homepage.

          let data = JSON.parse(body);
         
          for (let index = 0; index < data.length; index++) {
            const element = data[index];

            let findCate = await CategoryModel.findOne({ id: element.id });
            if (findCate) {
              let update = await CategoryModel.updateOne(
                { id: findCate.id },
                { $set: element }
              );
            } else {
              let create = await CategoryModel.create(element);
            }
          }

          return response.responseHandlerWithData(
            res,
            200,
            "Category has been updated successfully",
            data
          );
        } else {
          // console.log("Error " + responseReq.statusCode);
        }
      });
    } catch (error) {
      response.log("Error is============>", error);
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Internal server error"
      );
    }
  },

  setSyncDefault: async (req, res) => {
    // let findCate = await CategoeyProgramModel.remove()
    // let program = await ChapterModel.remove()
    let cat = await CategoryModel.updateMany({},{$set:{lastsyncTime:0}})
    return response.responseHandlerWithData(
      res,
      200,
      "reset successfully",
      cat
    );
  },
  getCategoryDetail: async (req, res) => {
    try {
      let timestamp = new Date().getTime();
      let tenmint = 10 * 60 * 1000;
      let finalTime = timestamp - tenmint;

     let findCate = await CategoryModel.findOne({
        lastsyncTime: { $lte: finalTime },
      });

      if (findCate) {
 
       setTimeout(function(){
        // for (let index = 0; index < findCateList.length; index++) {
          const options = {
             url: `https://www.uscreen.io/api/v1/categories/${findCate.id}/programs?per_page=10000&page=1`,
             headers: {
               "Content-Type": "application/json",
               "X-Store-Token": "+/0ykksCgV8f2w==",
             },
           };
         
           request(options, async (error, responseReq, body) => {
             if (!error && responseReq.statusCode == 200) {
               // console.log(body); // Show the HTML for the Google homepage.
         
               let data = JSON.parse(body);
         
               let dataValue = [];
       
               for (let index = 0; index < data.length; index++) {
                 const element = data[index];
         
                 dataValue.push({
                   categoryId:findCate.id,
                   categoryIdMongo:findCate._id,
                   categoryTitle:findCate.title,
                   id: element.id,
                   title: element.title,
                   vertical_preview: element.vertical_preview,
                   horizontal_preview: element.horizontal_preview,
                   trailer: element.trailer,
                   chapters: element.chapters,
                   show_trailer: element.show_trailer,
                   description: element.description,
                   description_html: element.description_html,
                   chapters_count: element.chapters_count,
                   author: element.author,
                   authorId: element.author?.id,
                   authorTitle: element.author?.title,
                   authorDescription: element.author?.description,
                   authorImage: element.author?.image,
                 });
                  
                 console.log({categoryId:findCate.id,categoryTitle:findCate.title,id:element.id,chapters_count:element.chapters.length})
                 if (data.length - 1 == index) {
                  savePrograms(dataValue,timestamp,findCate._id)
                   

                   let deleteNoti = await CategoryModel.findByIdAndUpdate(
                     { _id: findCate._id },
                     { $set: { lastsyncTime: timestamp } },
                     { new: true, lean: true }
                   );
                  
                  
                 }
               }
         
           
             } else {
               
             }
           });

           
             return response.responseHandlerWithData(
                 res,
                 200,
                 "Chapter details has been updated successfully",
                 findCate
               );
          //  }
          
      // }
    }, 10000);
    
    
       
      }else{
        return response.responseHandlerWithData(
          res,
          200,
          "Chapter has already updated please try after some time",
          findCate
        );
      }
 
    } catch (error) {
      response.log("Error is============>", error);
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Internal server error"
      );
    }
  },

  getAuthor: async (req,res)=>{
    try {
      const options = {
        url: "https://www.uscreen.io/api/v1//authors",
        headers: {
          "Content-Type": "application/json",
          "X-Store-Token": "+/0ykksCgV8f2w==",
        },
      };

      request(options, async (error, responseReq, body) => {
        if (!error && responseReq.statusCode == 200) {
          console.log(body); // Show the HTML for the Google homepage.

          let data = JSON.parse(body);

            console.log(data)

            for (let index = 0; index < data.length; index++) {
              const element = data[index];

              let author = await AuthorModel.findOne({id:element.id})
              
              if(author){
                let update = await AuthorModel.findByIdAndUpdate({_id:author._id},{$set:element})
              }else{
                let create = await AuthorModel.create(element)
              }
            }

          return response.responseHandlerWithData(
            res,
            200,
            "filter has been updated successfully",
            data
          );
        } else {
          console.log("Error " + responseReq.statusCode);
        }
      });
    } catch (error) {
      response.log("Error is============>", error);
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Internal server error"
      );
    }
  },

  filterOutData: async (req, res) => {
  
    let cateoryId=req.body.cateoryId
    let cat = await CategoryModel.findOne({id:cateoryId})

    // for (let index = 0; index < cat.length; index++) {
      const element = cat

      let programIds=element.allProgramIds
      let videoIds=element.videoIds


    let  CategoryProgram= await  CategoeyProgramModel.find({
      categoryId:element.id,
    })

    let chapter = await  ChapterModel.find({
      categoryId:element.id,
    })

    for (let index = 0; index < CategoryProgram.length; index++) {
      const elementp = CategoryProgram[index];
      if(programIds.indexOf(elementp.id)==-1){
      let remo= await CategoeyProgramModel.remove({id:elementp.id, cateoryId:cateoryId})
      }
      
    }


    for (let index = 0; index < chapter.length; index++) {
      const elementc = chapter[index];
      if(videoIds.indexOf(elementc.id)==-1){
      let remo= await ChapterModel.remove({id:elementc.id, cateoryId:cateoryId})
      }
      
    }
    //   let findCate = await CategoeyProgramModel.deleteMany({ 
    //     categoryId:element.id,
    //     id: {$nin:element.allProgramIds} }
        
        
    //     );
      
    //   let findCateChapter = await ChapterModel.deleteMany({
    //     categoryId:element.id,
    //     id: {$nin:element.videoIds} });
    // // }
    return response.responseHandlerWithData(
      res,
      200,
      "reset successfully",
      cat
    );
  },

  updateAuthorChapter: async (req, res) => {
    // let findCate = await CategoeyProgramModel.remove()
    // let program = await ChapterModel.remove()
    try {
      let dataup = await ChapterModel.find({authorId:{$exists:true}})

    for (let index = 0; index < dataup.length; index++) {
      const element = dataup[index];
      let data= await ChapterModel.updateMany({title:element.title},{$set:{
        authorDescription:element.authorDescription, 
        authorId:element.authorId,
        authorTitle:element.authorTitle

      }})
      
    }
    return response.responseHandlerWithData(
      res,
      200,
      "reset successfully",
      dataup
    );  
    } catch (error) {
      response.log("Error is============>", error);
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Internal server error"
      );
    }
  },

  updateAuthorProgram: async (req, res) => {
    // let findCate = await CategoeyProgramModel.remove()
    // let program = await ChapterModel.remove()
    try {
      let dataup = await CategoeyProgramModel.find({authorId:{$exists:true}})

    for (let index = 0; index < dataup.length; index++) {
      const element = dataup[index];
      let data= await ChapterModel.updateMany({title:element.title},{$set:{
        authorDescription:element.authorDescription, 
        authorId:element.authorId,
        authorTitle:element.authorTitle

      }})
      
    }
    return response.responseHandlerWithData(
      res,
      200,
      "reset successfully",
      dataup
    );  
    } catch (error) {
      response.log("Error is============>", error);
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Internal server error"
      );
    }
  },
  updateLongdescriptionChapter: async (req, res) => {
    // let findCate = await CategoeyProgramModel.remove()
    // let program = await ChapterModel.remove()

    try {
      let dataup = await ChapterModel.find({longDescription:{$ne: null}})

      for (let index = 0; index < dataup.length; index++) {
        const element = dataup[index];
        let data= await ChapterModel.updateMany({title:element.title},{$set:{
          longDescription:element.longDescription
  
        }})
        
      }
      return response.responseHandlerWithData(
        res,
        200,
        "reset successfully",
        dataup
      );
    } catch (error) {
      response.log("Error is============>", error);
      return response.responseHandlerWithMessage(
        res,
        statusCode.ERROR,
        "Internal server error"
      );
    }
   
  },
};


async function savePrograms(dataValue,lastsyncTime,categoryId){
  let allProgramIds=[]
  for (let index = 0; index < dataValue.length; index++) {
    var element = dataValue[index];
    element.lastsyncTime=lastsyncTime
    allProgramIds.push(element.id)
    let findCate = await CategoeyProgramModel.findOne({ id: element.id });
    if (findCate) {
      let update = await CategoeyProgramModel.updateOne(
        { id: findCate.id },
        { $set: element }
      );
      let chapters=element.chapters
      let chaptersData=chapters.map(it=>{
        it.categoryId=findCate.categoryId
        it.categoryIdMongo=findCate.categoryIdMongo
        it.categoryTitle=findCate.categoryTitle
        it.programId= findCate.id
        it.programTitle= findCate.title
        it.authorId= findCate.authorId,
        it.authorTitle= findCate.authorTitle,
        it.programImage= findCate.horizontal_preview
        it.programIdMongo=findCate._id
        it.searchKey=findCate.categoryTitle=='FEATURED'?findCate.categoryTitle:findCate.title

        if(findCate.description && findCate.description.trim()){
          it.longDescription=findCate.description.trim()
        }
        if(findCate.authorDescription && findCate.authorDescription.trim()){
          it.authorDescription=findCate.authorDescription.trim()
        }
        return it
      })
      saveVideo(chaptersData,lastsyncTime,categoryId)
    } else {
      let create = await CategoeyProgramModel.create(element);

      let chapters=element.chapters
      let chaptersData=chapters.map(it=>{
        it.categoryId=create.categoryId
        it.categoryIdMongo=create.categoryIdMongo
        it.categoryTitle=create.categoryTitle
        it.programId= create.id
        it.programTitle= create.title
        it.authorId= create.authorId,
        it.authorTitle= create.authorTitle,
        it.programIdMongo=create._id
        it.programImage= create.horizontal_preview
        it.searchKey=create.categoryTitle=='FEATURED'?create.categoryTitle:create.title
        if(create.description && create.description.trim()){
          it.longDescription=create.description.trim()
        }
        if(create.authorDescription && create.authorDescription.trim()){
          it.authorDescription=create.authorDescription.trim()
        }
        return it
      })
      saveVideo(chaptersData,lastsyncTime,categoryId)
    }
  }
  let deleteNoti = await CategoryModel.findByIdAndUpdate(
    { _id: categoryId },
    { $set: { allProgramIds: allProgramIds } },
    { new: true, lean: true }
  );
}


async function saveVideo (dataValue,lastsyncTime,categoryId){
  let videoIds=[]
  for (let index = 0; index < dataValue.length; index++) {
    var element = dataValue[index];
    element.lastsyncTime=lastsyncTime
    videoIds.push(element.id)
    let findCate = await ChapterModel.findOne({ id: element.id });
    if (findCate) {
      let update = await ChapterModel.updateOne(
        { id: findCate.id },
        { $set: element }
      );
      updateShortDescription(findCate.id,findCate._id)
      let extistinng = await ChapterAddOnesModel.findOne({
        chapterId: findCate.id,
      });
  
      let dataupdate;

      if(extistinng){
        let data = await ChapterModel.findByIdAndUpdate(
          { _id: findCate._id },
          {
            $set: {
              trainer:extistinng.trainer,
              difficulty:extistinng.difficulty,
              goal:extistinng.goal,
              music:extistinng.music,
            },
          }
        );
       
      }
    } else {
      let create = await ChapterModel.create(element);

      updateShortDescription(create.id,create._id)
      let extistinng = await ChapterAddOnesModel.findOne({
        chapterId: create.id,
      });
  
      let dataupdate;

      if(extistinng){
        let data = await ChapterModel.findByIdAndUpdate(
          { _id: create._id },
          {
            $set: {
              trainer:extistinng.trainer,
              difficulty:extistinng.difficulty,
              goal:extistinng.goal,
              music:extistinng.music,
            },
          }
        );
      }
  
    
    }

    console.log(element.longDescription)
    // if(!element.longDescription){
    //   Chapter(element)
    // }else{
    //   updateLongIfHaveDescription(element)
    // }

    // if(!element.authorDescription){
    //   updateAuthor(element)
    // }else{
    //   updateIfHaveAuthor(element)
    // }
  }
  let deleteNoti = await CategoryModel.findByIdAndUpdate(
    { _id: categoryId },
    { $set: { videoIds: videoIds } },
    { new: true, lean: true }
  );
}


async function Chapter(element) {

  let dataup = await ChapterModel.findOne({title:element.title, longDescription: {$ne: null}})

  if(dataup){
   let data= await ChapterModel.updateMany({title:element.title},{$set:{longDescription:dataup.longDescription}})
  }
}

async function updateLongIfHaveDescription(element) {

 
   let data= await ChapterModel.updateMany({title:element.title},{$set:{longDescription:element.longDescription}})
  
}

async function updateAuthor(element) {

  let dataup = await ChapterModel.findOne({title:element.title, authorDescription: {$ne: null}})

  if(dataup){
   let data= await ChapterModel.updateMany({title:element.title},{$set:{authorDescription:dataup.authorDescription}})
  }
}


async function updateIfHaveAuthor(element) {

  
   let data= await ChapterModel.updateMany({title:element.title},{$set:{authorDescription:element.authorDescription}})
  
}


async function updateShortDescription(videoId,chapterId) {
  try {
    const options = {
      url: `https://www.uscreen.io/api/v1/chapters/videos/${videoId}`,
      headers: {
        "Content-Type": "application/json",
        "X-Store-Token": "+/0ykksCgV8f2w==",
        "authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg0MzA4MDgsInN1YiI6MzAyNjQ0OX0.l2pY3YqMKWya8BbswFX_M_dwicFVbkbixwxzugV7qUY"
      },
    };

    request(options, async (error, responseReq, body) => {
      if (!error && responseReq.statusCode == 200) {
        // console.log(body); // Show the HTML for the Google homepage.

        let data = JSON.parse(body);
        console.log("inshad")
        console.log("data")
       
        let dataup = await ChapterModel.findByIdAndUpdate(
          { _id:chapterId},
          {
            $set: {
              shortDescription:data.short_description,
              videoData:body,
            },
          }
        );
      } else {
        // console.log("Error " + responseReq.statusCode);
      }
    });
  } catch (error) {
    response.log("Error is============>", error);
    return response.responseHandlerWithMessage(
      res,
      statusCode.ERROR,
      "Internal server error"
    );
  }
}