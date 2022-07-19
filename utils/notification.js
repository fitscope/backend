// let apn = require("apn"),
let FCM = require('fcm-node');
// let serverKey = 'AAAAlNBR8bA:APA91bGYv4jc5n71RReagYExpkVuogU7h0x6uZRqfjyvR8YTa8WJAX8lbPq7fvnZ6LoVfmT3QgEtSYvzGvbsC6-hdOqpiWWuO8zysI8PsVfgSlIKOx8SYLZA7U27QFSjQSExnUEBxD8D';

let serverKey = 'AAAAZ4QgJFk:APA91bH504ksF2S_iNPK9wC9Z396sUr5atqhRYwvCPD9guUDZx6--lbg9LrZL1e_qWtZgF59d9lAi7pNLkA3DUrsDoEYc07LCnVCM4b2j1-tHJRycfgwa18gxYkby2MnC08nHrfPzxkp';
let fcm = new FCM(serverKey);

const accountSid = 'ACb4a3f5ab788a7c13ebde2ea1f6b47650';
const authToken = '38c68f002a896982c2bda80cba3e22c2';

exports.sendNotificationWithFireBase=(deviceToken, title, body,type,data,datacallback)=>{
    console.log("Token is=======>",deviceToken);
    for (let index = 0; index < deviceToken.length; index++) {
        const element = deviceToken[index];

        var message = {
            to: element,
            notification: {
                title:title, 
                body: body,
                sound:'default',
                type:type
            },
            data: {
                title: title,
                body: body,
                sound:'default',
                type:type,
                data:data
            }
        };
        console.log("Message is=========>",message);
        fcm.send(message, function(err, response) {
            if (err) {
              console.log("Error in sending notification===========>",err);
              datacallback( err)
            } else {
                console.log('Notification send successfully',response);
                datacallback( response)
                
            }
        })
        
    }

}