const objectql = require('@steedos/objectql');
const nodemailer = require('nodemailer');

let smtpTransport = nodemailer.createTransport({
  service: 'qiye.aliyun',
  // 请修改为自己的邮箱服务，从https://nodemailer.com/smtp/well-known/获取支持的服务
  port: 465, 
  secureConnection: true, 
  auth: {
    user: '***@***.com',
    // 请修改为自己的邮箱
    pass: '***',
    // 请修改为自己的邮箱密码
  }
});

Creator.Objects.accounts.methods = {
    sendEmail: async function (req, res) {
      const params = req.params;
      const steedosSchema = objectql.getSteedosSchema();
      var account = await steedosSchema.getObject('accounts').findOne(params._id);
      var email = account.email;

      try {
        smtpTransport.sendMail({
          from: '***@***.com', 
          // 请修改为自己的邮箱
          to: email, 
          subject: 'Hello',
          html: '<b>Hello World！我是华炎开发</b>'
        });
        res.status(200).send({});
      } catch (error) {
        res.status(400).send({
          'error': {
            'details': error.stack,
            'message': error.message,
          }
        });
      }
    }
};
