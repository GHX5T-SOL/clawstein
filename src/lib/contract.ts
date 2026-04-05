/** $wifclaw token mint on Solana (Pump.fun). Override via NEXT_PUBLIC_CONTRACT_ADDRESS in env. */
export const WIFCLAW_MINT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ??
  "GQ5CTdP79bGtNXPz2yRReNDm9HJ3zMzdP6o2utGCpump";

export const WIFCLAW_SOLSCAN_TOKEN_URL = `https://solscan.io/token/${WIFCLAW_MINT_ADDRESS}`;

/** Pump.fun token page (mint suffix). */
export const WIFCLAW_PUMP_FUN_URL = `https://pump.fun/${WIFCLAW_MINT_ADDRESS}`;
