#Background
Hedera is the public ledger built on the lightning fast hasghraph consensus algorithm. You can use Hedera like you would a blockchain; send cryptocurrency, run smart contracts, even store files!

We’re getting close to availability of Hedera’s JavaScript SDK, which will make it even easier to build applications. In this post I’ll show you how you can get your environment setup and start using Hedera Hashgraph with Node.js, one of the most popular environments in the world.

#Step 1: Create an Account
In order to use the Hedera Public Testnet you’ll need an Account. You can get one by signing up on portal.hedera.com, or maybe a friend who already is on the public testnet can create one for you.

#Step2: Install the Hedera Hashgraph JS SDK
Now that you have your node environment setup, we can get started with Hedera’s JS SDK!

View Hedera Hashgraph’s JavaScript SDK here

Install it with your favorite package manager.

// install Hedera's JS SDK with NPM
npm install --save @hashgraph/sdk

// Install with Yarn
yarn add @hashgraph/sdk
You’ll also likely want to install dotenv with your favorite package manager.

This will allow our node environment to use your keys & Account ID we saved earlier.

// install with NPM
npm install dotenv

// Install with Yarn
yarn add dotenv

//Install JS ES6
npm install -g node-es6

#Run the demo

node getAccountBalance.js

node hbarTransfer.js



#Thanks

Thanks to Cooper Kunz for his intervention at the CAS blockchain (Geneva).

Source : https://cooperkunz.com/posts/get-started-hedera-js/
