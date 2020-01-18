// Allow access to our .env
require("dotenv").config();

const { Client, AccountBalanceQuery } = require("@hashgraph/sdk");

async function main() {

    const operatorPrivateKey = process.env.PRIVATE_KEY;
    const operatorAccount = process.env.ACCOUNT_ID;

    if (operatorPrivateKey == null || operatorAccount == null) {
        throw new Error("environment variables OPERATOR_KEY and OPERATOR_ID must be present");
    }


    const client = new Client({
      network: {"0.testnet.hedera.com:50211": "0.0.3", "1.testnet.hedera.com:50211": "0.0.4"},
      operator: {
        account: operatorAccount,
        privateKey: operatorPrivateKey
      }
    });

    //Or
    // const client = Client.forTestnet();

    client.setOperator(operatorAccount, operatorPrivateKey);

    const balance = await new AccountBalanceQuery()
        .setAccountId(operatorAccount)
        .execute(client);

    console.log(`${operatorAccount} balance = ${balance.asTinybar()}`);
}

main();
