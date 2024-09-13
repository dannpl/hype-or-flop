import { PublicKey } from '@solana/web3.js'
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID
} from '@solana/spl-token'
import { HYPE_OR_FLOP_PROGRAM_ID } from './constants'

export const getUserPDA = (signerPubkey: PublicKey) => {
  const [userPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('user'), signerPubkey.toBuffer()],
    HYPE_OR_FLOP_PROGRAM_ID
  )

  return userPDA
}
