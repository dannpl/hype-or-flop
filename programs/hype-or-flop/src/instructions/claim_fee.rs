use crate::{ errors::CustomError, state::Market };
use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::system_instruction::transfer;
use anchor_spl::token::{ close_account, CloseAccount, Token, TokenAccount };

#[derive(Accounts)]
pub struct ClaimFee<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    // CHECK: Just the protocol account is needed here
    pub protocol: UncheckedAccount<'info>,

    /// CHECK: NFT asset
    #[account(mut)]
    pub asset: Account<'info, TokenAccount>,

    #[account(mut)]
    pub market: Box<Account<'info, Market>>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn claim_fee(ctx: Context<ClaimFee>) -> Result<()> {
    let market = &mut ctx.accounts.market;
    let signer = &ctx.accounts.signer;
    let asset = &ctx.accounts.asset;

    if Clock::get()?.unix_timestamp < market.end_ts || asset.owner != *signer.to_account_info().key {
        return Err(CustomError::Unauthorized.into());
    }

    let market_signer: &[&[&[u8]]] = &[
        &[b"market", &market.name, signer.key.as_ref(), &[market.bump]],
    ];

    let mut amount_lost = market.flop_amount;
    let mut amount_winners = market.hype_amount;

    if market.flop_amount > market.hype_amount {
        amount_lost = market.hype_amount;
        amount_winners = market.flop_amount;
    }

    let fee = (market.sol_price * amount_lost) / amount_winners;

    invoke_signed(
        &transfer(&market.to_account_info().key, &ctx.accounts.signer.to_account_info().key, fee),
        &[
            ctx.accounts.signer.to_account_info(),
            market.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        market_signer
    )?;

    close_account(
        CpiContext::new(ctx.accounts.token_program.to_account_info(), CloseAccount {
            account: ctx.accounts.asset.to_account_info(),
            destination: ctx.accounts.signer.to_account_info(),
            authority: ctx.accounts.signer.to_account_info(),
        })
    )?;

    Ok(())
}
