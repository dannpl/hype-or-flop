use crate::{ errors::CustomError, state::Market, SellArgs, Type };
use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::system_instruction::transfer;
use anchor_spl::token::{ close_account, CloseAccount, TokenAccount };
use anchor_spl::token::Token;

#[derive(Accounts)]
#[instruction(args: SellArgs)]
pub struct Sell<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut)]
    pub market: Box<Account<'info, Market>>,

    /// CHECK: NFT asset
    #[account(mut)]
    pub asset: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn sell(ctx: Context<Sell>, args: SellArgs) -> Result<()> {
    let market = &mut ctx.accounts.market;
    let signer = &ctx.accounts.signer;
    let asset = &ctx.accounts.asset;

    if !market.active {
        return Err(CustomError::Unauthorized.into());
    }

    let market_signer: &[&[&[u8]]] = &[
        &[b"market", &market.name, signer.key.as_ref(), &[market.bump]],
    ];

    if asset.owner != *signer.to_account_info().key {
        return Err(CustomError::Unauthorized.into());
    }

    let transfer_ix = invoke_signed(
        &transfer(
            &market.to_account_info().key,
            &ctx.accounts.signer.to_account_info().key,
            market.sol_price
        ),
        &[
            ctx.accounts.signer.to_account_info(),
            market.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        market_signer
    );

    if transfer_ix.is_err() {
        return Err(CustomError::TransferFailed.into());
    }

    if args.sell_type.eq(&Type::Hype) {
        market.hype_amount = market.hype_amount.checked_sub(1).unwrap();
    } else {
        market.flop_amount = market.flop_amount.checked_sub(1).unwrap();
    }

    close_account(
        CpiContext::new(ctx.accounts.token_program.to_account_info(), CloseAccount {
            account: ctx.accounts.asset.to_account_info(),
            destination: ctx.accounts.signer.to_account_info(),
            authority: ctx.accounts.signer.to_account_info(),
        })
    )?;

    Ok(())
}
