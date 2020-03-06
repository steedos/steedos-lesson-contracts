# lesson2   创建业务对象

## 创建 业务伙伴  object

在src项目源码中创建一个名为accounts.object.yml文件，
开头配置以下内容：
```bash
name: contracts
lable: 业务伙伴
icon: cantract
```
## 添加字段：名称、电话、邮箱...
配置相关字段:
```bash
fields:
  name:
    label: 名称
    type: text
    defaultValue: ''
    description: ''
    inlineHelpText: ''
    searchable: true
    required: true
    sortable: true
  credit_code:
    type: text
    label: 统一社会信用代码
    inlineHelpText: '系统按照此字段校验重复，避免重复录入单位信息。'
    required: true
  priority:
    label: 优先级
    type: select
    sortable: true
    options:
      - label: 高
        value: high
      - label: 中
        value: normal
      - label: 低
        value: low
    filterable: true
  registered_capital:
    type: currency
    label: 注册资金
    scale: 2
  website:
    type: url
    label: 网址
  phone:
    type: text
    label: 电话
    defaultValue: ''
  email:
    type: text
    label: 邮箱
  description:
    label: 备注
    type: textarea
    is_wide: true
    name: description
 ```

## 设置视图：所有业务伙伴
```bash
list_views:
  all:
    label: 所有业务伙伴
    columns:
      - name
      - priority
      - owner
      - modified
    filter_scope: space
```

## 定义权限：所有人都能增删改
```bash
permission_set:
	user:
		allowCreate: true
		allowDelete: true
		allowEdit: true
		allowRead: true
		modifyAllRecords: true
		viewAllRecords: true
```

## 在 app中配置新创建的业务对象

修改src下的oa.app.yml,增加：业务伙伴 accounts
```bash
objects: 
  - instances
  - accounts
  - cms_posts
  - announcements
  - space_users
  - tasks
  - events
```

## 运行并查看效果

![业务伙伴](/website/static/assets/guide_3.png)
