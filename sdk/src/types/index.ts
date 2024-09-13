import { Keypair, PublicKey } from '@solana/web3.js'

export type StrategyType = {
  lulo: {}
}

export interface ClaimRewardsArgs {
  userPubkey: PublicKey
  vaultPubkey: PublicKey
  userPositionPubkey: PublicKey
}

export interface CreateReferralArgs {
  code: string
  isAgent: boolean
  referrerCode?: string
  fee: number
}

export interface CreateUserArgs {
  code?: string
  payer?: Keypair
}

export interface CreateUserPositionArgs {
  vaultName: string
  payer?: Keypair
}

export interface CreateVaultArgs {
  vaultName: string
  vaultStrategyType: StrategyType
}

export interface DepositArgs {
  vaultName: string
  amount: number
  payer?: Keypair
  referrerCode?: string
}

export interface WithdrawArgs {
  vaultName: string
  userAuthority: PublicKey
  userWitdrawPosition: PublicKey
}

export interface RequestWithdrawArgs {
  vaultName: string
  payer?: Keypair
  amount: number
}

export interface UpdateVaultStatusArgs {
  vaultName: string
  paused: boolean
}

export interface UpdateVaultAuthorityArgs {
  vaultPubkey: PublicKey
  newAuthority: PublicKey
}

export interface RpcOptions {
  skipPreflight?: boolean
  microLamports?: number
}

export interface Vault {
  authority: string
  initTs: number
  updatedTs: number
  deposits: number
  withdrawn: number
  netDeposit: number
  netWithdrawn: number
  users: number
  tokenMint: string
  strategyType: StrategyType
  paused: boolean
  name: string
  apy: number
  rewardsPaid: number
  luloAccount: string
}

export interface UserPosition {
  ts: number
  authority: string
  vault: string
  deposited: number
  withdrawn: number
  vaultName: string
  lpShares: number
  medPrice: number
  claimed: number
  requestsWithdraw: number
}

export interface User {
  ts: number
  authority: string
  referrer: string
  netDeposit: number
  netWithdraw: number
  deposits: number
  withdrawn: number
  claimed: number
}
