// Allow access to our .env
require("dotenv").config();

const { Client, Ed25519PublicKey, Hbar, FileCreateTransaction } = require("@hashgraph/sdk");

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

    const transactionId = await new FileCreateTransaction()
      .setContents("abc")
      .setMaxTransactionFee(Hbar.of(100))
      .addKey(Ed25519PublicKey.fromString("302a300506032b6570032100571d83a0ee3f53f8731b7d0665b73b0dc484b933679a56cbff1f20152fe7aa7a"))
      .execute(client);

    const  txReceipt = await transactionId.getReceipt(client);
    const  txRecordDetail = await transactionId.getRecord(client);

    console.log(`txReceipt = ${JSON.stringify(txReceipt)}`);
    console.log(`txRecordDetail = ${JSON.stringify(txRecordDetail)}`);

}

main();
