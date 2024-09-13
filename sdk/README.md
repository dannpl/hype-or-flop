<div align="center">
  <h1>Napcat Protocol SDK</h1>
</div>

**Napcat Protocol SDK**! This is the official SDK that allows you to interact with the Napcat protocol on the Solana blockchain.

### Install

Install these dependencies over:

npm:

```shell
npm install @napcat/protocol
```

yarn:

```shell
yarn add @napcat/protocol
```

### How to Use

Here’s a basic example of how you can start using the SDK:

```ts
import { Connection, PublicKey } from '@solana/web3.js'
import { Wallet } from '@coral-xyz/anchor'
import NapcatProtocolClient from '@napcat/protocol'

const connection = new Connection('https://api.mainnet-beta.solana.com')
const wallet = new Wallet(/* Your private key here */)

const napcatClient = new NapcatProtocolClient(connection, wallet)

// Example: Claiming Rewards
async function claimRewards() {
  const vaultPubkey = new PublicKey('vaultPublicKeyHere')
  const userPubkey = new PublicKey('userPublicKeyHere')
  const userPositionPubkey = new PublicKey('userPositionPublicKeyHere')

  const args = {
    vaultPubkey,
    userPubkey,
    userPositionPubkey
  }

  try {
    const txSignature = await napcatClient.claimRewards(args)
    console.log('Rewards claimed successfully! Transaction:', txSignature)
  } catch (error) {
    console.error('Error claiming rewards:', error)
  }
}

claimRewards()
```
