use anchor_lang::prelude::*;

#[error_code]
pub enum CustomError {
    #[msg("Invalid account")]
    InvalidAccount,

    #[msg("Unauthorized access")]
    Unauthorized,

    #[msg("Transfer failed")]
    TransferFailed,
}
