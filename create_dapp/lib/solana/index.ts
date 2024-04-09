import {
  Blockhash,
  Connection,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

export async function getLatestBlockchain(connection: Connection) {
  return await connection.getLatestBlockhash();
}

interface ILegacyToV0Props {
  recentBlockhash: Blockhash;
  payerKey: PublicKey;
  instructions: TransactionInstruction[];
}

export function legacyToV0({
  recentBlockhash,
  payerKey,
  instructions,
}: ILegacyToV0Props) {
  const messageV0 = new TransactionMessage({
    payerKey,
    recentBlockhash,
    instructions,
  }).compileToV0Message();

  return new VersionedTransaction(messageV0);
}
