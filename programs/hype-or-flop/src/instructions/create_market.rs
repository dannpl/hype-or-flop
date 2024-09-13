use crate::{ state::Market, CreateMarketArgs };
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(args: CreateMarketArgs)]
pub struct CreateMarket<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer = signer,
        space = Market::SPACE,
        seeds = [Market::PREFIX_SEED, args.name.as_ref(), signer.key().as_ref()],
        bump
    )]
    pub market: Account<'info, Market>,

    pub system_program: Program<'info, System>,
}

pub fn create_market(ctx: Context<CreateMarket>, args: CreateMarketArgs) -> Result<()> {
    let market: &mut Account<Market> = &mut ctx.accounts.market;

    market.init_ts = Clock::get()?.unix_timestamp;
    // Set the end timestamp to 3 days from now
    market.end_ts = Clock::get()?.unix_timestamp + 3 * 24 * 60 * 60;
    market.bump = ctx.bumps.market;
    market.name = args.name;
    market.image = args.image;
    market.authority = *ctx.accounts.signer.key;
    market.hype_ticker = args.hype_ticker;
    market.flop_ticker = args.flop_ticker;
    market.hype_amount = 0;
    market.flop_amount = 0;
    market.sol_price = args.sol_price;

    Ok(())
}
