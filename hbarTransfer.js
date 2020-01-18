// Allow access to our .env
require("dotenv").config();

const { Client, CryptoTransferTransaction } = require("@hashgraph/sdk");

async function main() {

    const operatorPrivateKey = process.env.PRIVATE_KEY;
    const operatorAccount = process.env.ACCOUNT_ID;

    if (operatorPrivateKey == null || operatorAccount == null) {
        throw new Error("environment variables OPERATOR_KEY and OPERATOR_ID must be present");
    }


    const client = new Client({
      network: {"0.testnet.hedera.com:50211": "0.0.3"},
      operator: {
        account: operatorAccount,
        privateKey: operatorPrivateKey
      }
    });

    //Or
    // const client = Client.forTestnet();
    //client.setOperator(operatorAccount, operatorPrivateKey);

    const transactionId = await new CryptoTransferTransaction()
        .addSender(operatorAccount, 2)
        .addRecipient("0.0.143906", 1)
        .addRecipient("0.0.143907", 1)
        .setTransactionMemo("Just some tests ;-)")
        .execute(client);

    const  txReceipt = await transactionId.getReceipt(client);
    const  txRecordDetail = await transactionId.getRecord(client);

    console.log(`txReceipt = ${JSON.stringify(txReceipt)}`);
    console.log(`txRecordDetail = ${JSON.stringify(txRecordDetail)}`);

}

main();
