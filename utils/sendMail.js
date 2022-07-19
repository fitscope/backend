let nodemailer = require('nodemailer')
let smtpTransport = require('nodemailer-smtp-transport');
// let realEmail = 'noreply.unodogs@gmail.com'
// let realPassword = 'Angel@3011'

 const realEmail = 'icontractormain@gmail.com';
 const realPassword = 'icontractor@2k2024';

//==================================Contact Us Template=============================//

exports.sendHtmlEmail3 = (email, subject, message, callback) => {
    let HTML;
    let welcomeMessage, copyrightMessage, imageLogo;
    imageLogo = "https://res.cloudinary.com/boss8055/image/upload/v1579161632/1024x1024.png";
    welcomeMessage = 'Welcome to Food App'
    copyrightMessage = "© Food"
    HTML = `<!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <meta name="x-apple-disable-message-reformatting">
      <title>Confirm Your Email</title>
      <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <style>
        table {border-collapse: collapse;}
        .spacer,.divider {mso-line-height-rule:exactly;}
        td,th,div,p,a {font-size: 13px; line-height: 22px;}
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family:"Segoe UI",Helvetica,Arial,sans-serif;}
      </style>
      <![endif]-->
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700|Open+Sans');
        table {border-collapse:separate;}
          a, a:link, a:visited {text-decoration: none; color: #00788a;} 
          a:hover {text-decoration: underline;}
          h2,h2 a,h2 a:visited,h3,h3 a,h3 a:visited,h4,h5,h6,.t_cht {color:#000 !important;}
          .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
          .ExternalClass {width: 100%;}
        @media only screen {
          .col, td, th, div, p {font-family: "Open Sans",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
          .webfont {font-family: "Lato",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
        }
    
        img {border: 0; line-height: 100%; vertical-align: middle;}
        #outlook a, .links-inherit-color a {padding: 0; color: inherit;}
    </style>
    </head>
    <body style="box-sizing:border-box;margin:0;padding:0;width:100%;word-break:break-word;-webkit-font-smoothing:antialiased;">
        <div width="100%" style="margin:0; background:#f5f6fa">
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:0 auto" class="">
                <tbody>
                    <tr style="margin:0;padding:0">
                        <td width="600" height="130" valign="top" class="" style="background-image:url(https://res.cloudinary.com/dnjgq0lig/image/upload/v1546064214/vyymvuxpm6yyoqjhw6qr.jpg);background-repeat:no-repeat;background-position:top center;">
                            <table width="460" height="50" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                </tbody>
                            </table>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                <tr style="margin:0;padding:0">
                                <td style="text-align:center; padding: 10px;">
                                    <img src="${imageLogo}" alt="kryptoro" width="100" class="">
                                </td>
                            </tr>
                                    <tr bgcolor="#ffffff" style="margin:0;padding:0;text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                        <td>
                                            <table width="460" class="" bgcolor="#ffffff" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                <tbody>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="30" style="text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                        </td>
                                                    </tr>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="100" style="text-align:center;background:#ffffff">
                                                            <img src="https://res.cloudinary.com/dvflctxao/image/upload/v1544705930/wp0z7cswoqigji0whe7n.png" alt="Email register" class="">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
    
                        </td>
                    </tr>
    
                    <tr>
                        <td>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="20" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="text-align:center;background:#ffffff">
                                            <p style="margin:0;font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:26px;line-height:26px;color:#272c73!important;font-weight:600;margin-bottom:20px">${welcomeMessage}</p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:center;font-weight:300">
                                            <p style="margin:0 30px;color:#3a4161"><h4>${message}</h4></p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="30" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:17px;font-weight:bold;line-height:20px;color:#ffffff">
                                            <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin:auto">
                                                <tbody>
                                                    <tr style="margin:0;padding:0">
                                                        <td>
                       
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td height="40" bgcolor="#ffffff" style="background:#ffffff;font-size:0;line-height:0;border-bottom-left-radius:4px;border-bottom-right-radius:4px">
                                            &nbsp;
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr style="margin:0;padding:0">
                        <td height="30" style="font-size:0;line-height:0;text-align:center">
                        &nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:auto" class="">
                <tbody>
    
          <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
    
                <tr style="margin:0;padding:0">
                    <td valign="middle" style="width:100%;font-size:13px;text-align:center;color:#aeb2c6!important" class="m_-638414352698265372m_619938522399521914x-gmail-data-detectors">
                        <p style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;line-height:16px;font-size:13px!important;color:#aeb2c6!important;margin:0 30px">${copyrightMessage}. All rights reserved.</p>
                    </td>
                </tr>
                <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
            </tbody></table>
        </div>
    </body>
    </html>`

    transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: realEmail,
            pass: realPassword
        }
    }))
    var messageObj = {
        from: 'No reply<a2karya8055@gmail.com>',
        to: email,
        subject: subject,
        html: HTML,

    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("Error and Info is===========", err, info);
        if (err) {
            callback(null, err);
        } else if (info) {
            callback(null, info)

        }
    })


}

//==================================Admin Forgot Password===========================//

exports.sendHtmlEmail = (email, subject, message, callback) => {
    let HTML;
    let welcomeMessage, copyrightMessage, imageLogo;
    imageLogo = "https://res.cloudinary.com/boss8055/image/upload/v1579161632/1024x1024.png";
    welcomeMessage = 'Welcome to Food App'
    copyrightMessage = "© Food"
    HTML = `<!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <meta name="x-apple-disable-message-reformatting">
      <title>Confirm Your Email</title>
      <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <style>
        table {border-collapse: collapse;}
        .spacer,.divider {mso-line-height-rule:exactly;}
        td,th,div,p,a {font-size: 13px; line-height: 22px;}
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family:"Segoe UI",Helvetica,Arial,sans-serif;}
      </style>
      <![endif]-->
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700|Open+Sans');
        table {border-collapse:separate;}
          a, a:link, a:visited {text-decoration: none; color: #00788a;} 
          a:hover {text-decoration: underline;}
          h2,h2 a,h2 a:visited,h3,h3 a,h3 a:visited,h4,h5,h6,.t_cht {color:#000 !important;}
          .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
          .ExternalClass {width: 100%;}
        @media only screen {
          .col, td, th, div, p {font-family: "Open Sans",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
          .webfont {font-family: "Lato",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
        }
    
        img {border: 0; line-height: 100%; vertical-align: middle;}
        #outlook a, .links-inherit-color a {padding: 0; color: inherit;}
    </style>
    </head>
    <body style="box-sizing:border-box;margin:0;padding:0;width:100%;word-break:break-word;-webkit-font-smoothing:antialiased;">
        <div width="100%" style="margin:0; background:#f5f6fa">
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:0 auto" class="">
                <tbody>
                    <tr style="margin:0;padding:0">
                        <td width="600" height="130" valign="top" class="" style="background-image:url(https://res.cloudinary.com/dnjgq0lig/image/upload/v1546064214/vyymvuxpm6yyoqjhw6qr.jpg);background-repeat:no-repeat;background-position:top center;">
                            <table width="460" height="50" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                </tbody>
                            </table>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                <tr style="margin:0;padding:0">
                                <td style="text-align:center; padding: 10px;">
                                    <img src="${imageLogo}" alt="kryptoro" width="100" class="">
                                </td>
                            </tr>
                                    <tr bgcolor="#ffffff" style="margin:0;padding:0;text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                        <td>
                                            <table width="460" class="" bgcolor="#ffffff" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                <tbody>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="30" style="text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                        </td>
                                                    </tr>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="100" style="text-align:center;background:#ffffff">
                                                            <img src="https://res.cloudinary.com/dvflctxao/image/upload/v1544705930/wp0z7cswoqigji0whe7n.png" alt="Email register" class="">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
    
                        </td>
                    </tr>
    
                    <tr>
                        <td>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="20" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="text-align:center;background:#ffffff">
                                            <p style="margin:0;font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:26px;line-height:26px;color:#272c73!important;font-weight:600;margin-bottom:20px">${welcomeMessage}</p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:center;font-weight:300">
                                            <p style="margin:0 30px;color:#3a4161"><h3>New Password</h3></p>
                                            <p style="margin:0 30px;color:#3a4161"><h4>${message}</h4></p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:center;font-weight:300">
                                            <p style="margin:0 30px;color:#3a4161"><h5>Please reset your password immediately. Do not share your password with anyone.</h5></p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:center;font-weight:300">
                                            <p style="margin:0 30px;color:#3a4161"><h4>Use this password for further login process. This is system generated mail. Do not reply. </h4></p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="30" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:17px;font-weight:bold;line-height:20px;color:#ffffff">
                                            <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin:auto">
                                                <tbody>
                                                    <tr style="margin:0;padding:0">
                                                        <td>
                       
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td height="40" bgcolor="#ffffff" style="background:#ffffff;font-size:0;line-height:0;border-bottom-left-radius:4px;border-bottom-right-radius:4px">
                                            &nbsp;
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr style="margin:0;padding:0">
                        <td height="30" style="font-size:0;line-height:0;text-align:center">
                        &nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:auto" class="">
                <tbody>
    
          <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
    
                <tr style="margin:0;padding:0">
                    <td valign="middle" style="width:100%;font-size:13px;text-align:center;color:#aeb2c6!important" class="m_-638414352698265372m_619938522399521914x-gmail-data-detectors">
                        <p style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;line-height:16px;font-size:13px!important;color:#aeb2c6!important;margin:0 30px">${copyrightMessage}. All rights reserved.</p>
                    </td>
                </tr>
                <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
            </tbody></table>
        </div>
    </body>
    </html>`

    transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: realEmail,
            pass: realPassword
        }
    }))
    var messageObj = {
        from: 'No reply<a2karya8055@gmail.com>',
        to: email,
        subject: subject,
        html: HTML,

    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("Error and Info is===========", err, info);
        if (err) {
            callback(null, err);
        } else if (info) {
            callback(null, info)

        }
    })

}

//=================================Admin reset link================================//

exports.sendHtmlEmail1 = (email, subject, name, link, callback) => {
    let HTML;
    HTML = `<!DOCTYPE html>
    <html>
    <head>
        <title>Email Verfication</title>
        <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,400,500,600,700,800,900&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0;">
        <div style="font-family: 'Poppins', sans-serif; background-color: #f3f3f3;">
            <div style=" max-width: 600px; margin: auto; width: 100%; padding: 20px 0;">
                <div style="background-color: #fff; padding: 10px; border: 1px solid #ddd;">
                    <figure style=" margin: -10px -10px 20px; background-color: #6b388e; text-align: center; padding: 15px 0;">
                        <img src="http://mobulous.co.in/Likewise/Logo.png" width="190px">
                    </figure>
                    <h3 style=" background-color: #6b388e; text-align: center; padding: 10px 0; margin: -10px -10px; color: #fff; font-weight: 500; font-size: 20px; display: none;">
                        Welcome to Likewise
                    </h3>
    
                    <h4 style="margin: 0 0 10px; color: #000; font-weight: 600; font-size: 22px;  padding: 0 20px;">
                        Hello, ${name}
                    </h4>
                    <p style=" margin: 0 0 30px; font-size: 15px; color: #545454; font-weight: 500; padding: 0 20px;">
                Change the password of your LikeWise account
                </p>
    
                    <figure style="text-align: center;">
                        <img src="http://mobulous.co.in/Likewise/Icon.png" width="190px">
                    </figure>
    
                    <p style="margin: 0 0 20px; text-align: center;">
                        <a href="${link}" target="_blank" style=" background-color: #6b388e; color: #fff; padding: 10px 120px; display: inline-block; border-radius: 5px; text-decoration: none; font-size: 17px; text-transform: capitalize;">
                        Change your password
                        </a>
                    </p>
    
                    <p style="margin: 0 0 10px; text-align: center; font-size: 15px; color: #545454; font-weight: 500;">Or Copy this link and paste in your browser</p>
                    <p style="font-size: 15px; font-weight: 500; text-align: center; margin: 0 0 20px; padding: 0 50px;">
                        <a href="javascript:void(0);" style="word-break: break-all; color: #1076ce; ">
                            ${link}
                        </a>
                    </p>
                </div>	
    
                <div style="background-color: #fff; padding: 10px; border: 1px solid #ddd; margin: 20px 0 0 0; text-align: center;">
                    <h4 style="margin: 0 0 10px; color: #000; font-weight: 600; font-size: 22px;  padding: 0;" >
                        Need Help?
                    </h4>
    
                    <h5 style="font-size: 15px; color: #545454; font-weight: 500; margin: 0 0 10px;" >
                    Please send your feedback or bugs report to: support@likewise.chat
                    </h5>
    
                    <h5 style="font-size: 15px; color: #545454; font-weight: 500; margin: 0 0 15px;" >
                        to <a style="" href="mailto:support@likewise.com">support@likewise.com</a>
                    </h5>

                </div>
            </div>
            <div style="clear: both"> </div>
        </div>
    </body>
    </html>`

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noreply.unodogs@gmail.com',
            pass: 'Angel@3011'
        }
    })
    var messageObj = {
        from: 'no-reply<noreply.unodogs@gmail.com>',
        to: email,
        subject: subject,
        text: link,
        html: HTML,

    }
    transporter.sendMail(messageObj, (err, info) => {
        if (err) {
            console.log(err);
        } else if (info) {
            console.log(info);
        }
    })
}

//===================================Forgot Password Otp============================//

exports.sendOtp = (email, subject, otp, sms, callback) => {
    let HTML;
    let welcomeMessage, copyrightMessage, imageLogo;
    imageLogo = "https://res.cloudinary.com/boss8055/image/upload/v1579161632/1024x1024.png";
    welcomeMessage = 'Welcome to Bite.Me'
    copyrightMessage = "© Bite.Me"
    HTML = `<!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <meta name="x-apple-disable-message-reformatting">
      <title>Confirm Your Email</title>
      <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <style>
        table {border-collapse: collapse;}
        .spacer,.divider {mso-line-height-rule:exactly;}
        td,th,div,p,a {font-size: 13px; line-height: 22px;}
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family:"Segoe UI",Helvetica,Arial,sans-serif;}
      </style>
      <![endif]-->
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700|Open+Sans');
        table {border-collapse:separate;}
          a, a:link, a:visited {text-decoration: none; color: #00788a;} 
          a:hover {text-decoration: underline;}
          h2,h2 a,h2 a:visited,h3,h3 a,h3 a:visited,h4,h5,h6,.t_cht {color:#000 !important;}
          .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
          .ExternalClass {width: 100%;}
        @media only screen {
          .col, td, th, div, p {font-family: "Open Sans",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
          .webfont {font-family: "Lato",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
        }
    
        img {border: 0; line-height: 100%; vertical-align: middle;}
        #outlook a, .links-inherit-color a {padding: 0; color: inherit;}
    </style>
    </head>
    <body style="box-sizing:border-box;margin:0;padding:0;width:100%;word-break:break-word;-webkit-font-smoothing:antialiased;">
        <div width="100%" style="margin:0; background:#f5f6fa">
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:0 auto" class="">
                <tbody>
                    <tr style="margin:0;padding:0">
                        <td width="600" height="130" valign="top" class="" style="background-image:url(https://res.cloudinary.com/dnjgq0lig/image/upload/v1546064214/vyymvuxpm6yyoqjhw6qr.jpg);background-repeat:no-repeat;background-position:top center;">
                            <table width="460" height="50" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                </tbody>
                            </table>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                <tr style="margin:0;padding:0">
                                <td style="text-align:center; padding: 10px;">
                                    <img src="${imageLogo}" alt="kryptoro" width="100" class="">
                                </td>
                            </tr>
                                    <tr bgcolor="#ffffff" style="margin:0;padding:0;text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                        <td>
                                            <table width="460" class="" bgcolor="#ffffff" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                <tbody>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="30" style="text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                        </td>
                                                    </tr>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="100" style="text-align:center;background:#ffffff">
                                                            <img src="https://res.cloudinary.com/dvflctxao/image/upload/v1544705930/wp0z7cswoqigji0whe7n.png" alt="Email register" class="">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
    
                        </td>
                    </tr>
    
                    <tr>
                        <td>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="20" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="text-align:center;background:#ffffff">
                                            <p style="margin:0;font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:25px;line-height:26px;color:#272c73!important;font-weight:600;margin-bottom:20px">${welcomeMessage}</p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                    <td bgcolor="#ffffff" style="text-align:center;background:#ffffff">
                                    <p style="margin:0 30px;color:#3a4161"><h4 style=" margin: 5px;"> We have sent you this mail in response to your request to login to your admin account.</h4></p>
                                        <p style="margin:0;font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:15px;line-height:15px;color:#272c73!important;font-weight:600;margin-bottom:12px">${otp}</p>
                                    </td>
                                </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:center;font-weight:300">
                                        <p style="margin:0 30px;color:#3a4161">If you have not made this request, please ignore this mail or contact our support team.</h4></p>
                                            <p style="margin:0 30px;color:#3a4161"><h4  style=" margin: 5px;">${sms}</h4></p>
                                            <p style="margin:0 30px;color:#3a4161;text-align:center"><h4  style=" margin: 5px;">Please contact@biteme.com for any queries regarding this.</h4></p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="30" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                    <td align="left" bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;font-weight:bold;line-height:20px;color:#000; padding:0 20px">
                                    Best regards, <br>
                                        Team Bite.Me.
                                    </td>
                                </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:17px;font-weight:bold;line-height:20px;color:#ffffff">
                                            <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin:auto">
                                                <tbody>
                                                    <tr style="margin:0;padding:0">
                                                        <td>
                       
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td height="40" bgcolor="#ffffff" style="background:#ffffff;font-size:0;line-height:0;border-bottom-left-radius:4px;border-bottom-right-radius:4px">
                                            &nbsp;
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr style="margin:0;padding:0">
                        <td height="30" style="font-size:0;line-height:0;text-align:center">
                        &nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:auto" class="">
                <tbody>
    
          <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
    
                <tr style="margin:0;padding:0">
                    <td valign="middle" style="width:100%;font-size:13px;text-align:center;color:#aeb2c6!important" class="m_-638414352698265372m_619938522399521914x-gmail-data-detectors">
                        <p style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;line-height:16px;font-size:13px!important;color:#aeb2c6!important;margin:0 30px">${copyrightMessage}. All rights reserved.</p>
                    </td>
                </tr>
                <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
            </tbody></table>
        </div>
    </body>
    </html>`

    transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: realEmail,
            pass: realPassword
        }
    }))
    var messageObj = {
        from: 'No reply<a2karya8055@gmail.com>',
        to: email,
        subject: subject,
        text: sms,
        html: HTML,

    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("Error and Info is===========", err, info);
        if (err) {
            callback(null, err);
        } else if (info) {
            callback(null, info)

        }
    })


}

//===================================Send Mail to owner=============================//

exports.sendMailToOwner = (email, subject, sms,comment, callback) => {
    let HTML;
    let welcomeMessage, copyrightMessage, imageLogo;
    imageLogo = "https://res.cloudinary.com/boss8055/image/upload/v1579161632/1024x1024.png";
    welcomeMessage = 'Welcome to Food App'
    copyrightMessage = "© Food"
    HTML = `<!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <meta name="x-apple-disable-message-reformatting">
      <title>Confirm Your Email</title>
      <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <style>
        table {border-collapse: collapse;}
        .spacer,.divider {mso-line-height-rule:exactly;}
        td,th,div,p,a {font-size: 13px; line-height: 22px;}
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family:"Segoe UI",Helvetica,Arial,sans-serif;}
      </style>
      <![endif]-->
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700|Open+Sans');
        table {border-collapse:separate;}
          a, a:link, a:visited {text-decoration: none; color: #00788a;} 
          a:hover {text-decoration: underline;}
          h2,h2 a,h2 a:visited,h3,h3 a,h3 a:visited,h4,h5,h6,.t_cht {color:#000 !important;}
          .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
          .ExternalClass {width: 100%;}
        @media only screen {
          .col, td, th, div, p {font-family: "Open Sans",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
          .webfont {font-family: "Lato",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
        }
    
        img {border: 0; line-height: 100%; vertical-align: middle;}
        #outlook a, .links-inherit-color a {padding: 0; color: inherit;}
    </style>
    </head>
    <body style="box-sizing:border-box;margin:0;padding:0;width:100%;word-break:break-word;-webkit-font-smoothing:antialiased;">
        <div width="100%" style="margin:0; background:#f5f6fa">
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:0 auto" class="">
                <tbody>
                    <tr style="margin:0;padding:0">
                        <td width="600" height="130" valign="top" class="" style="background-image:url(https://res.cloudinary.com/dnjgq0lig/image/upload/v1546064214/vyymvuxpm6yyoqjhw6qr.jpg);background-repeat:no-repeat;background-position:top center;">
                            <table width="460" height="50" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                </tbody>
                            </table>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                <tr style="margin:0;padding:0">
                                <td style="text-align:center; padding: 10px;">
                                    <img src="${imageLogo}" alt="kryptoro" width="100" class="">
                                </td>
                            </tr>
                                    <tr bgcolor="#ffffff" style="margin:0;padding:0;text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                        <td>
                                            <table width="460" class="" bgcolor="#ffffff" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                <tbody>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="30" style="text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                        </td>
                                                    </tr>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="100" style="text-align:center;background:#ffffff">
                                                            <img src="https://res.cloudinary.com/dvflctxao/image/upload/v1544705930/wp0z7cswoqigji0whe7n.png" alt="Email register" class="">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
    
                        </td>
                    </tr>
    
                    <tr>
                        <td>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="20" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="text-align:center;background:#ffffff">
                                            <p style="margin:0;font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:26px;line-height:26px;color:#272c73!important;font-weight:600;margin-bottom:20px">${welcomeMessage}</p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:center;font-weight:300">
                                            <p style="margin:0 30px;color:#3a4161"><h4>${sms}</h4></p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                    <td bgcolor="#ffffff" style="text-align:center;background:#ffffff">
                                    <p style="margin:0 30px;color:#3a4161"><h4>${comment}</h4></p>
                                    </td>
                                </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="30" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="left" bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;font-weight:bold;line-height:20px;color:#000; padding:0 20px">
                                        Best regards, <br>
                                            Team Just Clubbing App.
                                        </td>
                                    </tr>

                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:17px;font-weight:bold;line-height:20px;color:#ffffff">
                                            <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin:auto">
                                                <tbody>
                                                    <tr style="margin:0;padding:0">
                                                        <td>
                       
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td height="40" bgcolor="#ffffff" style="background:#ffffff;font-size:0;line-height:0;border-bottom-left-radius:4px;border-bottom-right-radius:4px">
                                            &nbsp;
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr style="margin:0;padding:0">
                        <td height="30" style="font-size:0;line-height:0;text-align:center">
                        &nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:auto" class="">
                <tbody>
    
          <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
    
                <tr style="margin:0;padding:0">
                    <td valign="middle" style="width:100%;font-size:13px;text-align:center;color:#aeb2c6!important" class="m_-638414352698265372m_619938522399521914x-gmail-data-detectors">
                        <p style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;line-height:16px;font-size:13px!important;color:#aeb2c6!important;margin:0 30px">${copyrightMessage}. All rights reserved.</p>
                    </td>
                </tr>
                <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
            </tbody></table>
        </div>
    </body>
    </html>`

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: realEmail,
            pass: realPassword
        }
    })
    var messageObj = {
        from: 'no-reply<excursity.com>',
        to: email,
        subject: subject,
        text: sms,
        html: HTML,

    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("Error and Info is===========", err, info);
        if (err) {
            console.log("error", err);
        } else if (info) {
            console.log("infor", info)

        }
    })


}

//====================================Signup Otp===================================//

exports.sendSignupOtp = (email, subject, otp, sms, callback) => {
    let HTML;
    let welcomeMessage, copyrightMessage, imageLogo;
    imageLogo = "https://res.cloudinary.com/boss8055/image/upload/v1579161632/1024x1024.png";
    welcomeMessage = 'Welcome to InnerDots'
    copyrightMessage = "© InnerDots"
    HTML = `<!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <meta name="x-apple-disable-message-reformatting">
      <title>Confirm Your Email</title>
      <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <style>
        table {border-collapse: collapse;}
        .spacer,.divider {mso-line-height-rule:exactly;}
        td,th,div,p,a {font-size: 13px; line-height: 22px;}
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family:"Segoe UI",Helvetica,Arial,sans-serif;}
      </style>
      <![endif]-->
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700|Open+Sans');
        table {border-collapse:separate;}
          a, a:link, a:visited {text-decoration: none; color: #00788a;} 
          a:hover {text-decoration: underline;}
          h2,h2 a,h2 a:visited,h3,h3 a,h3 a:visited,h4,h5,h6,.t_cht {color:#000 !important;}
          .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
          .ExternalClass {width: 100%;}
        @media only screen {
          .col, td, th, div, p {font-family: "Open Sans",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
          .webfont {font-family: "Lato",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
        }
    
        img {border: 0; line-height: 100%; vertical-align: middle;}
        #outlook a, .links-inherit-color a {padding: 0; color: inherit;}
    </style>
    </head>
    <body style="box-sizing:border-box;margin:0;padding:0;width:100%;word-break:break-word;-webkit-font-smoothing:antialiased;">
        <div width="100%" style="margin:0; background:#f5f6fa">
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:0 auto" class="">
                <tbody>
                    <tr style="margin:0;padding:0">
                        <td width="600" height="130" valign="top" class="" style="background-image:url(https://res.cloudinary.com/dnjgq0lig/image/upload/v1546064214/vyymvuxpm6yyoqjhw6qr.jpg);background-repeat:no-repeat;background-position:top center;">
                            <table width="460" height="50" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                </tbody>
                            </table>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                <tr style="margin:0;padding:0">
                                <td style="text-align:center; padding: 10px;">
                                    <img src="${imageLogo}" alt="kryptoro" width="100" class="">
                                </td>
                            </tr>
                                    <tr bgcolor="#ffffff" style="margin:0;padding:0;text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                        <td>
                                            <table width="460" class="" bgcolor="#ffffff" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                <tbody>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="30" style="text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                        </td>
                                                    </tr>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="100" style="text-align:center;background:#ffffff">
                                                            <img src="https://res.cloudinary.com/dvflctxao/image/upload/v1544705930/wp0z7cswoqigji0whe7n.png" alt="Email register" class="">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
    
                        </td>
                    </tr>
    
                    <tr>
                        <td>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="20" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="text-align:center;background:#ffffff">
                                            <p style="margin:0;font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:25px;line-height:26px;color:#272c73!important;font-weight:600;margin-bottom:20px">${welcomeMessage}</p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                    <td bgcolor="#ffffff" style="text-align:center;background:#ffffff">
                                    <p style="margin:0 30px;color:#3a4161"><h4>This is your one time password for signup.</h4></p>
                                        <p style="margin:0;font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:15px;line-height:15px;color:#272c73!important;font-weight:600;margin-bottom:12px">${otp}</p>
                                    </td>
                                </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:center;font-weight:300">
                                            <p style="margin:0 30px;color:#3a4161"><h4>${sms}</h4></p>
                                            <p style="margin:0 30px;color:#3a4161;text-align:center"><h4>Please contact contact@innerdots.com for any queries regarding this.</h4></p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="30" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                    </tr>

                                    <tr>
                                    <td align="left" bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;font-weight:bold;line-height:20px;color:#000; padding:0 20px">
                                    Best regards, <br>
                                        Team InnerDots.
                                    </td>
                                </tr>
                                
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:17px;font-weight:bold;line-height:20px;color:#ffffff">
                                            <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin:auto">
                                                <tbody>
                                                    <tr style="margin:0;padding:0">
                                                        <td>
                       
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td height="40" bgcolor="#ffffff" style="background:#ffffff;font-size:0;line-height:0;border-bottom-left-radius:4px;border-bottom-right-radius:4px">
                                            &nbsp;
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr style="margin:0;padding:0">
                        <td height="30" style="font-size:0;line-height:0;text-align:center">
                        &nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:auto" class="">
                <tbody>
    
          <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
    
                <tr style="margin:0;padding:0">
                    <td valign="middle" style="width:100%;font-size:13px;text-align:center;color:#aeb2c6!important" class="m_-638414352698265372m_619938522399521914x-gmail-data-detectors">
                        <p style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;line-height:16px;font-size:13px!important;color:#aeb2c6!important;margin:0 30px">${copyrightMessage}. All rights reserved.</p>
                    </td>
                </tr>
                <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
            </tbody></table>
        </div>
    </body>
    </html>`

    transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: realEmail,
            pass: realPassword
        }
    }))
    var messageObj = {
        from: 'No reply<a2karya8055@gmail.com>',
        to: email,
        subject: subject,
        text: sms,
        html: HTML,

    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("Error and Info is===========", err, info);
        if (err) {
            callback(null, err);
        } else if (info) {
            callback(null, info)

        }
    })


}

//====================================Verify Email=================================//

exports.sendMailVerification = (email, name, subject, link,otp, callback) => {
    let html = `<html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="">
      <meta name="author" content="">
      <title>Vendor & Users</title>
    </head>
    <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
      <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
    <div>
        <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
          <tbody>
          <tr style="margin:0;padding:0">
          <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
              <img src="https://res.cloudinary.com/a2karya80559188/image/upload/v1584446275/admin_nke1cg.jpg" alt="Email register" class="" style="height: 115px;
    width: 177px;">
          </td>
      </tr>
              <tr>
                <td style="padding: 50px 15px 10px;">Dear ${name}, </td>
              </tr>
              <tr>
              <td style="padding: 10px 15px 10px;">You recently requested to reset your password for your account. Use the below otp to reset it. Thank you for using Health Care App.</td>
            </tr>
            
              <tr>
              <td><p style="display: block; background: #4E9CAF; text-align: center; border-radius: 5px; color: white; font-weight: bold;">Your Otp is:${otp}</p></td>
              </tr>  
              <tr>
               <td style="padding: 10px 15px 10px;">If you did not requested to password reset, please ignore this mail or report to health@contact.com if you have any query.
               </td>
              </tr>      
              <tr>
                <td style="padding: 25px 15px 20px;">
                  Thanks &amp; Regards <br> Team Health Care
                  </td>
             </tr>
             <tr>
             <td style="text-align: center; padding: 20px; background-color: #4e555a; color: #eeeeee;">2021 copyright @ Health Care, All rights  reserved </td>
           </tr>
          </tbody>
        </table>
        </div>
      </div>
    </body>
   </html>`
    transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: realEmail,
            pass: realPassword
        }
    }))
    var messageObj = {
        from: 'No reply<a2karya8055@gmail.com>',
        to: email,
        subject: subject,
        html: html,

    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("Error and Info is===========", err, info);
        if (err) {
            callback(null, err);
        } else if (info) {
            callback(null, info)

        }
    })
}


//====================================Forgot password Email=================================//

exports.sendMailForgotPass = (email, name, subject, link,otp, callback) => {
    let html = `<html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="">
      <meta name="author" content="">
      <title>Vendor & Users</title>
    </head>
    <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
      <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
    <div>
        <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
          <tbody>
          <tr style="margin:0;padding:0">
          <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
              <img src="https://res.cloudinary.com/a2karya80559188/image/upload/v1584446275/admin_nke1cg.jpg" alt="Email register" class="" style="height: 115px;
    width: 177px;">
          </td>
      </tr>
              <tr>
                <td style="padding: 50px 15px 10px;">Dear ${name}, </td>
              </tr>
              <tr>
              <td style="padding: 10px 15px 10px;">You recently requested to reset your password for your account. Use the below otp to reset it. Thank you for using Health Care App.</td>
            </tr>
            
              <tr>
              <td><a href="${link}" style="display: block; background: #4E9CAF; text-align: center; border-radius: 5px; color: white; font-weight: bold;">Reset link:${link}</a></td>
              </tr>  
              <tr>
               <td style="padding: 10px 15px 10px;">If you did not requested to password reset, please ignore this mail or report to health@contact.com if you have any query.
               </td>
              </tr>      
              <tr>
                <td style="padding: 25px 15px 20px;">
                  Thanks &amp; Regards <br> Team Health Care
                  </td>
             </tr>
             <tr>
             <td style="text-align: center; padding: 20px; background-color: #4e555a; color: #eeeeee;">2021 copyright @ Health Care, All rights  reserved </td>
           </tr>
          </tbody>
        </table>
        </div>
      </div>
    </body>
   </html>`
    transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: realEmail,
            pass: realPassword
        }
    }))
    var messageObj = {
        from: 'No reply<a2karya8055@gmail.com>',
        to: email,
        subject: subject,
        html: html,

    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("Error and Info is===========", err, info);
        if (err) {
            callback(null, err);
        } else if (info) {
            callback(null, info)

        }
    })
}


//====================================Forgot password Email=================================//

exports.sendMailDoctorRegister = (email, name, subject, link,object, callback) => {
    let html = `<html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="">
      <meta name="author" content="">
      <title>Vendor & Users</title>
    </head>
    <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
      <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
    <div>
        <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
          <tbody>
          <tr style="margin:0;padding:0">
          <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
              <img src="https://res.cloudinary.com/a2karya80559188/image/upload/v1584446275/admin_nke1cg.jpg" alt="Email register" class="" style="height: 115px;
    width: 177px;">
          </td>
      </tr>
              <tr>
                <td style="padding: 50px 15px 10px;">Dear ${name}, </td>
              </tr>
              <tr>
              <td style="padding: 10px 15px 10px;">You have recently registered with health care , Thanks for showing your interest </td>
            </tr>
            
              <tr>
              <td><p  style="display: block; background: #4E9CAF; text-align: center; border-radius: 5px; color: white; font-weight: bold;">Email is:${object.email}</p>
                <p  style="display: block; background: #4E9CAF; text-align: center; border-radius: 5px; color: white; font-weight: bold;">Password is:${object.password}</p></td>
              </tr>  
              <tr>
               <td style="padding: 10px 15px 10px;">If you did not requested for register with health care then you can  report to health@contact.com.
               </td>
              </tr>      
              <tr>
                <td style="padding: 25px 15px 20px;">
                  Thanks &amp; Regards <br> Team Health Care
                  </td>
             </tr>
             <tr>
             <td style="text-align: center; padding: 20px; background-color: #4e555a; color: #eeeeee;">2021 copyright @ Health Care, All rights  reserved </td>
           </tr>
          </tbody>
        </table>
        </div>
      </div>
    </body>
   </html>`
    transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: realEmail,
            pass: realPassword
        }
    }))
    var messageObj = {
        from: 'No reply<a2karya8055@gmail.com>',
        to: email,
        subject: subject,
        html: html,

    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("Error and Info is===========", err, info);
        if (err) {
            callback(null, err);
        } else if (info) {
            callback(null, info)

        }
    })
}

//====================================Forgot password Email=================================//

exports.sendMailToSwitchUserReq = (email, name,fromUser, subject, link,object, callback) => {
    let html = `<html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="">
      <meta name="author" content="">
      <title>Vendor & Users</title>
    </head>
    <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
      <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
    <div>
        <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
          <tbody>
          <tr style="margin:0;padding:0">
          <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
              <img src="https://res.cloudinary.com/a2karya80559188/image/upload/v1584446275/admin_nke1cg.jpg" alt="Email register" class="" style="height: 115px;
    width: 177px;">
          </td>
      </tr>
              <tr>
                <td style="padding: 50px 15px 10px;">Dear ${name}, </td>
              </tr>
              <tr>
              <td style="padding: 10px 15px 10px;">Your dashboard view requested by <b>${fromUser}</b>, if you provide access then he/she will be access your dashboard</td>
            </tr>
            
              <tr>
             
              <tr>
               <td style="padding: 10px 15px 10px;">If you are a register user with health care then login and go to switch user in my request and accept or reject, if you are not register user please sigunp on below link and do same process after signup
               </td>
              </tr> 
              <tr>
                <td style="padding: 10px 15px 10px;">
                    <a href="https://cordato.com/healthcare-website">https://cordato.com/healthcare-website </a>
                </td>
               </tr>      
              <tr>
                <td style="padding: 25px 15px 20px;">
                  Thanks &amp; Regards <br> Team Health Care
                  </td>
             </tr>
             <tr>
             <td style="text-align: center; padding: 20px; background-color: #4e555a; color: #eeeeee;">2021 copyright @ Health Care, All rights  reserved </td>
           </tr>
          </tbody>
        </table>
        </div>
      </div>
    </body>
   </html>`
    transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: realEmail,
            pass: realPassword
        }
    }))
    var messageObj = {
        from: 'No reply<a2karya8055@gmail.com>',
        to: email,
        subject: subject,
        html: html,

    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("Error and Info is===========", err, info);
        if (err) {
            callback(null, err);
        } else if (info) {
            callback(null, info)

        }
    })
}
//====================================Account verification status===================//

exports.sendAccountVerificationStatus = (email,name,sms, subject, callback) => {
    let HTML;
    let welcomeMessage, copyrightMessage, imageLogo;
    imageLogo = "https://res.cloudinary.com/a2karya80559188/image/upload/v1591876980/Logo_02_1_zmqflr.png";
    // welcomeMessage = message,
        copyrightMessage = "© Bite.me"
    HTML = `<html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="">
      <meta name="author" content="">
      <title>Vendor & Users</title>
    </head>
    <body style="margin: 0px; padding: 0px; background-color: #eeeeee;">
      <div style="width:600px; margin:20px auto; background:#fff; font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;color:#777;line-height:30px">
    <div>
        <table style="width: 100%; border: 1px solid #ccc;" cellpadding="0" cellspacing="0">
          <tbody>
          <tr style="margin:0;padding:0">
          <td bgcolor="#f1f1f1" height="100" style="text-align:center;background:#f1f1f1">
              <img src="https://res.cloudinary.com/a2karya80559188/image/upload/v1584446275/admin_nke1cg.jpg" alt="Email register" class="" style="height: 115px;
    width: 177px;">
          </td>
      </tr>
              <tr>
                <td style="padding: 50px 15px 10px;">Dear ${name}, </td>
              </tr>
              <tr>
              <td style="padding: 10px 15px 10px;">${sms}</td>
            </tr>
            
                
              <tr>
                <td style="padding: 25px 15px 20px;">
                  Thanks &amp; Regards <br> Team Health Care
                  </td>
             </tr>
             <tr>
             <td style="text-align: center; padding: 20px; background-color: #4e555a; color: #eeeeee;">2021 copyright @ Health Care, All rights  reserved </td>
           </tr>
          </tbody>
        </table>
        </div>
      </div>
    </body>
   </html>`

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: realEmail,
            pass: realPassword
        }
    })
    var messageObj = {
        from: 'No reply<a2karya8055@gmail.com>',
        to: email,
        subject: subject,
        html: HTML,

    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("Error and Info is===========", err, info);
        if (err) {
            console.log("error", err);
        } else if (info) {
            console.log("infor", info)

        }
    })


}

//=====================================Send Credentials=============================//

exports.sendCredentialsHtmlEmail = (email, subject, clientEmail,clientUsername,clientPassword, callback) => {
    let HTML;
    let welcomeMessage, copyrightMessage, imageLogo;
    imageLogo = "https://res.cloudinary.com/a2karya80559188/image/upload/v1585374071/1.0Splash_t9wzkh.png";
    welcomeMessage = 'Welcome to Bite.me App'
    copyrightMessage = "© Bite.me"
    HTML = `<!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <meta name="x-apple-disable-message-reformatting">
      <title>Confirm Your Email</title>
      <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <style>
        table {border-collapse: collapse;}
        .spacer,.divider {mso-line-height-rule:exactly;}
        td,th,div,p,a {font-size: 13px; line-height: 22px;}
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family:"Segoe UI",Helvetica,Arial,sans-serif;}
      </style>
      <![endif]-->
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700|Open+Sans');
        table {border-collapse:separate;}
          a, a:link, a:visited {text-decoration: none; color: #00788a;} 
          a:hover {text-decoration: underline;}
          h2,h2 a,h2 a:visited,h3,h3 a,h3 a:visited,h4,h5,h6,.t_cht {color:#000 !important;}
          .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
          .ExternalClass {width: 100%;}
        @media only screen {
          .col, td, th, div, p {font-family: "Open Sans",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
          .webfont {font-family: "Lato",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;}
        }
    
        img {border: 0; line-height: 100%; vertical-align: middle;}
        #outlook a, .links-inherit-color a {padding: 0; color: inherit;}
    </style>
    </head>
    <body style="box-sizing:border-box;margin:0;padding:0;width:100%;word-break:break-word;-webkit-font-smoothing:antialiased;">
        <div width="100%" style="margin:0; background:#f5f6fa">
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:0 auto" class="">
                <tbody>
                    <tr style="margin:0;padding:0">
                        <td width="600" height="130" valign="top" class="" style="background-image:url(https://res.cloudinary.com/dnjgq0lig/image/upload/v1546064214/vyymvuxpm6yyoqjhw6qr.jpg);background-repeat:no-repeat;background-position:top center;">
                            <table width="460" height="50" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                </tbody>
                            </table>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                            <tbody>
                            <tr style="margin:0;padding:0">
                            <td style="text-align:center; padding: 10px;">
                            </td>
                        </tr>
                                    <tr bgcolor="#ffffff" style="margin:0;padding:0;text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                        <td>
                                            <table width="460" class="" bgcolor="#ffffff" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                <tbody>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="30" style="text-align:center;background:#ffffff;border-top-left-radius:4px;border-top-right-radius:4px">
                                                        </td>
                                                    </tr>
                                                    <tr style="margin:0;padding:0">
                                                        <td bgcolor="#ffffff" height="100" style="text-align:center;background:#ffffff">
                                                            <img src="https://res.cloudinary.com/dvflctxao/image/upload/v1544705930/wp0z7cswoqigji0whe7n.png" alt="Email register" class="">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
    
                        </td>
                    </tr>
    
                    <tr>
                        <td>
                            <table width="460" class="" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto">
                                <tbody>
                                 <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="text-align:center;background:#ffffff">
                                            <p style="margin:0;font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:25px;line-height:26px;color:#272c73!important;font-weight:600;margin-bottom:20px">${welcomeMessage}</p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="20" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>

                                        
                                    </tr>

                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:left;font-weight:300;>
                                        <p style="margin:0 30px;color:#3a4161">Email : ${clientEmail}</p>
                                        </td>

                                                                             
                                    </tr>

                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:left;font-weight:300;>
                                        <p style="margin:0 30px;color:#3a4161">Name : ${clientUsername}</p>
                                        </td>

                                                                             
                                    </tr>

                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:left;font-weight:300;>
                                        <p style="margin:0 30px;color:#3a4161">Password : ${clientPassword}</p>
                                        </td>

                                                                          
                                    </tr>

                                     <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:center;font-weight:300">
                                            <p style="margin:0 30px;color:#3a4161"><h5>This is your login credentails. Do not share your password with anyone.</h5></p>
                                        </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:center;font-weight:300">
                                            <p style="margin:0 30px;color:#3a4161"><h4>Use this password for further login process. This is system generated mail. Do not reply. </h4></p>
                                        </td>
                                    </tr>

                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;line-height:1.5;color:#3a4161;text-align:center;font-weight:300">
                                            <p style="margin:0 30px;color:#3a4161;text-align:center"><h4>Please contact  contact@biteme.com for any queries regarding this.</h4></p>
                                        </td>
                                    </tr>

                                
                                    <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="30" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                        
                                    </tr>

                                    <tr>
                                    <td align="left" bgcolor="#ffffff" style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;font-size:14px;font-weight:bold;line-height:20px;color:#000; padding:0 0px">
                                    Best regards, <br>
                                        Team Bite.me.
                                    </td>
                                    
                                </tr>

                                <tr style="margin:0;padding:0">
                                        <td bgcolor="#ffffff" height="30" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                        <td bgcolor="#ffffff" height="30" style="font-size:0;line-height:0;text-align:center;background:#ffffff">
                                        &nbsp;
                                        </td>
                                    </tr>
                                
                                   
                                </tbody>
                            </table>
                        </td>
                    </tr> 
                    <tr style="margin:0;padding:0">
                        <td height="30" style="font-size:0;line-height:0;text-align:center">
                        &nbsp;
                        </td>
                    </tr>
                </tbody>
            </table>
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin:auto" class="">
                <tbody>
    
          <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
    
                <tr style="margin:0;padding:0">
                    <td valign="middle" style="width:100%;font-size:13px;text-align:center;color:#aeb2c6!important" class="m_-638414352698265372m_619938522399521914x-gmail-data-detectors">
                        <p style="font-family:'Open Sans',Open Sans,Verdana,sans-serif;line-height:16px;font-size:13px!important;color:#aeb2c6!important;margin:0 30px">${copyrightMessage}. All rights reserved.</p>
                    </td>
                </tr>
                <tr style="margin:0;padding:0">
                    <td height="20" style="font-size:0;line-height:0">
                        &nbsp;
                    </td>
                </tr>
            </tbody></table>
        </div>
    </body>
    </html>`

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: realEmail,
            pass: realPassword
        }
    })
    var messageObj = {
        from: 'no-reply<unodogs.com>',
        to: email,
        subject: subject,
        html: HTML,

    }
    transporter.sendMail(messageObj, (err, info) => {
        console.log("Error and Info is===========", err, info);
        if (err) {
            console.log("error", err);
        } else if (info) {
            console.log("infor", info)

        }
    })

}
