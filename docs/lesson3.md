# 业务对象关联
## 创建合同 object
新建  contracts.object  的yml 文件
然后配置相应字段：
``` bash
name: contracts
label: 业财
icon: contract
```
## 添加字段
``` bash
fields:
  "no":
    type: text
    label: 合同编号
    sortable: true
    filterable: true
  create_date:
    label: 登记日期
    type: date
    sortable: true
    filterable: true
  company_id:
    label: 我方单位
    required: true
    omit: false
    hidden: false
    sortable: true
    type: lookup
    relatedList: true
    reference_to: company
    create: false
  othercompany:
    type: lookup
    relatedList: true
    label: 签约对象
    searchable: true
    reference_to: accounts
    multiple: true
    filters: [["status", "eq", "2"]]
    create: false
  name:
 		label: 合同/业务名称
 		type: text
   	required: true
   	searchable: true
   	index: true
  applicant:
    label: 经办人
    type: lookup
    searchable: true
    reference_to: users
    create: false
  applicant_organization:
    label: 经办部门
    type: lookup
    searchable: true
    reference_to: department
    required: true
    create: false
  owner:
    label: 执行人
    sortable: true
    type: lookup
    reference_to: users
    omit: false
    hidden: false
    create: false
  owner_organization:
    label: 执行人部门
    type: lookup
    create: false
    searchable: true
    reference_to: department
  created_by:
    label: 创建人
    sortable: true
   	type: lookup
   	reference_to: users
 	modified_by:
    label: 修改人
    sortable: true
    type: lookup
    reference_to: users
  virtual_contract:
    label: 付款依据
    type: select
    options:
      - label: 合同
       	value: 合同
      - label: 非合同
        value: 非合同
    defaultValue: 合同
	contract_object:
	  label: 合同标的
    type: textarea
    group: 合同主要内容
 		is_wide: true
  subject:
    type: textarea
    label: 合同主要内容
    group: 合同主要内容
    is_wide: true
  amount:
    label: 合同/业务金额
    type: currency
    group: 合同主要内容
    scale: 2
   	required: true
    sortable: true
  capital_amount:
    label: 大写金额
    type: text
    group: 合同主要内容
    readonly: true
  currency_type:
    label: 币种
    type: lookup
    relatedList: true
    group: 合同主要内容
   	reference_to: currency
    create: false
  	amount_description:
    	label: 金额说明
    	type: textarea
    	group: 合同主要内容
    	is_wide: true
  	deadline:
    	type: text
    	group: 合同主要内容
    	label: 合同期限
  	signed_date:
    	label: 签订日期
    	group: 合同主要内容
    	type: date
    	sortable: true
    	filterable: true
  	remark:
    	label: 备注
    	group: 合同主要内容
    	type: textarea
  	description:
    	label: 说明
    	group: 合同主要内容
    	type: textarea
  	stamp_state:
    	type: text
    	label: 盖章状态
    	group: 盖章信息
    	searchable: true
```
## 设置视图：我的合同，所有合同
``` bash
list_views:
	all:
    label: 所有合同/业务
    filter_fields:
      - contract_type
      - signed_date
      - othercompany
      - contract_state
    sort:
      - - create_date
        - desc
  mine:
    label: 我的合同
	filter_fields:
      - contract_type
      - signed_date
      - othercompany
      - contract_state
		sort:
      - - create_date
        - desc
```
## 定义权限：普通用户只能看自己的合同，管理员可以看所有的合同
``` bash
admin:
  allowCreate: true
  allowDelete: true
  allowEdit: true
  allowRead: true
  modifyAllRecords: true
  viewAllRecords: true
contract_manager:
  viewAllRecords: true
user:
	allowCreate: false
  allowDelete: false
  allowEdit: true
  allowRead: true
  modifyAllRecords: false
  viewAllRecords: false
disabled_list_views:
  - all
```
