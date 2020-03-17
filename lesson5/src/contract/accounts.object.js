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
        res.status(200).send();
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

Creator.Objects.accounts.actions = {
  sendEmail: {
      label: "发送邮件",
      visible: function (object_name, record_id, record_permissions) {
        return true;
      },
      on: "record",
      todo: function (object_name, record_id, fields) {
        $("body").addClass("loading");
        var userSession = Creator.USER_CONTEXT;
        var authorization = "Bearer " + userSession.spaceId + "," + userSession.user.authToken;
        $.ajax({
          type: "POST",
          url: Meteor.absoluteUrl("/api/odata/v4/" + userSession.spaceId + "/accounts/" + record_id + "/sendEmail"),
          data: JSON.stringify({}),
          dataType: "json",
          contentType: 'application/json',
          beforeSend: function (XHR) {
            XHR.setRequestHeader('Content-Type', 'application/json');
            XHR.setRequestHeader('Authorization', authorization);
          },
          success: function (data) {
            $("body").removeClass("loading");
            toastr.success("操作已成功！");
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("body").removeClass("loading");
            toastr.error(XMLHttpRequest.responseJSON);
          }
        });
  
      }
    },
};