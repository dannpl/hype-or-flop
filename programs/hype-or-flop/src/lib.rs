use anchor_lang::prelude::*;
use instructions::*;
use state::*;

mod errors;
pub mod instructions;
pub mod state;

declare_id!("E4ZzS3D1XA1jKLYu4BssDVUXsZzPLiuBDabumAYFhAiC");

#[program]
pub mod hype_or_flop {
    use super::*;

    pub fn create_market(ctx: Context<CreateMarket>, args: CreateMarketArgs) -> Result<()> {
        instructions::create_market(ctx, args)
    }

    pub fn buy(ctx: Context<Buy>, args: BuyArgs) -> Result<()> {
        instructions::buy(ctx, args)
    }
}
