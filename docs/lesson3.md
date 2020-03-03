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
   serial_number:
    type: autonumber
    formula: "{0}"
    label: 流水号
    filterable: true
    omit: true
    readonly: true
    searchable: true
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
  project:
    type: lookup
    label: 项目
    filterable: true
    reference_to: account_project
    create: false
  contract_type:
  	type: lookup
    relatedList: true
   	label: 分类
   	reference_to: contract_types
   	required: true
   	create: false
 	business_category:
   	type: lookup
   	label: 业务分类
   	reference_to: business_categories
   	filters: [["enablestate", "eq", "2"]]
   	create: false
  name:
 		label: 合同/业务名称
 		type: text
   	required: true
   	searchable: true
   	index: true
  is_bidding:
 	  type: select
 		label: 是否招投标
 		options:
 		  - label: 已公开招投标
        value: 已公开招投标
      - label: 已邀请招投标
        value: 已邀请招投标
      - label: 已询价比价
 			  value: 已询价比价
      - label: 无需招投标
        value: 无需招投标
    allowedValues:
      - 已公开招投标
      - 已邀请招投标
      - 已询价比价
      - 无需招投标
  bop:
 	 type: select
   label: 收支类别
   options:
    - label: 付款业务
      value: 付款业务
    - label: 收款业务
      value: 收款业务
    - label: 收付款业务
      value: 收付款业务
    - label: 无金额业务
      value: 无金额业务
   is_approve_by_boss:
    label: 董事长审批
    type: select
    options:
      - label: 是
      	value: 是
      - label: 否
      	value: 否
    readonly: true
    omit: true
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
    depend_on:
      - company_id
    optionsFunction: !!js/function |
      function(values) {
        var _options = [];
        var companyId = values.company_id;
        if (!companyId) {
          return;
        }
        if(!_.isString(companyId)) {
          companyId = values.company_id._id
        }
        var departments = Creator.odata.query('department', {$filter: "(company_id eq '" + companyId + "')", $select: 'name'}, true);
       	if (departments){
          _.each(departments, function(item){
            _options.push({value: item._id, label: item.name});
       		})
        }
        return _options;
      }
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
  amount_type:
    type: select
    label: 金额类型
    group: 合同主要内容
    defaultValue: 固定
   	options:
      - label: 固定
      	value: 固定
      - label: 浮动
        value: 浮动
      - label: 无金额
      	value: 无金额
    allowedValues:
      - 固定
      - 浮动
      - 无金额
  	amount_description:
    	label: 金额说明
    	type: textarea
    	group: 合同主要内容
    	is_wide: true
  	receive_payment_type:
    	type: select
    	label: 收/付款方式
    	group: 合同主要内容
    	defaultValue: 一次性
    	options:
      	- label: 一次性
      		value: 一次性
      	- label: 分期
      	  value: 分期
      	- label: 无金额
      		value: 无金额
    	allowedValues:
      	- 一次性
      	- 分期
      	- 无金额
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
  	contract_state:
    	type: select
    	label: 合同状态
    	group: 合同主要内容
    	searchable: true
    	options:
        - label: 审批中
      		value: pending
      	- label: 已核准
      		value: approved
      	- label: 已驳回
      		value: rejected
      	- label: 已取消
      		value: terminated
      	- label: 已签订
      		value: signed
      	- label: 已归档
      		value: archived
      	- label: 已作废
      		value: droped
      	- label: 已完成
      		value: completed
  	contract_fulfillment_state:
    	type: select
    	label: 合同履行状态
    	group: 合同主要内容
    	searchable: true
    	options:
      	- label: 履行中
      		value: 履行中
      	- label: 履行完
      		value: 履行完
      	- label: 已取消
      		value: 已取消
  	stamp_state:
    	type: text
    	label: 盖章状态
    	group: 盖章信息
    	searchable: true
  	paid_amount:
    	label: 已支付总金额
    	type: currency
    	group: 合同收付款信息
    	scale: 2
    	sortable: true
    	readonly: true
    	defaultValue: 0
  	unpaid_amount:
    	label: 未支付付款总金额
    	group: 合同收付款信息
    	type: currency
    	scale: 2
    	sortable: true
    	readonly: true
    	defaultValue: 0
  	receipted_amount:
    	label: 已收票总金额
    	type: currency
    	group: 合同收付款信息
    	scale: 2
    	sortable: true
    	readonly: true
    	defaultValue: 0
  	unclaimed_votes_amount:
    	label: 未收票总金额
    	type: currency
    	group: 合同收付款信息
    	scale: 2
    	sortable: true
    	readonly: true
    	defaultValue: 0
  	received_amount:
    	label: 已收款总金额
    	group: 合同收付款信息
    	type: currency
    	scale: 2
    	sortable: true
    	readonly: true
    	defaultValue: 0
  	unreceived_amount:
    	label: 未收款总金额
    	group: 合同收付款信息
    	type: currency
    	scale: 2
    	sortable: true
    	readonly: true
    	defaultValue: 0
  	for_invoicing_amount:
    	label: 申请开票总金额
    	group: 合同收付款信息
    	type: currency
    	scale: 2
    	sortable: true
    	readonly: true
    	defaultValue: 0
  	unfor_invoicing_amount:
    	label: 未申请开票总金额
    	group: 合同收付款信息
    	type: currency
    	scale: 2
    	sortable: true
    	readonly: true
    	defaultValue: 0
  	change_before:
    	label: 变更前合同
    	type: lookup
    	group: 合同变更
    	reference_to: contracts
    	readonly: true
    	create: false
  	change_after:
    	label: 变更后合同
    	type: lookup
    	group: 合同变更
    	reference_to: contracts
    	readonly: true
    	create: false
  	contract_action_type:
    	label: 合同类型
    	type: select
    	group: 合同变更
    	options:
        - label: 新增
      		value: 新增
      	- label: 变更
      		value: 变更
    	readonly: true
  		omit: true
  	change_reason:
    	label: 变更原因
    	type: text
    	group: 合同变更
    	readonly: true
  	archive_date:
  		label: 备案文件日期
    	type: date
  		group: 合同备案信息
    	sortable: true
  		filterable: true
  		name: archive_date
  	original_file:
      label: 备案文件类型
    	type: select
   		group: 合同备案信息
  		options:
        - label: 原件
      		value: 原件
      	- label: 扫描件
      		value: 扫描件
      	- label: 复印件
      		value: 复印件
    	name: original_file
  	revocation_date:
  		label: 废止日期
  		type: date
  		group: 合同备案信息
  		sortable: true
 			filterable: true
  		name: revocation_date
  	synced_from_odoo:
   		label: 从odoo导入
  		type: boolean
  		omit: true
  		hidden: true
  		readonly: true
```
## 设置视图：我的合同，所有合同
``` bash
list_views:
	all:
    label: 所有合同/业务
    filters: !<tag:yaml.org,2002:js/function> |-
      function () {
			    return [
					  ["contract_state","<>","terminated"]
				  ];
			}
		columns:
			- field: create_date
        width: 120
       	wrap: true
      - field: company_id
        width: 200
        wrap: true
      - field: othercompany
        width: 200
        wrap: true
      - field: name
        width: 280
        wrap: true
      - field: amount
        width: 120
        wrap: true
      - field: currency_type
       	width: 120
        wrap: true
      - field: contract_type
        width: 120
        wrap: true
      - field: "no"
        width: 120
        wrap: true
      - field: serial_number
        width: 120
       	wrap: true
   	filter_scope: space
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
   	filter_scope: mine
		filters: !<tag:yaml.org,2002:js/function> |-
			function () {
			    return [
					  ["contract_state","<>","terminated"]
				  ];
			}
		columns:
			- field: create_date
			  width: 120
			  wrap: true
			- field: company_id
       	width: 200
       	wrap: true
      - field: othercompany
        width: 200
        wrap: true
      - field: name
        width: 280
        wrap: true
      - field: amount
        width: 120
        wrap: true
      - field: currency_type
        width: 120
        wrap: true
      - field: contract_type
        width: 120
        wrap: true
      - field: "no"
        width: 120
        wrap: true
      - field: serial_number
        width: 120
        wrap: true
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
