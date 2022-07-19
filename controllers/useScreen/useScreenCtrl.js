const { ObjectId } = require("mongodb");

const CategoryModel = require("../../models/categoryModel.js");
const CategoeyProgramModel = require("../../models/categoeyProgramModel.js");
const ChapterModel = require("../../models/chapterModel.js");
const AuthorModel = require("../../models/authorModel.js");
const FilterModel = require("../../models/filterModel.js");

const https = require("https");
// const PaytmChecksum = require('./PaytmChecksum');

const response = require("../../utils/httpResponseMessage");
const statusCode = require("../../utils/httpResponseCode");

const { body, check, oneOf, validationResult } = require("express-validator");


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
          console.log(body); // Show the HTML for the Google homepage.

          let data = JSON.parse(body);

          for (let index = 0; index < data.length; index++) {
            const element = data[index];

            let findCate = await CategoryModel.findOne({ id: element.id });
            if (findCate) {
              let update = await CategoryModel.update(
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

  getCategoryDetail: async (req, res) => {
    try {
      let timestamp = new Date().getTime();

      console.log(timestamp);

      let tenmint = 10 * 60 * 1000;
      let finalTime = timestamp - tenmint;

      let findCate = await CategoryModel.findOne({
        lastsyncTime: { $lte: finalTime },
      });

      if (findCate) {
        const options = {
          url: `https://www.uscreen.io/api/v1/categories/${findCate.id}/programs?per_page=10000&page=1`,
          headers: {
            "Content-Type": "application/json",
            "X-Store-Token": "+/0ykksCgV8f2w==",
          },
        };

        request(options, async (error, responseReq, body) => {
          if (!error && responseReq.statusCode == 200) {
            console.log(body); // Show the HTML for the Google homepage.

            let data = JSON.parse(body);

            let dataValue = [];
            let chapters = [];
            // return response.responseHandlerWithData(
            //   res,
            //   200,
            //   "Category details has been updated successfully",
            //   data
            // );

            for (let index = 0; index < data.length; index++) {
              const element = data[index];

              dataValue.push({
                categoryId: findCate.id,
                categoryIdMongo: findCate._id,
                categoryTitle: findCate.title,
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

              for (let indexx = 0; indexx < element.chapters.length; indexx++) {
                const chapterElement = element.chapters[indexx];
                chapters.push({
                  categoryId: findCate.id,
                  categoryIdMongo: findCate._id,
                  categoryTitle: findCate.title,
                  programId: element.id,
                  programTitle: element.title,
                  id: chapterElement.id,
                  type: chapterElement.type,
                  details_url: chapterElement.details_url,
                  enroll_image: chapterElement.enroll_image,
                  preview_image: chapterElement.preview_image,
                  has_access: chapterElement.has_access,
                  available_at: chapterElement.available_at,
                  title: chapterElement.title,
                  duration: chapterElement.duration,
                });
              }

              if (data.length - 1 == index) {
                let deleteNoti = await CategoryModel.findByIdAndUpdate(
                  { _id: findCate._id },
                  { $set: { lastsyncTime: timestamp } },
                  { new: true, lean: true }
                );
                savePrograms(dataValue, timestamp);
                return response.responseHandlerWithData(
                  res,
                  200,
                  "Category details has been updated successfully",
                  { dataValue, chapters }
                );
              }

              // let findCate = await CategoryModel.findOne({ id: element.id });
              // if (findCate) {
              //   let update = await CategoryModel.update(
              //     { id: findCate.id },
              //     { $set: element }
              //   );
              // } else {
              //   let create = await CategoryModel.create(element);
              // }
            }

            // return response.responseHandlerWithData(
            //   res,
            //   200,
            //   "Category has been updated successfully",
            //   data
            // );
          } else {
            console.log("Error " + responseReq.statusCode);
          }
        });
      } else {
        return response.responseHandlerWithData(
          res,
          200,
          "Category has empty  value successfully",
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

  getAuthor: async (req, res) => {
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

          console.log(data);

          for (let index = 0; index < data.length; index++) {
            const element = data[index];

            let author = await AuthorModel.findOne({ id: element.id });

            if (author) {
              let update = await AuthorModel.findByIdAndUpdate(
                { _id: author._id },
                { $set: element }
              );
            } else {
              let create = await AuthorModel.create(element);
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
  setFilter: async (req, res) => {
    let filter = [
      {
        key: "Difficulty Level",
        sort: 1,
        value: [
          "Beginner",
          "Intermediate",
          "Advanced",
          "Low Impact",
          "Prenatal",
        ],
      },
      {
        key: "Equipment",
        sort: 2,
        value: [
          "No Equipment - Bodyweight",
          "Indoor Bicycle",
          "Elliptical Machine",
          "Treadmill",
          "Rowing Machine",
          "Airbike",
          "Mat",
          "Yoga Blocks",
          "Yoga Strap",
          "Bolster",
          "Blanket",
          "Dumbbells",
          "Kettlebells",
          "Slam/Medicine Ball",
          "Resistance Band/Tube",
          "Stability/Swiss Ball",
          "Foam Roller",
          "Recumbent Bike",
          "Max Trainer",
        ],
      },
      {
        key: "Music Genre",
        sort: 3,
        value: [
          "Current Hits",
          "House Remixes",
          "Indie",
          "Instrumental",
          "Rock",
          "Hip Hop",
          "Country",
          "Latin",
          "Chill",
          "00s",
          "90s",
          "80s",
          "70s",
          "60s",
          "No Music",
          "R&B",
          "Disco",
          "Electronic",
        ],
      },
      {
        key: "Graphics",
        sort: 4,
        value: ["Yes", "No"],
      },
      {
        key: "Exercise Goal",
        sort: 4,
        value: ["Strength Building", "Endurance", "Toning & Conditioning"],
      },
    ];

    for (let index = 0; index < filter.length; index++) {
      const element = filter[index];
      let author = await FilterModel.findOne({ key: element.key });

      if (author) {
        let update = await FilterModel.findByIdAndUpdate(
          { _id: author._id },
          { $set: element }
        );
      } else {
        let create = await FilterModel.create(element);
      }
      
    }

    return response.responseHandlerWithData(
      res,
      200,
      "filter has been updated successfully",
      filter
    );
  },
};

async function savePrograms(dataValue, lastsyncTime) {
  for (let index = 0; index < dataValue.length; index++) {
    var element = dataValue[index];
    element.lastsyncTime = lastsyncTime;
    let findCate = await CategoeyProgramModel.findOne({ id: element.id });
    if (findCate) {
      let update = await CategoeyProgramModel.update(
        { id: findCate.id },
        { $set: element }
      );

      // categoryId:findCate.id,
      //             categoryIdMongo:findCate._id,
      //             programId: element.id,
      //             programTitle: element.title,

      // "categoryId": 40428,
      //           "categoryIdMongo": "624e8bf8aae06570f97c1eda",
      //           "categoryTitle": "FEATURED",

      let chapters = element.chapters;
      let chaptersData = chapters.map((it) => {
        it.categoryId = findCate.categoryId;
        it.categoryIdMongo = findCate.categoryIdMongo;
        it.categoryTitle = findCate.categoryTitle;
        it.programId = findCate.id;
        it.programTitle = findCate.title;
        it.programImage = findCate.horizontal_preview;
        it.programIdMongo = findCate._id;
        it.searchKey =
          findCate.categoryTitle == "FEATURED"
            ? findCate.categoryTitle
            : findCate.title;
        return it;
      });
      saveVideo(chaptersData, lastsyncTime);
    } else {
      let create = await CategoeyProgramModel.create(element);

      let chapters = element.chapters;
      let chaptersData = chapters.map((it) => {
        it.categoryId = create.categoryId;
        it.categoryIdMongo = create.categoryIdMongo;
        it.categoryTitle = create.categoryTitle;
        it.programId = create.id;
        it.programTitle = create.title;
        it.programIdMongo = create._id;
        it.programImage = create.horizontal_preview;
        it.searchKey =
          create.categoryTitle == "FEATURED"
            ? create.categoryTitle
            : create.title;
        return it;
      });
      saveVideo(chaptersData, lastsyncTime);
    }
  }
}

async function saveVideo(dataValue, lastsyncTime) {
  for (let index = 0; index < dataValue.length; index++) {
    var element = dataValue[index];
    element.lastsyncTime = lastsyncTime;
    let findCate = await ChapterModel.findOne({ id: element.id });
    if (findCate) {
      let update = await ChapterModel.update(
        { id: findCate.id },
        { $set: element }
      );
    } else {
      let create = await ChapterModel.create(element);
    }
  }
}
