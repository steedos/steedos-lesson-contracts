# 业务对象关联
## 创建合同 object
在src项目源码中创建一个名为contracts.object.yml文件，
开头配置以下内容：
``` bash
name: contracts
label: 合同
icon: contract
```
## 添加字段
``` bash
fields:
  name:
    label: 合同名称
    type: text
    required: true
    searchable: true
    index: true
    is_wide: true
  "no":
    type: autonumber
    formula: "{YYYY}-{000} "
    label: 合同编号
    sortable: true
    filterable: true
    omit: true
    readonly: true
  othercompany:
    type: lookup
    relatedList: true
    label: 业务伙伴
    searchable: true
    reference_to: accounts
    required: true
  contract_type:
    type: select
    label: 分类
    required: true
    options:
      - label: 产品销售
        value: 产品销售
      - label: 开发服务
        value: 开发服务
      - label: 项目采购
        value: 项目采购
      - label: 其他采购
        value: 其他采购
  create_date:
    label: 登记日期
    type: date
    sortable: true
    filterable: true
    defaultValue: "{now}"
  bop:
    type: select
    label: 收支类别
    options:
      - label: 付款合同
        value: 付款合同
      - label: 收款合同
        value: 收款合同
    allowedValues:
      - 付款合同
      - 收款合同
    required: true
    defaultValue: 收款合同
  subject:
    type: textarea
    label: 合同主要内容
    is_wide: true
  amount:
    label: 合同金额
    type: number
    scale: 2
    required: true
    sortable: true
  signed_date:
    label: 签订日期
    type: date
    sortable: true
    filterable: true
  start_date:
    label: 开始日期
    type: date
    sortable: true
    filterable: true
  end_date:
    label: 结束日期
    type: date
    sortable: true
    filterable: true
  remark:
    label: 备注
    type: textarea
    is_wide: true
  contract_state:
    type: select
    label: 合同状态
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
    searchable: true
    options:
      - label: 履行中
        value: 履行中
      - label: 履行完
        value: 履行完
      - label: 已取消
        value: 已取消
  paid_amount:
    label: 已支付总金额
    type: number
    scale: 2
    sortable: true
    readonly: true
    defaultValue: 0
  unpaid_amount:
    label: 未支付付款总金额
    type: number
    scale: 2
    sortable: true
    readonly: true
    defaultValue: 0
  received_amount:
    label: 已收款总金额
    type: number
    scale: 2
    sortable: true
    readonly: true
    defaultValue: 0
  unreceived_amount:
    label: 未收款总金额
    type: number
    scale: 2
    sortable: true
    readonly: true
    defaultValue: 0
```
## 配置视图：我的合同、所有合同
``` bash
list_views:
  all:
    label: 所有合同
    columns:
      - field: create_date
        width: 120
        wrap: true
      - field: name
        width: 280
        wrap: true
      - field: othercompany
        width: 200
      - field: amount
        width: 120
      - field: contract_type
        width: 120
      - field: bop
        width: 120
      - field: start_date
        width: 120
      - field: end_date
        width: 120
      - field: owner
        width: 120
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
    filter_fields:
      - contract_type
      - signed_date
      - othercompany
      - contract_state
    sort:
      - - create_date
        - desc
```
## 定义权限：普通用户只能查看自己的合同，合同管理员和系统管理员可以查看所有的合同
``` bash
permission_set:
  user:
    allowCreate: true
    allowDelete: true
    allowEdit: true
    allowRead: true
    modifyAllRecords: false
    viewAllRecords: false 
  contract_manager:
    allowCreate: true
    allowEdit: true
    allowDelete: true
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

## 在华炎办公app中去掉 业务伙伴

修改src下的oa.app.yml,增加：业务伙伴 accounts
```bash
sort: 100
objects: 
  - instances
  - cms_posts
  - announcements
  - space_users
  - tasks
  - events
mobile_objects: 
  - instances
  - cms_posts
  - announcements
  - space_users
  - tasks
  - events
```

## 新建合同app，配置包括的业务对象

src下，增加文件contract.app.yml,增加：业务伙伴 accounts、合同 contracts
```bash
_id: contracts
name: 合同
description: 合同、业务伙伴。
icon_slds: approval
is_creator: true
sort: 200
objects: 
  - contracts
  - accounts
mobile_objects:
  - contracts
  - accounts
```

## 关联到业务伙伴