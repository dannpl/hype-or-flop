import { AnchorProvider, BN, Program, Wallet, web3 } from '@coral-xyz/anchor'
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { HypeOrFlop } from './types/hype_or_flop'
import IDL from './types/idl_hype_or_flop.json'
import {
  ClaimFeeArgs,
  ClaimAdminFeeArgs,
  CreateMarketArgs,
  RpcOptions
} from './types'
import { encodeString } from './utils/string'

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

  /**
   *  Claim Fee
   * @param args - Arguments.
   * @param args.userPubkey - The user public key.
   * @param args.marketPubkey - The market public key.
   * @param args.assetPubkey - The asset public key.
   *
   * @param options - Options to RPC call
   * @param options.skipPreflight - Skip preflight checks.
   * @param options.microLamports - The micro lamports.
   *
   */
  public async claimFee(args: ClaimFeeArgs, options?: RpcOptions) {
    const method = this.program.methods.claimFee().accounts({
      signer: args.userPubkey,
      market: args.marketPubkey,
      asset: args.assetPubkey
    })

    if (options?.microLamports) {
      method.postInstructions([
        web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: options.microLamports
        })
      ])
    }

    return method.rpc({ skipPreflight: options?.skipPreflight })
  }

  /**
   *  Claim admin fee
   * @param args - Arguments.
   * @param args.userPubkey - The user public key.
   * @param args.marketPubkey - The market public key.
   *
   * @param options - Options to RPC call
   * @param options.skipPreflight - Skip preflight checks.
   * @param options.microLamports - The micro lamports.
   *
   */
  public async claimAdminFee(args: ClaimAdminFeeArgs, options?: RpcOptions) {
    const method = this.program.methods.claimAdminFee().accounts({
      signer: args.userPubkey,
      market: args.marketPubkey,
      protocol: new PublicKey('HjJQdfTHgC3EBX3471w4st8BXbBmtbaMyCAXNgcUb7dq')
    })

    if (options?.microLamports) {
      method.postInstructions([
        web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: options.microLamports
        })
      ])
    }

    return method.rpc({ skipPreflight: options?.skipPreflight })
  }

  /**
   *  Claim admin fee
   * @param args - Arguments.
   * @param args.userPubkey - The user public key.
   * @param args.marketPubkey - The market public key.
   *
   * @param options - Options to RPC call
   * @param options.skipPreflight - Skip preflight checks.
   * @param options.microLamports - The micro lamports.
   *
   */
  public async createMarket(args: CreateMarketArgs, options?: RpcOptions) {
    const method = this.program.methods
      .createMarket({
        name: encodeString(args.name, 16),
        image: encodeString(args.image),
        solPrice: new BN(args.solPrice * LAMPORTS_PER_SOL)
      })
      .accounts({
        signer: this.provider.wallet.publicKey
      })

    if (options?.microLamports) {
      method.postInstructions([
        web3.ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: options.microLamports
        })
      ])
    }

    return method.rpc({ skipPreflight: options?.skipPreflight })
  }
}
