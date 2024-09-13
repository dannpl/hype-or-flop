import { PublicKey } from '@solana/web3.js'

export interface ClaimFeeArgs {
  userPubkey: PublicKey
  marketPubkey: PublicKey
  assetPubkey: PublicKey
}

export interface ClaimAdminFeeArgs {
  userPubkey: PublicKey
  marketPubkey: PublicKey
}

export interface RpcOptions {
  skipPreflight?: boolean
  microLamports?: number
}
