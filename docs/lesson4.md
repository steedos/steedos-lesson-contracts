# lesson4  触发器

## 触发器：合同已收金额修改后，自动更新待收金额。

对于记录的增删改操作，可设定自动执行的脚本。同一个事件可以定义多个trigger。

触发器模板：

```javascript
module.exports = {
    listenTo: '对象名称',//对象名称，必填
    beforeInsert: [async] Function,// 数据新增前执行, 选填
    beforeUpdate: [async] Function,//数据修改前执行, 选填
    beforeDelete: [async] Function,//数据删除前执行, 选填
    afterInsert: [async] Function,//数据新增后执行, 选填
    afterUpdate: [async] Function,//数据修改后执行, 选填
    afterDelete: [async] Function,//数据删除后执行, 选填
}
```

### 触发器实例contracts.trigger.js

```javascript
const contractManager = require('./contracts.manager');
module.exports = {

  listenTo: 'contracts',

  afterInsert: async function () {
    await contractManager.caculateAmount(this.id);
  },

  afterUpdate: async function () {
    await contractManager.caculateAmount(this.id);
  }
};
```

### 参数说明：
所有脚本函数均为无参函数，所属数据可从`this`中获取，`this`结构如下

- `id`: 记录的唯一标识[string],
- `userId`: 当前用户唯一标识[string],
- `doc`: 需要新增/修改的记录内容[json],
- `previousDoc`: 修改/删除前的记录[json],  //仅afterUpdate, afterDelete时存在此属性
- `object_name`: 当前对象名称[string],
- `datasource_name`: 数据源名称[string],
- `getObject`: function(object_name: string)