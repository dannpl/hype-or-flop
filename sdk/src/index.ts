import { AnchorProvider, Program, Wallet, web3 } from '@coral-xyz/anchor'
import {
  Connection,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction
} from '@solana/web3.js'
import { HypeOrFlop } from './types/hype_or_flop'
import IDL from './types/idl_hype_or_flop.json'
import { BN } from 'bn.js'
import {
  getVaultPDA,
  getTokenATA,
  getLuloUserPDA,
  getUserPositionPDA,
  getUserPDA,
  getReferralPDA
} from './utils/address'
import {
  CreateReferralArgs,
  CreateUserArgs,
  WithdrawArgs,
  CreateVaultArgs,
  DepositArgs,
  RequestWithdrawArgs,
  UpdateVaultStatusArgs,
  UpdateVaultAuthorityArgs,
  RpcOptions,
  ClaimRewardsArgs,
  CreateUserPositionArgs
} from './types'
import {
  LULO_PROGRAM_ID,
  LULO_PROMOTION_RESERVE_PROGRAM_ID,
  USDC_DECIMALS,
  USDC_MINT
} from './utils/constants'

export default class HypeOrFlopClient {
  provider: AnchorProvider
  program: Program<HypeOrFlop>

  constructor(connection: Connection, wallet: Wallet) {
    this.provider = new AnchorProvider(connection, wallet, {
      commitment: 'confirmed'
    })

    this.program = new Program<HypeOrFlop>(IDL as HypeOrFlop, this.provider)
  }

  /**
   * Get all markets.
   */
  public async getMarkets() {
    return this.program.account.market.all()
  }
}
