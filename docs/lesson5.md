# lesson5  操作按钮：给合同伙伴发邮件

对于已定义的业务对象，系统内置基本操作，包括新增、修改、删除等。在此基础上，用户可以自定义按钮，并编写javascript脚本执行想要的操作。

下面，我们试着给业务伙伴，增加一个“发送邮件”的按钮，点击则给业务伙伴的邮箱发送一封简单的邮件。

## 创建自定义操作按钮

在src项目源码中创建一个名为accounts.trigger.js文件，配置1个自定义按钮：

```javascript
Creator.Objects.accounts.actions = {
  sendEmail: {
      label: "发送邮件",
      visible: function (object_name, record_id, record_permissions) {
        var email = Creator.getObjectRecord(object_name, record_id).email;
        if (!email) {
          return false;
        } 
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
            toastr.success("已发送邮件！");
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("body").removeClass("loading");
            toastr.error("发送邮件失败："+ errorThrown);
          }
        });
      },
  }
}
```

### 操作按钮的参数

- name: 名称
- label: 按钮显示标签
- on: 显示位置 
  - "list" 为列表定义action，只显示在列表右上角
  - "record" 为记录定义action，显示在记录查看页右上角，以及列表视图中每项的下拉菜单中
  - "record_more" 为记录定义action，显示在记录查看页右上角的“更多”下拉菜单中，以及列表视图中每项的下拉菜单中
  - "list_item" 为记录定义action，只显示在列表视图中每项的下拉菜单中
  - "record_only" 为记录定义action，只显示在记录查看页右上角
- sort: 排序号，显示时，按照从小到达顺序排列。编辑action的sort默认为0
- todo: 脚本内容

## 编写按钮的执行代码

在accounts.trigger.js文件中，编写sendEmail的处理逻辑代码。
  
```javascript
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
```

## 重启服务运行并查看效果

