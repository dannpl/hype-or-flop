use std::str::FromStr;

use crate::{ errors::CustomError, state::Market };
use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::system_instruction::transfer;
use anchor_spl::token::Token;

#[derive(Accounts)]
pub struct ClaimAdminFee<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    // CHECK: Just the protocol account is needed here
    pub protocol: UncheckedAccount<'info>,

    #[account(mut)]
    pub market: Box<Account<'info, Market>>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn claim_admin_fee(ctx: Context<ClaimAdminFee>) -> Result<()> {
    let market = &mut ctx.accounts.market;
    let signer = &ctx.accounts.signer;

    if
        market.active ||
        market.admin_fee_claimed ||
        market.authority != *signer.to_account_info().key
    {
        return Err(CustomError::Unauthorized.into());
    }

    let market_signer: &[&[&[u8]]] = &[
        &[b"market", &market.name, signer.key.as_ref(), &[market.bump]],
    ];

    let mut amount_users = market.hype_amount;

    if market.flop_amount > market.hype_amount {
        amount_users = market.flop_amount;
    }

    let admin_fee = (market.sol_price * amount_users * 10) / 100;
    let protocol_fee = (market.sol_price * amount_users * 1) / 100;

    invoke_signed(
        &transfer(
            &market.to_account_info().key,
            &ctx.accounts.signer.to_account_info().key,
            admin_fee
        ),
        &[
            ctx.accounts.signer.to_account_info(),
            market.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        market_signer
    )?;

    invoke_signed(
        &transfer(
            &market.to_account_info().key,
            &Pubkey::from_str("HjJQdfTHgC3EBX3471w4st8BXbBmtbaMyCAXNgcUb7dq").unwrap(),
            protocol_fee
        ),
        &[
            ctx.accounts.protocol.to_account_info(),
            market.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        market_signer
    )?;

    market.admin_fee_claimed = true;

    Ok(())
}
