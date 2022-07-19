const fs = require('fs');
var AWS = require('aws-sdk');
AWS.config = {
    "accessKeyId": 'AKIAV65DEK7Y7MW6N3R6',
    "secretAccessKey": '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',
    "region": 'us-east-2',

};
const s3 = new AWS.S3({ region: 'us-east-2' })
const BucketName = 'youpick'
exports.upload = (file, path) => {

    return new Promise((resolve, reject) => {
        var tmp_path = file.path;
        image = fs.createReadStream(tmp_path);
        imageName = path + Date.now() + "-" + file.name;
        const params = {
            Bucket: BucketName,
            Key: imageName,
            ACL: 'public-read',
            Body: image,
            ContentType: file.type
        };
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
        })
    })
}
exports.uploadPath= (file, path) => {

    return new Promise((resolve, reject) => {
        var tmp_path = file.path;
        image = fs.createReadStream(tmp_path);
        imageName = path + Date.now() + "-" + file.name;
        const params = {
            Bucket: BucketName,
            Key: imageName,
            ACL: 'public-read',
            Body: image,
            ContentType: file.type
        };
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                console.log(data)
                resolve(data.Location);
            }
        })
    })
}

exports.deleteImage = (file) => {

    return new Promise((resolve, reject) => {
        let newImage = file.split('https://wow-won-images.s3.us-west-2.amazonaws.com/')[1]
        s3.deleteObject({
            Bucket: BucketName,
            Key: newImage
        }, (err, data) => {
            if (err)reject(err)
            else resolve(data)
        })
    })
}






