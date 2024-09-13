use crate::{ errors::CustomError, state::Market, BuyArgs, Type };
use anchor_lang::prelude::*;
use mpl_core::instructions::{ CreateV2Cpi, CreateV2CpiAccounts, CreateV2InstructionArgs };
use mpl_core::types::DataState::AccountState;
use anchor_spl::{ associated_token::AssociatedToken, token::Token };
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

    pub spl_token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

pub fn buy(ctx: Context<Buy>, args: BuyArgs) -> Result<()> {
    let market = &mut ctx.accounts.market;
    let signer = &ctx.accounts.signer;

    if !market.active {
        return Err(CustomError::Unauthorized.into());
    }

    let market_signer: &[&[&[u8]]] = &[
        &[b"market", &market.name, signer.key.as_ref(), &[market.bump]],
    ];

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

    market.users = market.users.checked_add(1).unwrap();

    if args.buy_type.eq(&Type::Hype) {
        market.hype_amount = market.hype_amount.checked_add(1).unwrap();
    } else {
        market.flop_amount = market.flop_amount.checked_add(1).unwrap();
    }

    Ok(())
}
