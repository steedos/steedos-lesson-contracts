# 如何快速开发随需定制的管理系统？

华炎魔方是[开源低代码开发工具](https://github.com/steedos/steedos-platform)，基于NodeJS开发，使用yml文件定义[业务对象](https://www.steedos.com/developer/object/)，使用 javascript 语法编写前端和后端业务逻辑脚本。系统内核（业务对象管理、账户管理、权限管理、流程引擎、报表引擎）需运行于 MongoDB 数据库，开发人员可以定义[第三方数据源](https://www.steedos.com/developer/datasource/)，连接SQL Server、Oracle等现有的业务系统数据库。

本教程以合同管理为例，指导你如何使用华炎魔方创建项目，配置业务对象，编程脚本，处理业务部门的各种个性化需求。您开发的新业务系统可以部署在本地运行。

## [准备：安装开发环境](https://www.steedos.com/developer/install)

## [教程1：创建项目](https://www.steedos.com/developer/guide_create)

- 创建steedos项目
- 安装依赖包
- 运行空项目
- 文件夹结构
- 注册新账户
- 创建企业/工作区
- 系统主页面

## [教程2：配置业务对象](https://www.steedos.com/developer/guide_object)

- 创建业务对象：业务伙伴
- 添加字段
- 设置视图：所有业务伙伴
- 定义权限：所有人都能增删改
- 修改应用：增加业务伙伴
- 重启服务运行并查看效果

## [教程3：业务对象关联](https://www.steedos.com/developer/guide_relationship)

- 创建业务对象：合同
- 添加字段
- 配置视图：我的合同、所有合同
- 定义权限：普通用户只能查看自己的合同，合同管理员和系统管理员可以查看所有合同
- 修改默认应用：去掉业务伙伴
- 新建自定义应用：合同，配置包括的业务对象
- 重启服务运行并查看效果

## [教程4：配置触发器](https://www.steedos.com/developer/guide_trigger)

- 修改业务对象的字段
- 创建触发器
- 编写触发的执行代码：自动更新待收金额

## [教程5：自定义操作按钮](https://www.steedos.com/developer/guide_button)

- 创建自定义操作按钮
- 编写按钮的执行代码：发送邮件
- 重启服务运行并查看效果

## [教程6：设置报表](https://www.steedos.com/developer/guide_report)

- 修改合同应用：增加报表reports
- 重启服务运行并查看效果
- 定义矩阵型报表：合同年度统计

## [教程7：设置合同审批流程](https://www.steedos.com/developer/guide_flow)

- 配置表单
- 配置流程
- 配置权限
- 运行合同审批流程

## [教程8：合同审批自动进入合同台账](https://www.steedos.com/developer/guide_sync)

- 修改表单，读取合作伙伴数据
- 修改系统配置，设置同步频率
- 修改应用，打开合同的配置对象流程开关
- 重启服务
- 配置对象流程
- 运行合同审批流程，确认同步情况

## [教程9：多单位权限控制](https://www.steedos.com/developer/guide_companies)

- 修改合作伙伴，启用分部字段
- 修改合作伙伴，修改权限控制
- 修改合同，启用分部字段
- 修改合同，修改权限控制
- 重启服务
- 配置单位权限对应人员
- 确认多单位权限控制效果
