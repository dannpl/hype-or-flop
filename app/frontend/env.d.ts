declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    HOST_URL: string;
    NEXT_PUBLIC_RPC_URL: string;
    NEXT_PUBLIC_MAGIC_API_KEY: string;
    NEXT_PUBLIC_WALLET_REFERRAL_JUP: string;
    NEXT_PUBLIC_JUP_SWAP_API: string;
    NEXT_PUBLIC_JUP_STATS_API: string;
    CRON_SECRET: string;
    POSTGRES_PRISMA_URL: string;
    POSTGRES_URL_NON_POOLING: string;
    TELEGRAM_BOT_SECRET_KEY: string;
  }
}
