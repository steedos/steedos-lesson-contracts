const objectql = require('@steedos/objectql');
/**
 * 
 * @param {string} contractId 
 */
async function caculateAmount(contractId) {
  if (!contractId) {
    console.error(`未提供contractId`);
    return;
  }

  const steedosSchema = objectql.getSteedosSchema();
  let contractObj = steedosSchema.getObject('contracts');
  let contract = await contractObj.findOne(contractId);
  if (!contract) {
    console.error(`未找到合同：${contractId}`);
    return;
  }

  let bop = contract.bop;
  let cAmount = contract.amount;
  let paidAmount = contract.paid_amount;
  let receivedAmount = contract.received_amount;

  if (bop == '付款合同') {
    let unPaidAmount = cAmount - paidAmount;
    let unReceivedAmount = 0;
    receivedAmount = 0;
    await contractObj.directUpdate(contractId, { unpaid_amount: unPaidAmount, unreceived_amount: unReceivedAmount, received_amount: receivedAmount });
  } else if (bop == '收款合同') {
    let unReceivedAmount = cAmount - receivedAmount;
    let unPaidAmount = 0;
    paidAmount = 0;
    await contractObj.directUpdate(contractId, { unreceived_amount: unReceivedAmount, unpaid_amount: unPaidAmount, paid_amount: paidAmount });
  }
}

module.exports = {
  caculateAmount
};