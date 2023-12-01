class SendEmail {
    //     async sendEmail(recipient_email, OTP) {
    //         console.log(recipient_email, "REEEEEEEEE", OTP, "OTPPPPPPPP")
    //         return new Promise((resolve, reject) => {
    //             var transporter = nodemailer.createTransport({
    //                 service: "gmail",
    //                 auth: {
    //                     user: 'helpdeskbankingapp@gmail.com',
    //                     pass: 'nyxz uzre lmql udij',
    //                 },
    //                 // service: 'gmail',
    //                 // host: 'smtp.gmail.com',
    //                 // auth: {
    //                 //     user: 'your gmail here',
    //                 //     pass: 'your app generated password here',
    //                 // },
    //             });

    //             const mail_configs = {
    //                 from: 'helpdeskbankingapp@gmail.com',
    //                 to: recipient_email,
    //                 subject: "RohitBankingApp 101 PASSWORD RECOVERY",
    //                 html: `<!DOCTYPE html>
    // <html lang="en" >
    // <head>
    //   <meta charset="UTF-8">
    //   <title>CodePen - OTP Email Template</title>


    // </head>
    // <body>
    // <!-- partial:index.partial.html -->
    // <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    //   <div style="margin:50px auto;width:70%;padding:20px 0">
    //     <div style="border-bottom:1px solid #eee">
    //       <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
    //     </div>
    //     <p style="font-size:1.1em">Hi,</p>
    //     <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    //     <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    //     <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
    //     <hr style="border:none;border-top:1px solid #eee" />
    //     <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    //       <p>Koding 101 Inc</p>
    //       <p>1600 Amphitheatre Parkway</p>
    //       <p>California</p>
    //     </div>
    //   </div>
    // </div>
    // <!-- partial -->

    // </body>
    // </html>`,
    //             };
    //             console.log(mail_configs, "mailconfigs//////////");
    //             transporter.sendMail(mail_configs, function (error, info) {
    //                 if (error) {
    //                     console.log(error);
    //                     return reject({ message: `An error has occured` });
    //                 }
    //                 return resolve({ message: "Email sent succesfuly" });
    //             });
    //         });
    //     }
    async sendEmail(recipient_email, OTP) {
        console.log(recipient_email, "REEEEEEEEE", OTP, "OTPPPPPPPP")
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: 'helpdeskbankingapp@gmail.com',
                    pass: 'pccp pfrk vwwe rsvy',
                },
                // service: 'gmail',
                // host: 'smtp.gmail.com',
                // auth: {
                //     user: 'your gmail here',
                //     pass: 'your app generated password here',
                // },
            });

            const mail_configs = {
                from: 'helpdeskbankingapp@gmail.com',
                to: recipient_email,
                subject: "RohitBankingApp 101 PASSWORD RECOVERY",
                html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Koding 101 Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
            };
            console.log(mail_configs, "mailconfigs//////////");
            transporter.sendMail(mail_configs, function (error, info) {
                if (error) {
                    console.log(error);
                    return reject({ message: `An error has occured` });
                }
                return resolve({ message: "Email sent succesfuly" });
            });
        });
    }

    async forgetPassword(settingsConfig, req, res, next) {
        // const { email ,OTP} = req.body || 'mpty'
        // let OTP = req.body
        // console.log(req.body)
        //     .then((response) => res.send(response.message))
        // this.sendEmail(email, req.body)
        //     .catch((error) => console.log("internal server error", email, "otppppppppppp", error));
        try {

            let response = await this.sendEmail(req.body.recipient_email, req.body.OTP)
            console.log(req.body, "ffffffffffffffff")
            return res.status(StatusCodes.OK).json({ response })
        } catch (error) {
            next(error)
        }

    };

}

module.exports = new SendEmail()