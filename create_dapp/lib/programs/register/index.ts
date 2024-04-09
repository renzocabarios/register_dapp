import { Address, AnchorProvider, Program } from "@coral-xyz/anchor";
import { IDL, RegisterProgram } from "./idl";
import { PublicKey } from "@solana/web3.js";

const REGISTER_PROGRAM_ID = new PublicKey(
  "3vmfRWf5EECYFANd2tQqJxrsKyYtb5Da8sAHjLPeLbK1"
);

export function getRegisterProgram(provider: AnchorProvider) {
  return new Program<RegisterProgram>(IDL, REGISTER_PROGRAM_ID, provider);
}

interface IGetUserAccountProps {
  provider: AnchorProvider;
  address: Address;
}

export async function getUserAccount({
  provider,
  address,
}: IGetUserAccountProps) {
  return await getRegisterProgram(provider).account.user.fetch(address);
}

interface IGetAllUserAccountProps {
  provider: AnchorProvider;
}

export async function getAllUserAccount({ provider }: IGetAllUserAccountProps) {
  return await getRegisterProgram(provider).account.user.all();
}

interface IInitializeUserAccountProps {
  provider: AnchorProvider;
  args: IInitializeUserAccountArgs;
  accounts: IInitializeUserAccountAccounts;
}

interface IInitializeUserAccountArgs {
  firstName: string;
  lastName: string;
  email: string;
}

interface IInitializeUserAccountAccounts {
  user?: PublicKey;
  payer?: PublicKey;
  systemProgram?: PublicKey;
}

export async function initialize({
  provider,
  args,
  accounts,
}: IInitializeUserAccountProps) {
  return await getRegisterProgram(provider)
    .methods.initialize(args.firstName, args.lastName, args.email)
    .accounts({
      user: accounts.user,
      payer: accounts.payer,
      systemProgram: accounts.systemProgram,
    })
    .instruction();
}

interface IGetPdaProps {
  seeds: Buffer[];
}

export function getPda({ seeds }: IGetPdaProps) {
  return PublicKey.findProgramAddressSync(seeds, REGISTER_PROGRAM_ID);
}
