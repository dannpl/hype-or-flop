use anchor_lang::prelude::*;

#[account]
pub struct Market {
    pub init_ts: i64,
    pub end_ts: i64,
    pub updated_ts: i64,
    pub bump: u8,
    pub authority: Pubkey,
    pub name: [u8; 16],
    pub sol_price: u64,
    pub image: [u8; 32],
    pub admin_fee_claimed: bool,
    pub hype_ticker: [u8; 10],
    pub flop_ticker: [u8; 10],
    pub hype_amount: u64,
    pub flop_amount: u64,
    pub active: bool,
    pub padding: [u8; 120],
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct CreateMarketArgs {
    pub name: [u8; 16],
    pub image: [u8; 32],
    pub hype_ticker: [u8; 10],
    pub flop_ticker: [u8; 10],
    pub sol_price: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct BuyArgs {
    pub buy_type: Type,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct SellArgs {
    pub sell_type: Type,
}

#[derive(AnchorSerialize, AnchorDeserialize, PartialEq)]
pub enum Type {
    Hype,
    Flop,
}

impl Market {
    pub const PREFIX_SEED: &'static [u8] = b"market";

    pub const SPACE: usize = 8 + std::mem::size_of::<Self>();
}
