// Allow access to our .env
require("dotenv").config();

const { Client, Ed25519PrivateKey, AccountCreateTransaction } = require("@hashgraph/sdk");

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

    const newPrivateKey = await Ed25519PrivateKey.generate();
    const newPublickKey = newPrivateKey.publicKey;

    console.log(`newPrivateKey = ${newPrivateKey}`);
    console.log(`newPublickKey = ${newPublickKey}`);

    const transactionId = await new AccountCreateTransaction()
      .setKey(newPublickKey)
      .setInitialBalance(0) //here the operatorAccoint don't want to transfer some hbar to the new Account
      .execute(client);

    const  txReceipt = await transactionId.getReceipt(client);
    const  txRecordDetail = await transactionId.getRecord(client);

    console.log(`newAccount = ${JSON.stringify(txReceipt._accountId)}`);
    console.log(`txReceipt = ${JSON.stringify(txReceipt)}`);
    console.log(`txRecordDetail = ${JSON.stringify(txRecordDetail)}`);

}

main();
