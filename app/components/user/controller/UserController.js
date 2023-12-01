const { StatusCodes } = require("http-status-codes")
const UserService = require("../service/UserService");
const { response } = require("express");
const nodemailer = require("nodemailer");
const { checkJwtHS256 } = require("../../../middleware/authService");
const { EmptyResultError } = require("sequelize");
const cron = require("node-cron")
require('dotenv').config();
class UserController {
  constructor() {
    this.userService = new UserService()
  }

  async sendEmail(recipient_email) {
    console.log(recipient_email, "REEEEEEEEE")
    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: 'helpdeskbankingapp@gmail.com',
          pass: 'pccp pfrk vwwe rsvy',
        }
      });

      const mail_configs = {
        from: 'helpdeskbankingapp@gmail.com',
        to: recipient_email,
        subject: "RohitBankingApp 101 PASSWORD RECOVERY",
        html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen -Email Template</title>
  

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
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"></h2>
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

  async send_Email(settingsConfig, req, res, next) {
    try {
      const logger = settingsConfig.logger;
      const queryParams = req.query
      logger.info(`[EMPLOYEE_CONTROLLER] : Inside getAllEmployee`);
      const data = await this.userService.getAllEmpoyeeEmail(settingsConfig, queryParams)
      // res.set('X-Total-Count', count)
      console.log(data.rows.map(employee => employee.email))
      let response = await this.sendEmail(data.rows.map(employee => employee.email), req.body.OTP)
      console.log(req.body, "ffffffffffffffff")
      return res.status(StatusCodes.OK).json({ response })
    } catch (error) {
      next(error)
    }

  };

  async cronJobFunction(settingsConfig, req, res, next) {
    console.log('Task is running...');
  }

  async cronJobSchedule(settingsConfig, req, res, next) {

    cron.schedule('0 12 28 * *', () => {
      this.send_Email();
      console.log('Task is running...');
    });
    console.log("hello");
    return res.status(StatusCodes.OK).json({ yash: "response" })
  }


}

// function sendEmail(recipient_email, OTP) {
//   console.log(recipient_email, "REEEEEEEEE", OTP, "OTPPPPPPPP");

//   return new Promise(async (resolve, reject) => {
//     try {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: 'helpdeskbankingapp@gmail.com',
//           pass: 'pccp pfrk vwwe rsvy',
//         },
//       });

//       const mail_configs = {
//         from: 'helpdeskbankingapp@gmail.com',
//         to: recipient_email,
//         subject: "RohitBankingApp 101 PASSWORD RECOVERY",
//         html: `<!DOCTYPE html>
// <html lang="en" >
// <head>
//   <meta charset="UTF-8">
//   <title>CodePen - OTP Email Template</title>
// </head>
// <body>
// <!-- Your HTML content here -->
// </body>
// </html>`,
//       };

//       console.log(mail_configs, "mailconfigs//////////");

//       const info = await transporter.sendMail(mail_configs);

//       console.log(info);

//       resolve({ message: "Email sent successfully" });
//     } catch (error) {
//       console.error(error);
//       reject({ message: "An error has occurred" });
//     }
//   });
// }

const task = () => {
  console.log('Task is running...');
};

// cron.schedule(' * * * * *', () => {
//   this.cronJobFunction();
// });

// cron.schedule('* * * * *', task);
// cron.schedule('0 12 28 * *', sendEmail);




module.exports = new UserController()