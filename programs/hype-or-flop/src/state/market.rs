use anchor_lang::prelude::*;

#[account]
pub struct Market {
    pub init_ts: i64,
    pub updated_ts: i64,
    pub bump: u8,
    pub authority: Pubkey,
    pub name: [u8; 16],
    pub users: u64,
    pub hype_ticker: [u8; 10],
    pub flop_ticker: [u8; 10],
    pub hype_price: u64,
    pub flop_price: u64,
    pub padding: [u8; 120],
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct CreateMarketArgs {
    pub name: [u8; 16],
    pub hype_ticker: [u8; 10],
    pub flop_ticker: [u8; 10],
}

impl Market {
    pub const PREFIX_SEED: &'static [u8] = b"market";

    pub const SPACE: usize = 8 + std::mem::size_of::<Self>();
}
