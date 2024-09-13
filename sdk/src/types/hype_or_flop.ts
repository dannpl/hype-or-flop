/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/hype_or_flop.json`.
 */
export type HypeOrFlop = {
  address: 'E4ZzS3D1XA1jKLYu4BssDVUXsZzPLiuBDabumAYFhAiC'
  metadata: {
    name: 'hypeOrFlop'
    version: '0.1.0'
    spec: '0.1.0'
    description: 'Created with Anchor'
  }
  instructions: [
    {
      name: 'buy'
      discriminator: [102, 6, 61, 18, 1, 218, 235, 234]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'market'
          writable: true
        },
        {
          name: 'asset'
        },
        {
          name: 'metaplexProgram'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'args'
          type: {
            defined: {
              name: 'buyArgs'
            }
          }
        }
      ]
    },
    {
      name: 'claimAdminFee'
      discriminator: [140, 174, 8, 26, 35, 27, 162, 21]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'protocol'
        },
        {
          name: 'market'
          writable: true
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: []
    },
    {
      name: 'claimFee'
      discriminator: [169, 32, 79, 137, 136, 232, 70, 137]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'asset'
          writable: true
        },
        {
          name: 'market'
          writable: true
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: []
    },
    {
      name: 'createMarket'
      discriminator: [103, 226, 97, 235, 200, 188, 251, 254]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'market'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 97, 114, 107, 101, 116]
              },
              {
                kind: 'arg'
                path: 'args.name'
              },
              {
                kind: 'account'
                path: 'signer'
              }
            ]
          }
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'args'
          type: {
            defined: {
              name: 'createMarketArgs'
            }
          }
        }
      ]
    },
    {
      name: 'sell'
      discriminator: [51, 230, 133, 164, 1, 127, 131, 173]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'market'
          writable: true
        },
        {
          name: 'asset'
          writable: true
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'args'
          type: {
            defined: {
              name: 'sellArgs'
            }
          }
        }
      ]
    }
  ]
  accounts: [
    {
      name: 'market'
      discriminator: [219, 190, 213, 55, 0, 227, 198, 154]
    }
  ]
  errors: [
    {
      code: 6000
      name: 'invalidAccount'
      msg: 'Invalid account'
    },
    {
      code: 6001
      name: 'unauthorized'
      msg: 'Unauthorized access'
    },
    {
      code: 6002
      name: 'transferFailed'
      msg: 'Transfer failed'
    }
  ]
  types: [
    {
      name: 'buyArgs'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'buyType'
            type: {
              defined: {
                name: 'type'
              }
            }
          }
        ]
      }
    },
    {
      name: 'createMarketArgs'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'name'
            type: {
              array: ['u8', 16]
            }
          },
          {
            name: 'image'
            type: {
              array: ['u8', 32]
            }
          },
          {
            name: 'solPrice'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'market'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'initTs'
            type: 'i64'
          },
          {
            name: 'endTs'
            type: 'i64'
          },
          {
            name: 'updatedTs'
            type: 'i64'
          },
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'authority'
            type: 'pubkey'
          },
          {
            name: 'name'
            type: {
              array: ['u8', 16]
            }
          },
          {
            name: 'solPrice'
            type: 'u64'
          },
          {
            name: 'image'
            type: {
              array: ['u8', 32]
            }
          },
          {
            name: 'adminFeeClaimed'
            type: 'bool'
          },
          {
            name: 'hypeAmount'
            type: 'u64'
          },
          {
            name: 'flopAmount'
            type: 'u64'
          },
          {
            name: 'padding'
            type: {
              array: ['u8', 120]
            }
          }
        ]
      }
    },
    {
      name: 'sellArgs'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'sellType'
            type: {
              defined: {
                name: 'type'
              }
            }
          }
        ]
      }
    },
    {
      name: 'type'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'hype'
          },
          {
            name: 'flop'
          }
        ]
      }
    }
  ]
}
