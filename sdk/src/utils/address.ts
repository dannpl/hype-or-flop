import { PublicKey } from '@solana/web3.js'
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID
} from '@solana/spl-token'
import { LULO_PROGRAM_ID, NAPCAT_PROGRAM_ID } from './constants'
import BN from 'bn.js'

export const getTokenATA = (address: PublicKey, Mint: PublicKey) => {
  const [tokenATA] = PublicKey.findProgramAddressSync(
    [address.toBytes(), TOKEN_PROGRAM_ID.toBytes(), Mint.toBytes()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  )

  return tokenATA
}

export const getVaultPDA = (name: string) => {
  const [vaultPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('vault'), Buffer.from(name)],
    NAPCAT_PROGRAM_ID
  )

  return vaultPDA
}

export const getUserPDA = (signerPubkey: PublicKey) => {
  const [userPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('user'), signerPubkey.toBuffer()],
    NAPCAT_PROGRAM_ID
  )

  return userPDA
}

export const getUserPositionPDA = (
  signerPubkey: PublicKey,
  vault: PublicKey
) => {
  const [userPositionPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('user_position'), signerPubkey.toBuffer(), vault.toBuffer()],
    NAPCAT_PROGRAM_ID
  )

  return userPositionPDA
}

export const getUserWithdrawPositionPDA = (
  userPosition: PublicKey,
  requests_withdraw: BN
) => {
  const [userPositionPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('user_withdraw_position'),
      userPosition.toBuffer(),
      requests_withdraw.toBuffer()
    ],
    NAPCAT_PROGRAM_ID
  )

  return userPositionPDA
}

export const getReferralPDA = (code: string) => {
  const [referralPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('referral'), Buffer.from(code)],
    NAPCAT_PROGRAM_ID
  )

  return referralPDA
}

export const getLuloUserPDA = (vault: PublicKey) => {
  const [luloUserPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('flexlend'), vault.toBuffer()],
    LULO_PROGRAM_ID
  )

  return luloUserPDA
}
