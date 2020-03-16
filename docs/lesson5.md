# lesson5  操作按钮

## 业务伙伴，增加发邮件的按钮。

系统内置三个基本操作：新增、修改、删除。

在此基础上，用户可以自定义按钮，并编写javascript脚本执行想要的操作。

发邮件按钮模板：

```javascript
Creator.Objects.accounts.actions = {//业务对象的名字.actions
  sendEmail: {
    label: "发邮件",
    sort: 0,
    visible: function (object_name, record_id, record_permissions) {
      // 可控制何人显示出该按钮
      return true;
    },
    on: "record",
    todo: function (object_name, record_id, fields) {
      // 输入邮箱后，调用邮件接口API，发送电子邮件
    }
  }
};
```

### 参数说明：

- name: 名称
- label: 按钮显示标签
- on: 显示位置 
  - "list" 为列表定义action，只显示在列表右上角
  - "record" 为记录定义action，显示在记录查看页右上角，以及列表视图中每项的下拉菜单中
  - "record_more" 为记录定义action，显示在记录查看页右上角的“更多”下拉菜单中，以及列表视图中每项的下拉菜单中
  - "list_item" 为记录定义action，只显示在列表视图中每项的下拉菜单中
  - "record_only" 为记录定义action，只显示在记录查看页右上角
- sort: 排序号，显示时，按照从小到达顺序排列。编辑action的sort默认为0
- todo: 脚本内容，脚本中可以使用以下变量
  - this.object_name
  - this.object
  - this.action
