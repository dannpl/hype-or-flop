use anchor_lang::prelude::*;

declare_id!("E4ZzS3D1XA1jKLYu4BssDVUXsZzPLiuBDabumAYFhAiC");

#[program]
pub mod hype_or_flop {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
