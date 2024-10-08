use crate::{ errors::CustomError, state::Market, BuyArgs, Type };
use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_instruction::transfer;
use mpl_core::instructions::{ CreateV2Cpi, CreateV2CpiAccounts, CreateV2InstructionArgs };
use mpl_core::types::DataState::AccountState;
use mpl_core::types::{ Attribute, PluginAuthorityPair };

#[derive(Accounts)]
#[instruction(args: BuyArgs)]
pub struct Buy<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut)]
    pub market: Box<Account<'info, Market>>,

    /// CHECK: NFT asset
    pub asset: AccountInfo<'info>,

    /// CHECK: Metaplex program
    pub metaplex_program: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

pub fn buy(ctx: Context<Buy>, args: BuyArgs) -> Result<()> {
    let market = &mut ctx.accounts.market;
    let signer = &ctx.accounts.signer;

    if Clock::get()?.unix_timestamp > market.end_ts {
        return Err(CustomError::Unauthorized.into());
    }

    let market_signer: &[&[&[u8]]] = &[
        &[b"market", &market.name, signer.key.as_ref(), &[market.bump]],
    ];

    let transfer_ix = invoke(
        &transfer(
            &ctx.accounts.signer.to_account_info().key,
            &market.to_account_info().key,
            market.sol_price
        ),
        &[
            ctx.accounts.signer.to_account_info(),
            market.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ]
    );

    if transfer_ix.is_err() {
        return Err(CustomError::TransferFailed.into());
    }

    let mut nft_name = "Hype".to_string();
    let mut nft_uri =
        "https://shdw-drive.genesysgo.net/9ZgbDbP9wL1oPegdNj66TH6tnazEMFcMnREJdKsKEMwx/hype.json".to_string();

    if args.buy_type.eq(&Type::Flop) {
        nft_name = "Flop".to_string();
        nft_uri =
            "https://shdw-drive.genesysgo.net/9ZgbDbP9wL1oPegdNj66TH6tnazEMFcMnREJdKsKEMwx/flop.json".to_string();
    }

    CreateV2Cpi::new(
        &ctx.accounts.metaplex_program,
        CreateV2CpiAccounts {
            authority: Some(signer),
            payer: signer,
            collection: None,
            asset: &ctx.accounts.asset.to_account_info(),
            owner: Some(signer),
            update_authority: Some(&market.to_account_info()),
            log_wrapper: None,
            system_program: &ctx.accounts.system_program.to_account_info(),
        },
        CreateV2InstructionArgs {
            data_state: AccountState,
            name: nft_name,
            uri: nft_uri,
            plugins: Some(
                vec![PluginAuthorityPair {
                    authority: None,
                    plugin: mpl_core::types::Plugin::Attributes(mpl_core::types::Attributes {
                        attribute_list: vec![Attribute {
                            key: "markt".to_string(),
                            value: market.key().to_string(),
                        }],
                    }),
                }]
            ),
            external_plugin_adapters: None,
        }
    ).invoke_signed(market_signer)?;

    if args.buy_type.eq(&Type::Hype) {
        market.hype_amount = market.hype_amount.checked_add(1).unwrap();
    } else {
        market.flop_amount = market.flop_amount.checked_add(1).unwrap();
    }

    Ok(())
}
