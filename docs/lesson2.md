# lesson2   创建业务对象
## 创建合同 APP
创建一个名为contacts.app 的yml文件

## 创建业务伙伴  object

创建一个名为contacts.object的yml文件
配置以下内容：
```bash
name: contracts
lable: 合作伙伴
icon: cantract
```
## 添加字段：名称、电话、邮件...
开始配置字段:
```bash
fields:
	name:
		label: 名称
		type: text
		is_enable: true
		enable_search: true
	phone:
		label: 电话号码
		type: text
		is_enable: true
		enable_search: true
	email:
		label: 邮件
		type: email
		is_enable: true
		enable_search :true
 ```

## 设置视图：所有业务伙伴
```bash
list_views:
	all:
		label: 所有业务伙伴
		columns:
		- name
		- phone
		- email
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
	admin:
		allowCreate: true
		allowDelete: true
		allowEdit: true
		allowRead: true
		modifyAllRecords: true
		viewAllRecords: true
```
## 运行并查看效果
查看视图以及用户权限效果
